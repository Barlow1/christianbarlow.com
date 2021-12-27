import { Handler } from "@netlify/functions";

/* configure prisma Client with our secret */
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { bundleMDX } from "mdx-bundler";
import path from "path";
const { remarkCodeBlocksShiki } = require("@kentcdodds/md-temp");

interface Content {
  code: string;
  frontmatter: { [key: string]: any };
  slug: string;
}

const prisma = new PrismaClient();

/* export our lambda function as named "handler" export */
export const handler: Handler = async (event, context) => {
  await prisma.$connect();
  let postsPath = path.join(
    "app/",
    "content"
  );
  const postDir = await fs.readdir(postsPath);

  const compiledPosts: Content[] = await Promise.all(
    postDir.map(async (fileName) => {
      const found = fileName;
      const isFile = found?.includes(".");
      const contentDirectory = path.join(postsPath, found);
      const mdxPath = isFile
        ? contentDirectory
        : path.join(contentDirectory, "index.mdx");
      const mdxFile = await fs.readFile(mdxPath);
      const mdxSource = mdxFile.toString().trim();
      const files = !isFile
        ? (await fs.readdir(contentDirectory)).reduce(
            async (previousPromise, name) => {
              const localPath = name.replace(contentDirectory, "./");
              const relativePath = path.join(contentDirectory, name);
              const content = (await fs.readFile(relativePath)).toString();
              const previous = await previousPromise;
              previous[localPath] = content;
              return previous;
            },
            Promise.resolve({}) as Promise<Record<string, string>>
          )
        : undefined;
      const { code, frontmatter } = await bundleMDX({
        source: mdxSource,
        files: await files,
        xdmOptions(options) {
          options.remarkPlugins = [
            ...(options.remarkPlugins ?? []),
            remarkCodeBlocksShiki,
          ];

          return options;
        },
      });
      const slug = fileName.replace(/.md[x]*/, "");

      return { code, frontmatter, slug };
    })
  );

  return Promise.all(
    compiledPosts.map(({ code, frontmatter, slug }) => {
      const response = prisma.post.upsert({
        where: {
          slug: slug,
        },
        update: {
          title: frontmatter.title,
          body: code,
        },
        create: {
          title: frontmatter.title,
          slug: slug,
          views: 0,
          body: code,
        },
      });
      return response;
    })
  )
    .then((resp) => {
      console.log("update success", resp);
      return {
        statusCode: 200,
        body: JSON.stringify(resp),
      };
    })
    .catch((error) => {
      console.log("update error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};

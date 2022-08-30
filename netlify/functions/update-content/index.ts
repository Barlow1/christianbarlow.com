import { Handler } from "@netlify/functions";

/* configure prisma Client with our secret */
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { bundleMDX } from "mdx-bundler";
import path from "path";
const { remarkCodeBlocksShiki } = require("@kentcdodds/md-temp");
import remarkMdxImages from "remark-mdx-images";

interface Content {
  code: string;
  frontmatter: { [key: string]: any };
  slug: string;
}

const prisma = new PrismaClient();

type UpdateContentParameters = {
  slug: string;
};

/* export our lambda function as named "handler" export */
export const handler: Handler = async (event, context) => {
  const { slug } = event.queryStringParameters as UpdateContentParameters;
  await prisma.$connect();
  let postsPath = path.join("app/", "content");
  const found = slug;
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
  const foundFiles = await files;
  const { code, frontmatter } = await bundleMDX({
    source: mdxSource,
    files: foundFiles,
    cwd: path.resolve(contentDirectory),
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkCodeBlocksShiki,
        remarkMdxImages,
      ];
      return options;
    },
    esbuildOptions(options) {
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".jpeg": "dataurl",
      };
      return options;
    },
  });
  return prisma.post
    .upsert({
      where: {
        slug: slug,
      },
      update: {
        title: frontmatter.title,
        img: frontmatter.img,
        body: code,
      },
      create: {
        title: frontmatter.title,
        img: frontmatter.img,
        slug: slug,
        views: 0,
        body: code,
      },
    })
    .then((resp) => {
      console.log("update success");
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
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

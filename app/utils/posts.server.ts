import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { bundleMDX } from "mdx-bundler";
import { remarkCodeBlocksShiki } from "@kentcdodds/md-temp";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

// relative to the server output not the source!
let postsPath = path.join(__dirname, "../../../../app/", "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts(): Promise<Post[]> {
  let dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const isFile = filename.includes(".");
      const fileOrFolderPath = isFile
        ? path.join(postsPath, filename)
        : path.join(postsPath, filename, "index.mdx");
      let file = await fs.readFile(fileOrFolderPath);
      let { attributes } = parseFrontMatter(file.toString());
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/.md[x]*/, ""),
        title: attributes.title,
      };
    })
  );
}

export async function getPost(slug: string) {
  const postDir = await fs.readdir(postsPath);
  // search for matching directory or file
  const found = postDir.find(
    (postTitle) => postTitle.search(new RegExp(`${slug}[^.$]*`)) !== -1
  );
  const isFile = found?.includes(".");
  invariant(found, `Could not find specified file with pattern matching: ${slug}`)
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
        ]

        return options
    },
  });
  invariant(frontmatter.title, "title is missing in mdx file");
  invariant(frontmatter.date, "date is missing in mdx file");
  return { slug, title: frontmatter.title, code, frontmatter, date: frontmatter.date };
}

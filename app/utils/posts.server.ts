import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
  date: string;
};

export type PostMarkdownAttributes = {
  title: string;
  date: string;
};

// relative to the server output not the source!
let postsPath = path.join(__dirname, "../../../../app/routes/", "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title && attributes?.date;
}

export async function getPosts(): Promise<Post[]> {
  let dir = await fs.readdir(postsPath);
  return Promise.all(
    dir
      .filter((file: string) => !file.includes(".tsx"))
      .map(async (filename) => {
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
          date: attributes.date,
        };
      })
  );
}

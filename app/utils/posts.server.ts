import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
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
  return attributes?.title;
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
  invariant(
    found,
    `Could not find specified file with pattern matching: ${slug}`
  );
  const contentDirectory = path.join(postsPath, found);
  const mdxPath = isFile
    ? contentDirectory
    : path.join(contentDirectory, "index.mdx");
  const mdxFile = await fs.readFile(mdxPath);
  const mdxSource = mdxFile.toString().trim();
  let { attributes } = parseFrontMatter(mdxSource);
  invariant(isValidPostAttributes(attributes), `${slug} has bad meta data!`);
  invariant(attributes.title, "title is missing in mdx file");
  invariant(attributes.date, "date is missing in mdx file");
  return {
    slug,
    title: attributes.title,
    frontmatter: attributes,
    date: attributes.date,
  };
}

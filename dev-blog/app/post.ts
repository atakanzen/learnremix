import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  markdown: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const postsPath = path.join(__dirname, "..", "posts");

const isValidPostAttributes = (
  attributes: any
): attributes is PostMarkdownAttributes => {
  return attributes?.title;
};

export async function getPosts() {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (fileName) => {
      const file = await fs.readFile(path.join(postsPath, fileName));
      const { attributes } = parseFrontMatter(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${fileName} has bed meta data!`
      );

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());

  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );

  return { slug, body, title: attributes.title };
}

export async function createPost(post: Post) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(path.join(postsPath, post.slug + ".md"), md);
  return getPost(post.slug);
}

import React from "react";
import { Link, useLoaderData } from "remix";
import { getPosts } from "~/post";

export type Post = {
  slug: string;
  title: string;
};

export const loader = async () => {
  return getPosts();
};

function Posts() {
  const posts = useLoaderData<Post[]>();
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;

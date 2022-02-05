import React from "react";
import { Link, Outlet, useLoaderData } from "remix";
import { getPosts, Post } from "~/post";
import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = async () => {
  return getPosts();
};

function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="admin">
      <nav className="admin-nav">
        <h1>Admin</h1>
        <h2>Edit Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/admin/edit/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;

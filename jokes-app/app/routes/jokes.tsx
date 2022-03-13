import React from "react";
import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";
import jokesStylesPath from "../styles/jokes.css";
import type { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: jokesStylesPath,
    },
  ];
};

type LoaderData = { jokes: Array<Pick<Joke, "id" | "name">> };
export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokes: await db.joke.findMany({
      take: 5,
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

export default function JokesIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokes.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

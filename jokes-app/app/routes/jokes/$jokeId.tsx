import React from "react";
import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  return params.jokeId;
};

export default function SingleJoke() {
  const jokeId = useLoaderData();

  return (
    <div>
      <h1>Single Joke {jokeId}</h1>
    </div>
  );
}

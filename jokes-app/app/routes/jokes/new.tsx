import React from "react";
import { Form } from "remix";

export default function NewJoke() {
  return (
    <Form id="new-joke-form">
      <div>
        <label htmlFor="joke-name" title="Name">
          Name:
        </label>
        <input type="text" name="joke-name" id="joke-name" />
      </div>
      <div>
        <label htmlFor="joke-content">Content:</label>
        <textarea
          name="joke-content"
          id="joke-content"
          cols={30}
          rows={10}
        ></textarea>
      </div>
    </Form>
  );
}

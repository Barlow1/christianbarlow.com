import { useCatch, useLoaderData } from "remix";

export const loader = () => {
  throw new Response("Not Found", {
    status: 404,
  });
};

export default function CatchAll() {
  useLoaderData();
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </div>
  );
}

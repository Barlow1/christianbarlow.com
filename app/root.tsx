import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";

import globalStylesUrl from "~/styles/global.css";
import proseStyleUrl from "~/styles/prose.css";
import tailwindStyleUrls from "~/styles/tailwind.css"
import ThemeProvider, { Theme } from "./components/ThemeProvider";
import { ReactNode } from "react";
import useTheme from "./hooks/useTheme";
import { Navigation } from "./components/Navigation";
import faCss from '@fortawesome/fontawesome-svg-core/styles.css'
import { Footer } from "./components/Footer";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    { rel: "stylesheet", href: tailwindStyleUrls },
    {
      rel: "image",
      href: "/android-chrome-192x192.png",
    },
    {
      rel: "stylesheet",
      href: proseStyleUrl,
    },
    {
      rel: "stylesheet",
      href: faCss,
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <DocumentWithTheme>
      <Layout>
        <Outlet />
      </Layout>
    </DocumentWithTheme>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <DocumentWithTheme title="Error!">
      <Layout>
        <div>
          <h1>There was an unexpected error</h1>
          {process.env.NODE_ENV === 'development' && ( <p>{error.message}</p>)}
          <hr />
          <p>
            Please try again in a few minutes.
          </p>
        </div>
      </Layout>
    </DocumentWithTheme>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
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
    <DocumentWithTheme title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </DocumentWithTheme>
  );
}
function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [theme] = useTheme()
  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-primary">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function DocumentWithTheme ({children, ...rest}: {children: ReactNode; title?:string}): JSX.Element {
  return (<ThemeProvider suppliedTheme={Theme.DARK}><Document {...rest}>{children}</Document></ThemeProvider>)
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Logo />
          <Navigation />
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

function Logo() {
  return (
      <Link
        to="/"
        className="block text-2xl font-medium transition text-primary underlined whitespace-nowrap focus:outline-none"
      >
        <div className="flex">
          <img
            className={"w-10 h-10 md:w-14 md:h-14"}
            src={"/android-chrome-192x192.png"}
          ></img>
          <h1 className="self-center pl-2">Christian Barlow</h1>
        </div>
      </Link>
  );
}

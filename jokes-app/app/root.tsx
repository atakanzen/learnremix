import { Links, LinksFunction, LiveReload, Outlet } from "remix";

import globalStylesPath from "./styles/global.css";
import globalMediumStylesPath from "./styles/global-medium.css";
import globalLargeStylesPath from "./styles/global-large.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesPath },
    {
      rel: "stylesheet",
      href: globalMediumStylesPath,
      media: "print, (min-width: 640px)",
    },
    {
      rel: "stylesheet",
      href: globalLargeStylesPath,
      media: "screen and (min-width: 1024px) ",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Outlet />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

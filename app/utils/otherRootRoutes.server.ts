import { EntryContext } from "@remix-run/node";
import { generateRobotsTxt, generateSitemap } from "@balavishnuvj/remix-seo";

type Handler = (
  request: Request,
  remixContext: EntryContext
) => Promise<Response | null> | null;

export const otherRootRoutes: Record<string, Handler> = {
  "/sitemap.xml": async (request, remixContext) => {
    return generateSitemap(request, remixContext, {
      siteUrl: "https://christianbarlow.com",
      headers: {
        "Cache-Control": `public, max-age=${60 * 5}`,
      },
    });
  },
  "/robots.txt": async () => {
    return generateRobotsTxt([
      { type: "sitemap", value: "https://christianbarlow.com/sitemap.xml" },
    ]);
  },
};

export const otherRootRouteHandlers: Array<Handler> = [
  ...Object.entries(otherRootRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null;

      return handler(request, remixContext);
    };
  }),
];

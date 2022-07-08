import * as React from "react";
import { json, ActionFunction } from "@remix-run/node";
import { isTheme } from "~/components/ThemeProvider";
import { getThemeSession } from "~/utils/sessions.server";
import { SEOHandle } from "@balavishnuvj/remix-seo";

export const handle: SEOHandle = {
  getSitemapEntries: () => null,
};

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");
  if (!isTheme(theme))
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });

  themeSession.setTheme(theme);
  return json(
    { success: true },
    {
      headers: { "Set-Cookie": await themeSession.commit() },
    }
  );
};

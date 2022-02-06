import { createCookieSessionStorage } from "remix";
import { isTheme, Theme } from "~/components/ThemeProvider";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "CJB_theme",
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date("2098-10-08"),
    },
  });

  async function getThemeSession(request: Request) {
    const session = await getSession(
      request.headers.get("Cookie")
    );
    return {
      getTheme: () => {
        const themeValue = session.get("theme");
        return isTheme(themeValue) ? themeValue : Theme.DARK;
      },
      setTheme: (theme: Theme) => session.set("theme", theme),
      commit: () => commitSession(session),
    };
  }

export { getThemeSession };

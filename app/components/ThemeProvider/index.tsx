import type { ReactNode } from "react";
import React, {
  useState,
  Dispatch,
  createContext,
  SetStateAction,
} from "react";
import { useFetcher } from "remix";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

type ThemeProviderType = {
    children: ReactNode;
    suppliedTheme?: Theme | undefined;  
};

type ThemeContextType =
  | [
      theme: Theme | undefined,
      setTheme: Dispatch<SetStateAction<Theme | undefined>>,
  ]
  | undefined;

export const themes: Array<Theme> = Object.values(Theme);

export const ThemeContext = createContext<ThemeContextType>(undefined);

export const isTheme = (value: unknown): value is Theme => {
  return typeof value === "string" && themes.includes(value as Theme);
}

const prefersLightMQ = "(prefers-color-scheme: light)";
const getPreferredTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK;

const ThemeProvider = ({ children, suppliedTheme }: ThemeProviderType): JSX.Element => {
  const [theme, setTheme] = useState<Theme | undefined>(() => {
    if (suppliedTheme) {
      if (themes.includes(suppliedTheme)) return suppliedTheme
      else return undefined
    }

    if (typeof window !== 'object') return undefined

    return getPreferredTheme()});

    const persistTheme = useFetcher();

    const persistThemeRef = React.useRef(persistTheme);
    React.useEffect(() => {
      persistThemeRef.current = persistTheme;
    }, [persistTheme]);

    const mountRun = React.useRef(false);

    React.useEffect(() => {
      if (!mountRun.current) {
        mountRun.current = true;
        return;
      }
      if (!theme) return;

      persistThemeRef.current.submit(
        { theme },
        { action: "actions/set-theme", method: "post" }
      );
    }, [theme]);

    React.useEffect(() => {
      const mediaQuery = window.matchMedia(prefersLightMQ);
      const handleChange = () => {
        setTheme(mediaQuery.matches ? Theme.LIGHT : Theme.DARK);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

  const ThemeContextProvider = ThemeContext.Provider;
  return (
    <ThemeContextProvider value={[ theme, setTheme ]}>
      {children}
    </ThemeContextProvider>
  );
};

export default ThemeProvider;

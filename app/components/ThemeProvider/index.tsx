import type { ReactNode } from "react";
import React, {
  useState,
  Dispatch,
  createContext,
  SetStateAction,
} from "react";

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

const ThemeProvider = ({ children, suppliedTheme }: ThemeProviderType): JSX.Element => {
  const [theme, setTheme] = useState<Theme | undefined>(suppliedTheme);
  const ThemeContextProvider = ThemeContext.Provider;

  return (
    <ThemeContextProvider value={[ theme, setTheme ]}>
      {children}
    </ThemeContextProvider>
  );
};

export default ThemeProvider;

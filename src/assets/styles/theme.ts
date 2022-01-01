import { DefaultTheme } from "styled-components";

const palette = {
  lightGray: "#e4e4e4",
  gray: "#5f6368",
  blue: "#90caf9",
  darkblue: "rgb(100, 141, 174)",
  pink: "#f06595",
  darkpink: "rgb(219 89 131)",
  black: "rgba(0, 0, 0, 0.87)",
  white: "white",
};

const size = {
  headerHeight: "60px",
};

export const lightTheme: DefaultTheme = {
  palette,
  color: {
    border: palette.lightGray,
    title: palette.gray,
    font: palette.white,
  },
  size,
};

export const darkTheme: DefaultTheme = {
  palette,
  color: {
    border: palette.lightGray,
    title: palette.gray,
    font: palette.black,
  },
  size,
};

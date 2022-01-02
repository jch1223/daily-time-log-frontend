import { DefaultTheme } from "styled-components";

const palette = {
  lightGray: "#e4e4e4",
  gray: "#5f6368",
  lightblue: "#90CAF9",
  blue: "#3576A1",
  darkblue: "#005078",
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

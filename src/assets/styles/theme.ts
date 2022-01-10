import { DefaultTheme } from "styled-components";

const palette = {
  lightGray: "#e4e4e4",
  gray: "#212121",
  lightblue: "#90CAF9",
  blue: "#3576A1",
  darkblue: "#005078",
  lightpink: "rgb(204, 115, 225)",
  pink: "#f06595",
  darkpink: "rgb(219 89 131)",
  black: "rgba(0, 0, 0, 0.87)",
  white: "white",
};

const size = {
  headerHeight: "75px",
};

export const lightTheme: DefaultTheme = {
  palette,
  color: {
    backgroundColor: palette.white,
    border: palette.lightGray,
    title: palette.gray,
    buttonFont: palette.white,
    font: palette.black,
    scheduleBackground: palette.lightpink,
  },
  size,
};

export const darkTheme: DefaultTheme = {
  palette,
  color: {
    backgroundColor: palette.gray,
    border: palette.lightGray,
    title: palette.gray,
    buttonFont: palette.black,
    font: palette.black,
    scheduleBackground: palette.lightpink,
  },
  size,
};

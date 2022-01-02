import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      lightGray: string;
      gray: string;
      lightblue: string;
      blue: string;
      darkblue: string;
      pink: string;
      darkpink: string;
      black: string;
      white: string;
    };
    color: {
      border: string;
      title: string;
      buttonFont: string;
      font: string;
    };
    size: {
      headerHeight: string;
    };
  }
}

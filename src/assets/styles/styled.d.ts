import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      lightGray: string;
      gray: string;
      lightblue: string;
      blue: string;
      darkblue: string;
      lightpink: string;
      pink: string;
      darkpink: string;
      black: string;
      white: string;
    };
    color: {
      backgroundColor: string;
      border: string;
      title: string;
      buttonFont: string;
      font: string;
      scheduleBackground: string;
    };
    size: {
      headerHeight: string;
    };
  }
}

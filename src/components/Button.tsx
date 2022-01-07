/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import styled, { css } from "styled-components";

interface Sizes {
  large: {
    height: string;
    fontSize: string;
  };
  medium: {
    height: string;
    fontSize: string;
  };
  small: {
    height: string;
    fontSize: string;
  };
}

interface Props {
  children: React.ReactNode;
  color?: "blue" | "pink";
  size: keyof Sizes;
  fullWidth?: boolean;
  background?: boolean;
  boxShadow?: boolean;
  onClick?(): void;
}

function Button({ children, color, size, fullWidth, background, boxShadow, onClick }: Props) {
  return (
    <StyledButton
      color={color}
      size={size}
      fullWidth={fullWidth}
      background={background}
      boxShadow={boxShadow}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

const boxShadowStyles = css<Props>`
  ${({ boxShadow }) => {
    return (
      boxShadow &&
      css`
        box-shadow: 0px 5px 2px 0px rgb(0 0 0 / 20%), 2px 4px 4px 3px rgb(0 0 0 / 14%),
          2px 3px 7px 2px rgb(0 0 0 / 12%);
      `
    );
  }};
`;

const fullWidthStyles = css<Props>`
  ${({ fullWidth }) => {
    return (
      fullWidth &&
      css`
        width: 100%;
        justify-content: center;
      `
    );
  }}
`;

const colorStyles = css<Props>`
  ${({ theme, color, background }) => {
    const selected = theme.palette[color];

    if (!background) {
      return css`
        border: none;
        background: none;
      `;
    }

    return css`
      background: ${selected};
      :hover {
        background: ${theme.palette[`dark${color}`]};
      }
    `;
  }}
`;

const sizes: Sizes = {
  large: { height: "3rem", fontSize: "1.25rem" },
  medium: { height: "2.25rem", fontSize: "1rem" },
  small: { height: "1.75rem", fontSize: "0.875rem" },
};

const sizeStyles = css<Props>`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.buttonFont};
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  ${colorStyles}
  ${sizeStyles}
  ${fullWidthStyles}
  ${boxShadowStyles}
`;

Button.defaultProps = {
  onClick: () => {},
  color: "blue",
  background: true,
  fullWidth: false,
  boxShadow: false,
};

export default Button;

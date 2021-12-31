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
  color: "blue" | "pink";
  size: keyof Sizes;
  onClick?(): void;
}

function Button({ children, color, size, onClick }: Props) {
  return (
    <StyledButton color={color} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const colorStyles = css<Props>`
  ${({ theme, color }) => {
    const selected = theme.palette[color];

    return css`
      background: ${selected};
      :hover {
        background: ${theme.palette[`dark${color}`]};
      }
    `;
  }}
`;

const sizes = {
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
  color: ${({ theme }) => theme.color.font};
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  ${colorStyles}
  ${sizeStyles}
`;

Button.defaultProps = {
  onClick: () => {},
};

export default Button;

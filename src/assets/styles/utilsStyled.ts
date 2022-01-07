import styled, { keyframes } from "styled-components";

export const FlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

export const slideUp = keyframes`
  from {
    transform: translateY(30px);
  }

  to {
    transform: translateY(0px);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(30px);
  }
`;

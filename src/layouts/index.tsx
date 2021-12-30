import React from "react";
import styled from "styled-components";

import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

function index({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  height: calc(100vh - 92px);
`;

export default index;

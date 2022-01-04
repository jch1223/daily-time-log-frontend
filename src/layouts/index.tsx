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
  height: calc(100vh - 1px - ${({ theme }) => theme.size.headerHeight});
`;

export default index;

import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Side from "./Side";

type Props = {
  children: React.ReactNode;
};

function index({ children }: Props) {
  return (
    <>
      <Header />
      <Main>
        <SideWrap>
          <Side />
        </SideWrap>

        <ContentWrap>{children}</ContentWrap>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  border-top: 1px solid #e4e4e4;
`;

const SideWrap = styled.div`
  width: 250px;
  min-height: calc(100vh - 68px);
  border-right: 1px solid #e4e4e4;
`;

const ContentWrap = styled.div``;

export default index;

import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

function Side({ children }: Props) {
  return <SideWrap>{children}</SideWrap>;
}

const SideWrap = styled.aside`
  width: 60%;
  min-height: calc(100vh - 113px);
  padding: 10px;
  border-right: 1px solid #e4e4e4;
`;

export default Side;

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
  border-right: 1px solid #e4e4e4;
`;

export default Side;

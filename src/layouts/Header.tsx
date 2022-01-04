import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/store";

import GoogleAuth from "../features/auth/GoogleAuth";

function Header() {
  const name = useAppSelector((state) => state.auth.name);

  return (
    <HeaderWrap>
      <div className="left">
        <HeaderTitle>DAILY TIME LOG</HeaderTitle>
      </div>

      <div className="middle" />

      <div className="right">
        <div>{name}</div>
        <GoogleAuth />
      </div>
    </HeaderWrap>
  );
}

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.title};
`;

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: ${({ theme }) => theme.size.headerHeight};
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .left {
    flex: 1 0 auto;
    padding-left: 30px;
    padding-right: 30px;
  }
  .middle {
    flex: 1 1 100%;
    font-size: 24px;
    align-items: center;
  }
  .right {
    flex: 0 0 auto;
  }
`;

export default Header;

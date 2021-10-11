import React from "react";
import styled from "styled-components";

import { AiOutlineMenu } from "react-icons/ai";
import Login from "../features/auth/Login";

function Header() {
  return (
    <HeaderStyled>
      <HeaderWrapper>
        <div className="left">
          <div className="outline-menu">
            <AiOutlineMenu style={{ fontSize: "18px" }} />
          </div>
          <div className="align-items-center logo">DAILY TIME LOG</div>
        </div>

        <div className="middle">HeaderStyled</div>

        <div className="right">
          <Login />
          <button type="button">회원가입</button>
          <button type="button">로그인</button>
          <button type="button">로그아웃</button>
        </div>
      </HeaderWrapper>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  min-height: 40px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    padding-right: 30px;
    height: 48px;

    .outline-menu {
      border-radius: 50%;
      margin: 0 4px;
      padding: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 18px;
      width: 18px;

      :hover {
        background-color: #3c404314;
      }
    }
    .logo {
      color: #5f6368;
      font-size: 24px;
      padding: 10px 0;
    }
  }
  .middle {
    display: flex;
    flex: 1 1 100%;
  }
  .right {
    display: flex;
    flex: 0 0 auto;
  }
`;

export default Header;

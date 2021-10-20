import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { AiOutlineMenu } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../app/store";

import Login from "../features/auth/Login";
import NoneBackgroundButton from "../components/NoneBackgroundButton";
import { nextMonth, prevMonth } from "../features/calendar/calendarSlice";

function Header() {
  const displayedInfo = useAppSelector((state) => state.calendar.displayed);

  const dispatch = useAppDispatch();

  const onNextButtonClick = () => {
    dispatch(nextMonth());
  };

  const onPrevButtonClick = () => {
    dispatch(prevMonth());
  };

  return (
    <HeaderStyled>
      <HeaderWrapper>
        <div className="left">
          {/* <div className="outline-menu">
            <AiOutlineMenu style={{ fontSize: "18px" }} />
          </div> */}
          <div className="align-items-center logo">DAILY TIME LOG</div>
        </div>

        <div className="middle">
          <NoneBackgroundButton onClick={onPrevButtonClick}>{"<"}</NoneBackgroundButton>
          {dayjs().set(displayedInfo).format("YYYY년 MM월")}
          <NoneBackgroundButton onClick={onNextButtonClick}>{">"}</NoneBackgroundButton>
        </div>

        <div className="right">
          <Login />
        </div>
      </HeaderWrapper>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  min-height: 92px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  width: 100%;

  .left {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    padding-left: 30px;
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
    font-size: 24px;
    align-items: center;
  }
  .right {
    display: flex;
    flex: 0 0 auto;
  }
`;

export default Header;

import React from "react";
import styled from "styled-components";

import background from "../assets/login-background.png";
import GoogleAuth from "../features/auth/GoogleAuth";
import MonthCalendar from "../features/calendar/MonthCalendar";

function IndexPage() {
  return (
    <IndexPageWrap>
      <ContentWrap>
        <TitleWrap>
          <div>DAILY</div>
          <div>TIME</div>
          <div>LOG</div>
        </TitleWrap>
        <LoginWrap>
          <CalendarWrap>
            <MonthCalendar />
          </CalendarWrap>

          <div style={{ height: "36px" }}>
            <GoogleAuth />
          </div>
        </LoginWrap>
      </ContentWrap>
    </IndexPageWrap>
  );
}

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  margin: 1rem;
  padding: 0 2rem;
  box-sizing: border-box;
`;

const TitleWrap = styled.div`
  font-size: 6rem;
  margin: 1rem;
  text-align: center;
  width: 300px;
  color: ${({ theme }) => theme.palette.black};
`;

const ContentWrap = styled.div`
  display: flex;
  align-items: stretch;
`;

const CalendarWrap = styled.div`
  height: 70%;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 5px 2px 0px rgb(0 0 0 / 20%), 2px 4px 4px 3px rgb(0 0 0 / 14%),
    2px 3px 7px 2px rgb(0 0 0 / 12%);
`;

const IndexPageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
  background-image: url(${background});
`;

export default IndexPage;

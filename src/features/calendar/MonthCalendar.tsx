import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { init, DateInfo } from "./calendarSlice";
import MonthCalendarDate from "./MonthCalendarDate";

export const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];

function MonthCalendar() {
  const allDatesId = useAppSelector((state) => state.calendar.allDatesId, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const now = dayjs();
    const dateInfo: DateInfo = {
      year: now.year(),
      month: now.month(),
      date: now.date(),
      timezone: dayjs.tz.guess(),
    };

    dispatch(init(dateInfo));
  }, []);

  return (
    <div>
      <WeeksStyled>
        {WEEKS.map((week) => (
          <div key={week}>
            <span>{week}</span>
          </div>
        ))}
      </WeeksStyled>
      <MonthCalenderViewWrap>
        {allDatesId?.map((dateId) => {
          return <MonthCalendarDate key={dateId} dateId={dateId} />;
        })}
      </MonthCalenderViewWrap>
    </div>
  );
}

const WeeksStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MonthCalenderViewWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 8rem;

  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
`;

export default MonthCalendar;

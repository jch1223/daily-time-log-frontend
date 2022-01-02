import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { init, DateInfo } from "./calendarSlice";
import MonthCalendarDate from "./MonthCalendarDate";

export const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];

function MonthCalendar() {
  // const displayed = useAppSelector((state) => state.calendar.displayed);
  const allDatesId = useAppSelector((state) => state.calendar.allDatesId);

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
    <MonthCalenderWrap>
      <MonthCalendarDays>
        {WEEKS.map((day) => {
          return <span key={day}>{day}</span>;
        })}
      </MonthCalendarDays>
      <MonthCalenderDates>
        {allDatesId?.map((dateId) => {
          return <MonthCalendarDate key={dateId} dateId={dateId} />;
        })}
      </MonthCalenderDates>
    </MonthCalenderWrap>
  );
}

const gridColumns = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const MonthCalendarDays = styled.div`
  ${gridColumns}
  justify-items: center;
  font-size: 13px;
`;

const MonthCalenderDates = styled.div`
  ${gridColumns}
  height: 100%;
  grid-template-rows: repeat(6, 1fr);
`;

const MonthCalenderWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export default MonthCalendar;

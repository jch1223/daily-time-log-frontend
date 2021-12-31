import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { init, DateInfo } from "./calendarSlice";
import MonthCalendarDate from "./MonthCalendarDate";

export const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];

function MonthCalendar() {
  const displayed = useAppSelector((state) => state.calendar.displayed);
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
    <MonthCalenderWrap>
      <MonthCalenderViewWrap>
        {allDatesId?.map((dateId) => {
          return <MonthCalendarDate key={dateId} dateId={dateId} />;
        })}
      </MonthCalenderViewWrap>
    </MonthCalenderWrap>
  );
}

const MonthCalenderViewWrap = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const MonthCalenderWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export default MonthCalendar;

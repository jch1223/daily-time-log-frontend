import React, { memo, useEffect } from "react";
import dayjs from "dayjs";
import styled, { DefaultTheme } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { setDisplayedDate } from "./calendarSlice";

interface MonthCalendarDateProps {
  dateId: string;
}

interface Date {
  backgroundColor: keyof DefaultTheme["palette"];
  color: keyof DefaultTheme["palette"];
}

function MonthCalendarDate({ dateId }: MonthCalendarDateProps) {
  const displayedDate = useAppSelector((state) => state.calendar.displayed.date);
  const displayedMonth = useAppSelector((state) => state.calendar.displayed.month);
  const calendarByDateId = useAppSelector((state) => state.calendar.byDateId[dateId]);

  const { date, month, isSaturday, isSunday, isToday } = calendarByDateId;
  const isDisplayed = displayedDate === date && displayedMonth === month;

  const dispatch = useAppDispatch();

  return (
    <DateWrap>
      <Date
        color={(isToday && "white") || (isSaturday && "blue") || (isSunday && "pink") || "black"}
        backgroundColor={(isToday && "blue") || (isDisplayed && "lightblue") || "white"}
        onClick={() => {
          dispatch(setDisplayedDate({ month, date }));
        }}
      >
        {date}
      </Date>
    </DateWrap>
  );
}

const DateWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Date = styled.div<Date>`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-bottom: 2px;
  border-radius: 50%;
  font-size: 0.9rem;

  color: ${({ theme, color }) => theme.palette[color]};
  background-color: ${({ theme, backgroundColor }) => theme.palette[backgroundColor]};

  &:hover {
    cursor: pointer;
  }
`;

interface EventProps {
  isStart: boolean;
  isEnd: boolean;
}

const Event = styled.div<EventProps>`
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 20px;

  border-radius: 3px;
  margin-bottom: 1px;
  padding: 0 4px;
  margin: 3px 0;
  background-color: rgb(204, 115, 225);

  ${({ isStart, isEnd }) => {
    if (isStart && isEnd) {
      return "border-radius: 5px";
    }

    if (isStart) {
      return "border-radius: 5px 0 0 5px";
    }

    if (isEnd) {
      return "border-radius: 0 5px 5px 0";
    }

    return "border-radius: 0";
  }};
`;

export default memo(MonthCalendarDate);

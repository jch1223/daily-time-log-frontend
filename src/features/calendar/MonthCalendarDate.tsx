import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { setDisplayedDate } from "./calendarSlice";

interface MonthCalendarDateProps {
  dateId: string;
}

export default function MonthCalendarDate({ dateId }: MonthCalendarDateProps) {
  const displayedDate = useAppSelector((state) => state.calendar.displayed.date);
  const calendarByDateId = useAppSelector((state) => state.calendar.byDateId[dateId]);
  const { date, isSaturday, isSunday, isToday, isCurrentMonth } = calendarByDateId;

  const dispatch = useAppDispatch();

  return (
    <MonthCalendarDateWrap
      className="date"
      isSaturday={isSaturday}
      isSunday={isSunday}
      isCurrentMonth={isCurrentMonth}
    >
      <DateWrap>
        <Date
          idDisplayed={displayedDate === date}
          isToday={isToday}
          onClick={() => {
            dispatch(setDisplayedDate(date));
          }}
        >
          {date}
        </Date>
      </DateWrap>
    </MonthCalendarDateWrap>
  );
}

interface MonthCalendarDateWrapProps {
  isSaturday: boolean;
  isSunday: boolean;
  isCurrentMonth: boolean;
}

interface EventProps {
  isStart: boolean;
  isEnd: boolean;
}

const DateWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Date = styled.div<{ idDisplayed: boolean; isToday: boolean }>`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-bottom: 2px;
  border-radius: 50%;
  ${({ idDisplayed }) => idDisplayed && "background-color: #d2e3fc"};
  ${({ isToday }) => isToday && "background-color: #1a73e8"};
  ${({ isToday }) => isToday && "color: #ffffff"};

  &:hover {
    cursor: pointer;
  }
`;

const MonthCalendarDateWrap = styled.div<MonthCalendarDateWrapProps>`
  overflow: hidden;
  font-size: 15px;

  ${({ isSaturday }) => isSaturday && "color: blue"};
  ${({ isSunday }) => isSunday && "color: red"};
`;

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

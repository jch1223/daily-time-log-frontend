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
  const { date, isSaturday, isSunday, isToday, isCurrentMonth, events } = calendarByDateId;

  const dispatch = useAppDispatch();

  return (
    <MonthCalendarDateWrap
      isSaturday={isSaturday}
      isSunday={isSunday}
      isCurrentMonth={isCurrentMonth}
    >
      <Date
        idDisplayed={displayedDate === date}
        onClick={() => {
          dispatch(setDisplayedDate(date));
        }}
      >
        {date}
      </Date>
      <span style={{ color: "#185abc", fontWeight: "bold" }}>{isToday && " TODAY"}</span>

      <div>
        {events.map((event) => {
          return (
            <Event key={event.id} backGroundColor="#e4e4e4">
              {event.summary}
            </Event>
          );
        })}
      </div>
    </MonthCalendarDateWrap>
  );
}

interface MonthCalendarDateWrapProps {
  isSaturday: boolean;
  isSunday: boolean;
  isCurrentMonth: boolean;
}

interface EventProps {
  backGroundColor: string;
}

const Date = styled.div<{ idDisplayed: boolean }>`
  display: inline-block;
  padding: 2px;
  margin-bottom: 2px;
  border-radius: 50%;
  ${({ idDisplayed }) => idDisplayed && "background-color: #d2e3fc"};

  &:hover {
    cursor: pointer;
  }
`;

const MonthCalendarDateWrap = styled.div<MonthCalendarDateWrapProps>`
  overflow: hidden;
  border: 1px solid black;
  padding: 0.5rem;
  font-size: 15px;

  ${({ isSaturday }) => isSaturday && "color: blue"};
  ${({ isSunday }) => isSunday && "color: red"};
  ${({ isCurrentMonth }) => !isCurrentMonth && "opacity: 0.4"};
`;

const Event = styled.div<EventProps>`
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  border-radius: 3px;
  margin-bottom: 1px;
  padding: 0 4px;
  background-color: ${({ backGroundColor }) => backGroundColor && backGroundColor};
`;

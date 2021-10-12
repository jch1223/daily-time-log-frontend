import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../app/store";

interface MonthCalendarDateProps {
  dateId: string;
}

export default function MonthCalendarDate({ dateId }: MonthCalendarDateProps) {
  const calendarByDateId = useAppSelector((state) => state.calendar.byDateId[dateId]);

  const { date, isSaturday, isSunday, isToday, isCurrentMonth, events } = calendarByDateId;

  return (
    <MonthCalendarDateWrap
      isSaturday={isSaturday}
      isSunday={isSunday}
      isCurrentMonth={isCurrentMonth}
    >
      <span>{date}</span>
      <span style={{ color: "red", fontWeight: "bold" }}>{isToday && " TODAY"}</span>

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

const MonthCalendarDateWrap = styled.div<MonthCalendarDateWrapProps>`
  overflow: hidden;
  border: 1px solid black;
  padding: 0.5rem;
  ${({ isSaturday }) => isSaturday && "color: blue"};
  ${({ isSunday }) => isSunday && "color: red"};
  ${({ isCurrentMonth }) => !isCurrentMonth && "opacity: 0.4"};
`;

const Event = styled.div<EventProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  border-radius: 3px;
  margin-bottom: 1px;
  padding: 0 4px;
  background-color: ${({ backGroundColor }) => backGroundColor && backGroundColor};
`;

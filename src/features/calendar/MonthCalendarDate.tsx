import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../app/store";

interface MonthCalendarDateProps {
  dateId: string;
}

export default function MonthCalendarDate({ dateId }: MonthCalendarDateProps) {
  const calendarByDateId = useAppSelector((state) => state.calendar.byDateId[dateId]);

  const { date, isSaturday, isSunday, isToday, isCurrentMonth } = calendarByDateId;

  return (
    <MonthCalendarDateStyled
      isSaturday={isSaturday}
      isSunday={isSunday}
      isCurrentMonth={isCurrentMonth}
    >
      <span>{date}</span>
      <span style={{ color: "red", fontWeight: "bold" }}>{isToday && " TODAY"}</span>
    </MonthCalendarDateStyled>
  );
}

interface MonthCalendarDateStyledProps {
  isSaturday: boolean;
  isSunday: boolean;
  isCurrentMonth: boolean;
}

const MonthCalendarDateStyled = styled.div<MonthCalendarDateStyledProps>`
  overflow: hidden;
  border: 1px solid black;
  padding: 0.5rem;
  ${({ isSaturday }) => isSaturday && "color: blue"};
  ${({ isSunday }) => isSunday && "color: red"};
  ${({ isCurrentMonth }) => !isCurrentMonth && "opacity: 0.4"};
`;

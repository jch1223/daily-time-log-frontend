import dayjs from "dayjs";
import React, { memo } from "react";
import styled, { DefaultTheme } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import Schedule from "../schedules/Schedule";
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
  const schedulesById = useAppSelector((state) => state.schedules.byScheduleId);

  const { date, month, isSaturday, isSunday, isToday, schedules } = calendarByDateId;
  const isDisplayed = displayedDate === date && displayedMonth === month;

  const dispatch = useAppDispatch();

  return (
    <div>
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

      {schedules.map((scheduleId) => {
        const startDate = schedulesById[scheduleId].start.date;
        const endDate = dayjs(schedulesById[scheduleId].end.date)
          .add(-1, "day")
          .format("YYYY-MM-DD");

        return (
          <Schedule
            key={scheduleId}
            isStart={dateId === startDate}
            isEnd={dateId === endDate}
            summary={schedulesById[scheduleId].summary}
          />
        );
      })}
    </div>
  );
}

const DateWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Date = styled.div<Date>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;
  font-size: 0.9rem;

  color: ${({ theme, color }) => theme.palette[color]};
  background-color: ${({ theme, backgroundColor }) => theme.palette[backgroundColor]};

  &:hover {
    cursor: pointer;
  }
`;

export default memo(MonthCalendarDate);

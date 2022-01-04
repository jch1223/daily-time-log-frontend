import React, { useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { loadTimeLog } from "./timeLogSlice";

export const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];

function TimeLog() {
  const displayed = useAppSelector((state) => state.calendar.displayed);
  const dateId = dayjs().set(displayed).format("YYYY-MM-DD");
  const allHourIds = useAppSelector((state) => state.timeLog.allHourIds);
  const byHourId = useAppSelector((state) => state.timeLog.byHourId);

  const month = dayjs().set(displayed).month() + 1;
  const day = dayjs().set(displayed).day();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (displayed) dispatch(loadTimeLog({ date: displayed }));
  }, [displayed]);

  return (
    <TimeLogWrap>
      <Title>TIMETABLE</Title>

      <div className="time-table">
        {allHourIds?.map((hourId) => {
          return (
            <HourWrap key={hourId}>
              <Hour>{dayjs(hourId).hour()}</Hour>
              <MinuteWrap>
                {Object.keys(byHourId[hourId])?.map((minuteId) => {
                  return (
                    <div
                      style={{ backgroundColor: byHourId[hourId][minuteId].color }}
                      key={minuteId}
                      className="flex-1"
                    >
                      {" "}
                    </div>
                  );
                })}
              </MinuteWrap>
            </HourWrap>
          );
        })}
      </div>
    </TimeLogWrap>
  );
}

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const MinuteWrap = styled.div`
  display: flex;
  width: 100%;

  .flex-1 {
    flex: 1;

    &:nth-child(10n) {
      border-right: 1px solid #e4e4e4;
    }
  }
`;

const Hour = styled.div`
  display: flex;
  width: 10%;
  padding: 0px 7px;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e4e4e4;
  font-size: 15px;
`;

const HourWrap = styled.div`
  display: flex;
  height: 25px;

  & + & {
    border-top: 1px solid #e4e4e4;
  }
`;

const TimeLogWrap = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;

  .date {
    font-size: 26px;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e4e4e4;
  }

  .time-table {
    height: calc(100% - 53px);
    overflow: scroll;
  }
`;

export default TimeLog;

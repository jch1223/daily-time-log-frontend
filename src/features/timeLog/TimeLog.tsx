import React, { memo, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { loadTimeLog } from "./timeLogSlice";

export const WEEKS = ["일", "월", "화", "수", "목", "금", "토"];

function TimeLog() {
  const allHourIds = useAppSelector((state) => state.timeLog.allHourIds);
  const byHourId = useAppSelector((state) => state.timeLog.byHourId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTimeLog());
  }, []);

  return (
    <TimeLogWrap>
      <Title>TIMETABLE</Title>

      <TimeTable>
        {/* {allHourIds?.map((hourId) => {
          return (
            <HourWrap key={hourId}>
              <Hour>{hourId}</Hour>
              <MinuteWrap>
                {Object.keys(byHourId[hourId])?.map((minuteId) => {
                  return (
                    <Minute
                      style={{ backgroundColor: byHourId[hourId][minuteId].color }}
                      key={minuteId}
                    >
                      {" "}
                    </Minute>
                  );
                })}
              </MinuteWrap>
            </HourWrap>
          );
        })} */}
      </TimeTable>
    </TimeLogWrap>
  );
}

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const Minute = memo(styled.div`
  flex: 1;

  &:nth-child(10n) {
    border-right: 1px solid rgb(228, 228, 228);
  }

  &:last-child {
    border: none;
  }
`);

const MinuteWrap = styled.div`
  display: flex;
  width: 100%;
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

const TimeTable = styled.div`
  overflow: scroll;
  padding-right: 16px;
`;

const TimeLogWrap = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`;

export default TimeLog;

import React, { useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { init as timeLogInit } from "./timeLogSlice";
import { init as goalsInit } from "../goals/goalsSlice";

function TimeLog() {
  const displayed = useAppSelector((state) => state.calendar.displayed);
  const dateId = dayjs().set(displayed).format("YYYY-MM-DD");
  const allHourIds = useAppSelector((state) => state.timeLog.allHourIds);
  const byHourId = useAppSelector((state) => state.timeLog.byHourId);
  const goals = useAppSelector((state) => state.goals.byDateId[dateId], shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (displayed) dispatch(goalsInit(dateId));
  }, [displayed]);

  useEffect(() => {
    if (displayed) dispatch(timeLogInit({ date: displayed, goals: goals || [] }));
  }, [displayed, goals]);

  return (
    <TimeLogWrap>
      {allHourIds?.map((hourId) => {
        return (
          <HourWrap key={hourId}>
            <div className="hour">{dayjs(hourId).hour()}</div>
            <MinuteWrap>
              {Object.keys(byHourId[hourId])?.map((minuteId) => {
                return (
                  <div
                    style={{ backgroundColor: byHourId[hourId][minuteId].color }}
                    key={minuteId}
                    className={`${minuteId} flex-1`}
                  >
                    {" "}
                  </div>
                );
              })}
            </MinuteWrap>
          </HourWrap>
        );
      })}
    </TimeLogWrap>
  );
}

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

const HourWrap = styled.div`
  display: flex;
  height: 100%;
  border-bottom: 1px solid #e4e4e4;

  .hour {
    display: flex;
    width: 10%;
    padding: 0px 7px;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right: 1px solid #e4e4e4;
  }
`;

const TimeLogWrap = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default TimeLog;

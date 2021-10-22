import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { MdPauseCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { updateGoals } from "./goalsSlice";
import { setDisplayedDate } from "../calendar/calendarSlice";

interface Props {
  onPauseClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

function RunningTime({ onPauseClick }: Props) {
  const milestone = useAppSelector((state) => state.goals.runningMilestone);
  const [runningTime, setRunningTime] = useState("00:00:00");
  const dateId = dayjs().format("YYYY-MM-DD");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const start = dayjs();
    const timezone = dayjs.tz.guess();

    const setIntervalId = setInterval(() => {
      setRunningTime(dayjs.duration(dayjs().diff(dayjs(start))).format("HH:mm:ss"));
    }, 1000);

    const eventListener = () => {
      dispatch(
        updateGoals({
          dateId,
          goal: {
            milestoneId: milestone.id,
            color: milestone.color,
            summary: milestone.summary,
            start: {
              dateTime: start.format("YYYY-MM-DDTHH:mm"),
              timezone,
            },
            end: {
              dateTime: dayjs().format("YYYY-MM-DDTHH:mm"),
              timezone,
            },
          },
        }),
      );
    };

    window.addEventListener("beforeunload", eventListener);

    return () => {
      window.removeEventListener("beforeunload", eventListener);
      clearInterval(setIntervalId);
      dispatch(
        updateGoals({
          dateId,
          goal: {
            milestoneId: milestone.id,
            color: milestone.color,
            summary: milestone.summary,
            start: {
              dateTime: start.format("YYYY-MM-DDTHH:mm"),
              timezone,
            },
            end: {
              dateTime: dayjs().format("YYYY-MM-DDTHH:mm"),
              timezone,
            },
          },
        }),
      );
      dispatch(setDisplayedDate(dayjs().date()));
    };
  }, []);

  return (
    <RunningTimeWrap>
      <div className="title">현재 진행 시간</div>
      <div className="running-time">
        <div className="timer">{runningTime}</div>
        <MdPauseCircle cursor="pointer" onClick={onPauseClick} color="#7e7e7e" />
      </div>
    </RunningTimeWrap>
  );
}

const RunningTimeWrap = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c5c5c5;

  .title {
    font-size: 30px;
    font-weight: 600;
  }
  .running-time {
    display: flex;
    align-items: center;
    font-size: 60px;
  }
  .timer {
    padding-right: 10px;
  }
`;

export default RunningTime;

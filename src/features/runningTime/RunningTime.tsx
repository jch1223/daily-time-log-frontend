import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import { MdPauseCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/store";

interface Props {
  onPauseClick: MouseEventHandler;
  milestoneId: string;
}

function RunningTime({ milestoneId, onPauseClick }: Props) {
  const [runningTime, setRunningTime] = useState("00:00:00");
  const dateId = dayjs().format("YYYY-MM-DD");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const start = dayjs();
    const timezone = dayjs.tz.guess();

    const setIntervalId = setInterval(() => {
      setRunningTime(dayjs.duration(dayjs().diff(dayjs(start))).format("HH:mm:ss"));
    }, 1000);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const beforeunloadListener = () => {};

    window.addEventListener("beforeunload", beforeunloadListener);

    return () => {
      window.removeEventListener("beforeunload", beforeunloadListener);
      clearInterval(setIntervalId);
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

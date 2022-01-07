import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import dayjs from "dayjs";
import { MdPauseCircle } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { createRunningTime } from "../../utils/api/runningTimes";

import Error from "../../components/Error";
import { addRunningTimes } from "../timeLog/timeLogSlice";

interface Props {
  onPauseClick: MouseEventHandler;
  milestoneId: string;
}

function RunningTime({ milestoneId, onPauseClick }: Props) {
  const [isError, setIsError] = useState(false);
  const [runningTime, setRunningTime] = useState("00:00:00");
  const dateId = dayjs().format("YYYY-MM-DD");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timezone = dayjs.tz.guess();
    const start = dayjs().tz(timezone);

    const setIntervalId = setInterval(() => {
      setRunningTime(dayjs.duration(dayjs().diff(dayjs(start))).format("HH:mm:ss"));
    }, 1000);

    const runningTime = {
      start: {
        dateTime: start.format("YYYY-MM-DDTHH:mm"),
        timezone,
      },
      end: {
        dateTime: dayjs().tz(timezone).format("YYYY-MM-DDTHH:mm"),
        timezone,
      },
    };
    const beforeunloadListener = () => {
      createRunningTimeMutation.mutate({ milestoneId, runningTime });
    };

    window.addEventListener("beforeunload", beforeunloadListener);

    return () => {
      createRunningTimeMutation.mutate({ milestoneId, runningTime });
      window.removeEventListener("beforeunload", beforeunloadListener);
      clearInterval(setIntervalId);
    };
  }, []);

  const createRunningTimeMutation = useMutation(createRunningTime, {
    onSuccess: (result) => {
      dispatch(addRunningTimes([result.data]));
    },
    onError: () => {
      setIsError(true);
    },
  });

  if (isError) {
    return <Error />;
  }

  return (
    <RunningTimeWrap>
      <div className="title">현재 진행 시간</div>
      <div className="running-time">
        <div className="timer">{runningTime}</div>
        <MdPauseCircle
          cursor="pointer"
          onClick={(e) => {
            onPauseClick(e);
          }}
          color="#7e7e7e"
        />
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
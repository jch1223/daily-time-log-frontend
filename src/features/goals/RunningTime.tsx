import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { MdPauseCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { updateGoals } from "./goalsSlice";

function RunningTime() {
  const milestoneId = useAppSelector((state) => state.goals.runningMilestoneId);
  const [runningTime, setRunningTime] = useState("00:00:00");

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
          milestoneId,
          start: start.format("YYYY-MM-DDTHH:mm"),
          end: dayjs().format("YYYY-MM-DDTHH:mm"),
          timezone,
        }),
      );
    };

    window.addEventListener("beforeunload", eventListener);

    return () => {
      window.removeEventListener("beforeunload", eventListener);
      clearInterval(setIntervalId);
      dispatch(
        updateGoals({
          start: start.format("YYYY-MM-DDTHH:mm"),
          end: dayjs().format("YYYY-MM-DDTHH:mm"),
          timezone,
        }),
      );
    };
  }, []);

  return (
    <div>
      <div>
        <div>현재 진행 시간</div>
        <div>{runningTime}</div>
        <MdPauseCircle />
      </div>
    </div>
  );
}

export default RunningTime;

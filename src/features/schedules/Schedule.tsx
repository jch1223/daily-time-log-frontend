import dayjs from "dayjs";
import React, { MouseEventHandler, useState } from "react";
import styled, { css } from "styled-components";

import { useAppSelector } from "../../app/store";

import Modal from "../../components/Modal";
import ScheduleInfo from "./ScheduleInfo";

interface ScheduleProps {
  id: string;
  isStart: boolean;
  isEnd: boolean;
  summary: string;
  position: number;
}

function Schedule({ id, isStart, isEnd, summary, position }: ScheduleProps) {
  const [isShowScheduleInfo, setIsShowScheduleInfo] = useState(false);
  const scheduleInfo = useAppSelector((state) => state.schedules.byScheduleId[id]);

  const startDate = dayjs(scheduleInfo.start.date)
    .tz(scheduleInfo.start.timeZone)
    .format("YYYY-MM-DD");

  const endDate = dayjs(scheduleInfo.end.date)
    .tz(scheduleInfo.end.timeZone)
    .subtract(1, "date")
    .format("YYYY-MM-DD");

  return (
    <div>
      <ScheduleStyled
        isStart={isStart}
        isEnd={isEnd}
        position={position}
        onClick={() => {
          setIsShowScheduleInfo(true);
        }}
      >
        <Summary>{summary}</Summary>
      </ScheduleStyled>

      <Modal
        rootId="schedule-info"
        isShowModal={isShowScheduleInfo}
        onBackgroundClick={() => {
          setIsShowScheduleInfo(false);
        }}
      >
        <ScheduleInfo
          summary={scheduleInfo.summary}
          startDate={startDate}
          endDate={endDate}
          description={scheduleInfo.description}
        />
      </Modal>
    </div>
  );
}

interface ScheduleStyledProps {
  isStart: boolean;
  isEnd: boolean;
  position: number;
  onClick: MouseEventHandler;
}

const Summary = styled.div`
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScheduleStyled = styled.div<ScheduleStyledProps>`
  position: absolute;
  display: flex;
  align-items: center;
  margin-top: ${({ position }) => `${position * 22}px`};
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.color.font};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.scheduleBackground};
  cursor: pointer;

  ${({ isStart, isEnd }) => {
    if (isStart && isEnd) {
      return css`
        border-radius: 5px;
        width: 90%;
      `;
    }

    if (isStart) {
      return css`
        border-radius: 5px 0 0 5px;
      `;
    }

    if (isEnd) {
      return css`
        border-radius: 0 5px 5px 0;
        width: 90%;
      `;
    }

    return css`
      border-radius: 0;
    `;
  }};
`;

export default Schedule;

import React from "react";
import styled, { css } from "styled-components";

interface ScheduleProps {
  isStart: boolean;
  isEnd: boolean;
  summary: string;
  position: number;
}

function Schedule({ isStart, isEnd, summary, position }: ScheduleProps) {
  return (
    <ScheduleStyled isStart={isStart} isEnd={isEnd} position={position}>
      <Summary>{summary}</Summary>
    </ScheduleStyled>
  );
}

interface ScheduleStyledProps {
  isStart: boolean;
  isEnd: boolean;
  position: number;
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

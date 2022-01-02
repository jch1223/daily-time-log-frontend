import React from "react";
import styled from "styled-components";

interface ScheduleProps {
  isStart: boolean;
  isEnd: boolean;
  summary: string;
}

function Schedule({ isStart, isEnd, summary }: ScheduleProps) {
  return (
    <ScheduleStyled isStart={isStart} isEnd={isEnd}>
      {summary}
    </ScheduleStyled>
  );
}

interface ScheduleStyledProps {
  isStart: boolean;
  isEnd: boolean;
}

const ScheduleStyled = styled.div<ScheduleStyledProps>`
  color: ${({ theme }) => theme.color.font};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 20px;

  border-radius: 3px;
  margin-bottom: 1px;
  padding: 0 4px;
  margin: 3px 0;
  background-color: rgb(204, 115, 225);

  ${({ isStart, isEnd }) => {
    if (isStart && isEnd) {
      return "border-radius: 5px";
    }

    if (isStart) {
      return "border-radius: 5px 0 0 5px";
    }

    if (isEnd) {
      return "border-radius: 0 5px 5px 0";
    }

    return "border-radius: 0";
  }};
`;

export default Schedule;

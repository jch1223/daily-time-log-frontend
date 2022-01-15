import React from "react";
import { MdCalendarToday, MdCreate, MdDelete, MdOutlineSubject } from "react-icons/md";
import styled from "styled-components";

interface ScheduleInfoProps {
  summary: string;
  startDate: string;
  endDate: string;
  description?: string;
}

function ScheduleInfo({ summary, startDate, endDate, description }: ScheduleInfoProps) {
  return (
    <ScheduleInfoStyled>
      <Header>
        <MdCreate />
        <MdDelete />
      </Header>
      <Info>
        <Summary>
          <MdCalendarToday />
          <div>
            <div>{summary}</div>
            <div className="date">
              {startDate} - {endDate}
            </div>
          </div>
        </Summary>
        {description && (
          <Description>
            <MdOutlineSubject /> {description}
          </Description>
        )}
      </Info>
    </ScheduleInfoStyled>
  );
}

ScheduleInfo.defaultProps = {
  description: "",
};

const Description = styled.div`
  display: flex;
`;

const Summary = styled.div`
  display: flex;
  margin-bottom: 15px;

  .date {
    font-size: 1.2rem;
  }
`;

const Info = styled.div`
  svg {
    margin-right: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  svg {
    cursor: pointer;
  }
  svg + svg {
    margin-left: 1rem;
  }
`;

const ScheduleInfoStyled = styled.div`
  width: 550px;
  padding: 30px;
  background-color: ${({ theme }) => theme.color.backgroundColor};
  color: ${({ theme }) => theme.color.font};
  font-size: 1.5rem;
`;

export default ScheduleInfo;

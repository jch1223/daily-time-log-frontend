import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { MdAddCircle, MdPlayCircleFilled } from "react-icons/md";
import { useMutation, useQuery } from "react-query";

import { useAppDispatch, useAppSelector } from "../app/store";
import { createMilestone, deleteMilestone, updateMilestone } from "../utils/api/milestones";
import { init } from "../features/timeLog/timeLogSlice";
import { setMilestoneId } from "../features/goals/goalsSlice";

import Layout from "../layout";
import Side from "../layout/Side";
import DailyEvent from "../features/calendar/DailyEvent";
import CommonModal from "../components/CommonModal";
import Milestone from "../features/milestones/Milestone";
import MonthCalendar from "../features/calendar/MonthCalendar";
import RunningTime from "../features/goals/RunningTime";

function HomePage() {
  const displayed = useAppSelector((state) => state.calendar.displayed);
  const allHourIds = useAppSelector((state) => state.timeLog.allHourIds);
  const byHourId = useAppSelector((state) => state.timeLog.byHourId);
  const userId = useAppSelector((state) => state.auth.userId);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const dispatch = useAppDispatch();

  const { isLoading, isError, data, error } = useQuery(
    ["getMilestone", userId],
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/users/${userId}/milestones`,
      );
      return response.json();
    },
    {
      enabled: !!userId,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const createMilestoneMutation = useMutation(createMilestone);
  const updateMilestoneMutation = useMutation(updateMilestone);
  const deleteMilestoneMutation = useMutation(deleteMilestone);

  useEffect(() => {
    if (displayed) dispatch(init(displayed));
  }, [displayed]);

  if (isError) {
    alert("error가 발생했습니다.");
  }

  const onClickModalHandler = (modalType: string, milestoneId: string) => () => {
    setIsShowModal(true);
    setModalType(modalType);
    dispatch(setMilestoneId(milestoneId));
  };

  return (
    <Layout>
      <ContentWrap>
        <Side>
          <MonthCalendar />
          <DailyEvent />
        </Side>
        {isLoading && <>loading...</>}

        {!isLoading && (
          <>
            <Milestone openModal={onClickModalHandler} />

            <div className="width-20">
              {allHourIds?.map((hourId) => {
                return (
                  <HourWrap key={hourId}>
                    <div className="hour">{dayjs(hourId).hour()}</div>
                    <MinuteWrap>
                      {Object.keys(byHourId[hourId])?.map((minuteId) => {
                        return (
                          <div key={minuteId} className={`${minuteId} flex-1`}>
                            {" "}
                          </div>
                        );
                      })}
                    </MinuteWrap>
                  </HourWrap>
                );
              })}
            </div>
          </>
        )}
      </ContentWrap>

      <CommonModal
        id="modal"
        isShowModal={isShowModal}
        onBackgroundClick={() => setIsShowModal(false)}
      >
        {modalType === "runningGoal" && <RunningTime />}
      </CommonModal>
    </Layout>
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

const ContentWrap = styled.div`
  width: 100%;
  display: flex;

  .width-20 {
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .border-right {
    border-right: 1px solid #e4e4e4;
  }
`;

export default HomePage;

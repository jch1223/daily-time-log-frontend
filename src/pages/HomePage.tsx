import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";

import { useAppDispatch, useAppSelector } from "../app/store";
import { createMilestone, deleteMilestone, updateMilestone } from "../utils/api/milestones";
import { setMilestoneData } from "../features/goals/goalsSlice";

import Layout from "../layout";
import Side from "../layout/Side";
import CommonModal from "../components/CommonModal";
import Milestone from "../features/milestones/Milestone";
import MonthCalendar from "../features/calendar/MonthCalendar";
import RunningTime from "../features/goals/RunningTime";
import TimeLog from "../features/timeLog/TimeLog";
import { Milestone as MilestoneType } from "../features/milestones/milestonesSlice";

function HomePage() {
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

  if (isError) {
    alert("error가 발생했습니다.");
  }

  const onClickModalHandler = (modalType: string, milestoneData: MilestoneType) => () => {
    setIsShowModal(true);
    setModalType(modalType);
    dispatch(setMilestoneData(milestoneData));
  };

  return (
    <Layout>
      <ContentWrap>
        <Side>
          <MonthCalendar />
        </Side>

        <Milestone openModal={onClickModalHandler} />
        <TimeLog />
      </ContentWrap>

      <CommonModal
        id="modal"
        isShowModal={isShowModal}
        onBackgroundClick={() => setIsShowModal(false)}
      >
        {modalType === "runningGoal" && <RunningTime onPauseClick={() => setIsShowModal(false)} />}
      </CommonModal>
    </Layout>
  );
}

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
`;

export default HomePage;

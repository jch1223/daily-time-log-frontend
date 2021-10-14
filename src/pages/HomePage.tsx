import React, { useEffect } from "react";
import styled from "styled-components";
import { MdAddCircle, MdPlayCircleFilled } from "react-icons/md";
import { useMutation, useQuery } from "react-query";

import { useAppSelector } from "../app/store";
import { createMilestone, deleteMilestone, updateMilestone } from "../utils/api/milestones";

import Layout from "../layout";
import Side from "../layout/Side";
import SideCalendar from "../features/calendar/SideCalendar";
import DailyEvent from "../features/calendar/DailyEvent";

function HomePage() {
  const userId = useAppSelector((state) => state.auth.userId);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

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
    alert("error!!");
  }

  return (
    <Layout>
      <Side>
        <SideCalendar />
        <DailyEvent />
      </Side>
      <ContentWrap>
        {isLoading && <>loading...</>}

        {!isLoading && (
          <>
            <div className="width-50 border-right">
              <div>
                <div>목표</div>
                <div>
                  <MdAddCircle
                    onClick={() => {
                      createMilestoneMutation.mutate({
                        userId,
                        done: false,
                        summary: "title",
                        googleAccessToken,
                      });
                    }}
                  />
                </div>
              </div>
              {data?.data.map((milestone: any) => {
                return (
                  <div>
                    <MdPlayCircleFilled />
                    {milestone.summary}
                  </div>
                );
              })}
            </div>
            <div className="width-50">2</div>
          </>
        )}
      </ContentWrap>
    </Layout>
  );
}

const ContentWrap = styled.div`
  width: 100%;
  display: flex;

  .width-50 {
    width: 50%;
  }
  .border-right {
    border-right: 1px solid #e4e4e4;
  }
`;

export default HomePage;

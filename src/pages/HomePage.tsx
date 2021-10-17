import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdAddCircle, MdPlayCircleFilled } from "react-icons/md";
import { useMutation, useQuery } from "react-query";

import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../app/store";
import { createMilestone, deleteMilestone, updateMilestone } from "../utils/api/milestones";

import Layout from "../layout";
import Side from "../layout/Side";
import SideCalendar from "../features/calendar/SideCalendar";
import DailyEvent from "../features/calendar/DailyEvent";
import { init } from "../features/timeLog/timeLogSlice";
import CommonModal from "../components/CommonModal";
import Milestone from "../features/milestones/Milestone";

function HomePage() {
  const displayed = useAppSelector((state) => state.calendar.displayed);
  const allHourIds = useAppSelector((state) => state.timeLog.allHourIds);
  const byHourId = useAppSelector((state) => state.timeLog.byHourId);
  const userId = useAppSelector((state) => state.auth.userId);
  const googleAccessToken = useAppSelector((state) => state.auth.googleAccessToken);

  const [milestoneDiv, setMilestoneDiv] = useState<string[]>([]);

  const [isShowModal, setIsShowModal] = useState(false);

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
            <Milestone />
            {/* <div className="width-50 border-right">
              <div>
                <div>목표</div>
                <div>
                  <MdAddCircle
                    onClick={() => {
                      // createMilestoneMutation.mutate({
                      //   userId,
                      //   done: false,
                      //   summary: "title",
                      //   googleAccessToken,
                      // });
                      console.log("adf");
                      setMilestoneDiv((state) => {
                        return [...state, "div"];
                      });
                    }}
                  />
                </div>
              </div>

              {milestoneDiv.map((item, index) => {
                return (
                  <div
                    contentEditable="true"
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      console.log(e.target.innerText);
                      const div = [...milestoneDiv];
                      div[index] = e.target.innerText;

                      setMilestoneDiv(div);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.currentTarget.blur();
                      }
                    }}
                  >
                    {item}
                  </div>
                );
              })}

              {data?.data.map((milestone: any) => {
                return (
                  <div>
                    <MdPlayCircleFilled />
                    {milestone.summary}
                    <button
                      type="button"
                      onClick={() => {
                        setIsShowModal(true);
                        // createMilestoneMutation.mutate({
                        //   userId,
                        //   done: false,
                        //   summary: "title",
                        //   googleAccessToken,
                        // });
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        createMilestoneMutation.mutate({
                          userId,
                          done: false,
                          summary: "title",
                          googleAccessToken,
                        });
                      }}
                    >
                      삭제
                    </button>
                  </div>
                );
              })}
            </div> */}

            <div className="width-50">
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
        id="complete-modal"
        isShowModal={isShowModal}
        onClick={() => setIsShowModal(false)}
      >
        modal
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

  .hour {
    width: 10%;
    border-right: 1px solid #e4e4e4;
    text-align: center;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;

  .width-50 {
    width: 50%;
    padding: 20px;
  }
  .border-right {
    border-right: 1px solid #e4e4e4;
  }
`;

export default HomePage;

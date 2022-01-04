import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { useAppSelector, useAppDispatch } from "../app/store";
import { changeMode } from "../features/setting/settingSlice";
import { addGoogleSchedules, ScheduleInfo } from "../features/schedules/schedulesSlice";
import { addSchedules } from "../features/calendar/calendarSlice";
import { loadMilestones } from "../features/milestones/milestonesSlice";
import { logIn } from "../utils/api/user";
import { getSchedules } from "../utils/api/schedules";

import Layout from "../layouts";
import Side from "../layouts/Side";
import Error from "../components/Error";
import MonthCalendar from "../features/calendar/MonthCalendar";
import Milestone from "../features/milestones/Milestone";
import TimeLog from "../features/timeLog/TimeLog";

function HomePage() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const { email, name, googleAccessToken } = useAppSelector((state) => state.auth);
  const { themeMode } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  const mileStones = JSON.parse(localStorage.getItem("milestones")) || [];

  const { data: userData, isError: isErrorForLogin } = useQuery(
    "user",
    () => logIn({ email, name, themeMode, mileStones }),
    {
      enabled: isLogIn,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  const { data: googleSchedulesData, isError: IsErrorForGoogleSchedules } = useQuery(
    "schedules",
    () => getSchedules(googleAccessToken),
    {
      enabled: !!googleAccessToken,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  useEffect(() => {
    if (userData) {
      dispatch(changeMode({ themeMode: userData.data.themeMode }));
      dispatch(loadMilestones(userData.data.mileStones));
    }
  }, [userData]);

  useEffect(() => {
    if (googleSchedulesData) {
      googleSchedulesData.items.sort((a: ScheduleInfo, b: ScheduleInfo) => {
        return new Date(a.start.date).getTime() - new Date(b.start.date).getTime();
      });

      dispatch(addGoogleSchedules(googleSchedulesData.items));
      dispatch(addSchedules(googleSchedulesData.items));
    }
  }, [googleSchedulesData]);

  if (isErrorForLogin && IsErrorForGoogleSchedules) {
    return <Error />;
  }

  return (
    <Layout>
      <Side>
        <MonthCalendar />
      </Side>

      <Milestone />
      <TimeLog />
    </Layout>
  );
}

export default HomePage;

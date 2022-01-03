import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { useAppSelector, useAppDispatch } from "../app/store";
import { changeMode } from "../features/setting/settingSlice";
import { logIn } from "../utils/api/user";

import Layout from "../layouts";
import Side from "../layouts/Side";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MonthCalendar from "../features/calendar/MonthCalendar";
import { getSchedules } from "../utils/api/schedules";
import { addGoogleSchedules, ScheduleInfo } from "../features/schedules/schedulesSlice";
import { addSchedules } from "../features/calendar/calendarSlice";

function HomePage() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const { email, name, googleAccessToken } = useAppSelector((state) => state.auth);
  const { themeMode } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  const {
    data: userData,
    isError: isErrorForLogin,
    isLoading: isLoadingForLogin,
  } = useQuery("user", () => logIn({ email, name, themeMode, mileStones: [] }), {
    enabled: isLogIn,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

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

  if (isLoadingForLogin) {
    return <Loading />;
  }

  return (
    <Layout>
      <Side>
        <MonthCalendar />
      </Side>
      content
    </Layout>
  );
}

export default HomePage;

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

function HomePage() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const { email, name } = useAppSelector((state) => state.auth);
  const { themeMode } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  const {
    isError,
    isLoading,
    data: userData,
  } = useQuery("user", () => logIn({ email, name, themeMode, mileStones: [] }), {
    enabled: isLogIn,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (userData) {
      dispatch(changeMode({ themeMode: userData.data.themeMode }));
    }
  }, [userData]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
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

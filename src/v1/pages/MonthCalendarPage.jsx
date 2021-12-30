import React from "react";
import styled from "styled-components";

import Layout from "../layout";
import Side from "../layout/Side";
import MonthCalendar from "../features/calendar/MonthCalendar";
import SideCalendar from "../features/calendar/SideCalendar";

function MonthCalendarPage() {
  return (
    <Layout>
      <Side>
        <div>
          <SideCalendar />
        </div>
      </Side>
      <ContentWrap>
        <MonthCalendar />
      </ContentWrap>
    </Layout>
  );
}

const ContentWrap = styled.div``;

export default MonthCalendarPage;

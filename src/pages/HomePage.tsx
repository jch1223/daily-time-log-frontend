import React from "react";
import styled from "styled-components";

import Layout from "../layout";
import Side from "../layout/Side";
import MonthCalendar from "../features/calendar/MonthCalendar";

function HomePage() {
  return (
    <Layout>
      <Side>
        <div>
          <MonthCalendar />
        </div>
      </Side>
      <ContentWrap>home page</ContentWrap>
    </Layout>
  );
}

const ContentWrap = styled.div``;

export default HomePage;

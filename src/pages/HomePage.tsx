import React from "react";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";

import Layout from "../layout";
import Side from "../layout/Side";
import SideCalendar from "../features/calendar/SideCalendar";
import DailyEvent from "../features/calendar/DailyEvent";

function HomePage() {
  return (
    <Layout>
      <Side>
        <SideCalendar />
        <DailyEvent />
      </Side>
      <ContentWrap>
        <div className="width-50 border-right">
          <div>
            <div>목표</div>
            <div>
              <MdAddCircle />
            </div>
          </div>
          <div />
        </div>
        <div className="width-50">2</div>
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

import React from "react";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "../../app/store";

function DailyEvent() {
  const displayedInfo = useAppSelector((state) => state.calendar.displayed);
  const dailyEvents = useAppSelector(
    (state) => state.calendar.byDateId[dayjs().set({ displayedInfo }).format("YYYY-MM-DD")],
  );

  return (
    <div>
      {dailyEvents?.events.map((event) => {
        return (
          <div key={event.id}>
            <div>title: {event.summary}</div>
            {event.description && <div>desc: {event.description}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default DailyEvent;

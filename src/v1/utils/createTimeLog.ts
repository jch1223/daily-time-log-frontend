import dayjs from "dayjs";

import { DateInfo } from "../features/calendar/calendarSlice";

const START_TIME = 6;

export const createTimeLog = (dateInfo: DateInfo) => {
  const { year } = dateInfo;
  const { month } = dateInfo;
  const { date } = dateInfo;
  const { timezone } = dateInfo;

  const allHourIds = [];
  const byHourId: { [hourId: string]: any } = {};

  for (let hour = START_TIME; hour < START_TIME + 24; hour++) {
    const hourId = dayjs().tz(timezone).set({ year, month, date, hour }).format("YYYY-MM-DDTHH");

    allHourIds.push(hourId);
    byHourId[hourId] = {};

    for (let minute = 0; minute < 60; minute++) {
      const minuteId = dayjs()
        .tz(timezone)
        .set({ year, month, date, hour, minute })
        .format("YYYY-MM-DDTHH:mm");

      byHourId[hourId][minuteId] = {};
    }
  }

  return { allHourIds, byHourId };
};

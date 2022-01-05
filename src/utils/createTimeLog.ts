import dayjs from "dayjs";

import { DateInfo } from "../features/calendar/calendarSlice";

const START_TIME = 6;

export const createTimeLog = () => {
  const allHourIds = [];
  const byHourId: { [hourId: string]: any } = {};

  for (let hour = START_TIME; hour < START_TIME + 24; hour++) {
    allHourIds.push(hour);
    byHourId[hour] = {};

    for (let minute = 0; minute < 60; minute++) {
      const minuteId = dayjs().set({ hour, minute }).format("HH:mm");

      byHourId[hour][minuteId] = {};
    }
  }

  return { allHourIds, byHourId };
};

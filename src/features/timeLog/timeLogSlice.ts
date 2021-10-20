import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { createTimeLog } from "../../utils/createTimeLog";
import { DateInfo } from "../calendar/calendarSlice";
import { Goal } from "../goals/goalsSlice";

export interface TimeLogState {
  allHourIds: string[];
  byHourId: ByHourId;
}

interface TimeLogInfoByMinuteId {
  color?: string;
  summary?: string;
}

export interface ByHourId {
  [hourId: string]: {
    [minuteId: string]: TimeLogInfoByMinuteId;
  };
}

interface InitTimelogData {
  date: DateInfo;
  goals: Goal[];
}

const initialState: TimeLogState = {
  allHourIds: [],
  byHourId: {},
};

const timeLogSlice = createSlice({
  name: "timeLog",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<InitTimelogData>) => {
      const { date, goals } = action.payload;
      const { allHourIds, byHourId } = createTimeLog(date);

      for (let i = 0; i < goals.length; i++) {
        const startInfo = goals[i].start;
        const endInfo = goals[i].end;
        const startMinute = dayjs(startInfo.dateTime).tz(startInfo.timezone);
        const endMinute = dayjs(endInfo.dateTime).tz(endInfo.timezone);
        const minuteDiff = endMinute.diff(startMinute.format("YYYY-MM-DDTHH:mm"), "minute");

        for (let j = 0; j < minuteDiff + 1; j++) {
          const hourId = startMinute
            .set({ minute: startMinute.minute() + j })
            .format("YYYY-MM-DDTHH");

          const minuteId = startMinute
            .set({ minute: startMinute.minute() + j })
            .format("YYYY-MM-DDTHH:mm");

          byHourId[hourId][minuteId] = {
            color: goals[i].color,
            summary: goals[i].summary,
          };

          console.log(byHourId[hourId]);
        }
      }

      state.allHourIds = allHourIds;
      state.byHourId = byHourId;
    },
  },
});

export const { init } = timeLogSlice.actions;

export default timeLogSlice.reducer;

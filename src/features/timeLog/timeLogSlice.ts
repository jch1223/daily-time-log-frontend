import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { createTimeLog } from "../../utils/createTimeLog";
import { DateInfo } from "../calendar/calendarSlice";

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
}

const initialState: TimeLogState = {
  allHourIds: [],
  byHourId: {},
};

const timeLogSlice = createSlice({
  name: "timeLog",
  initialState,
  reducers: {
    loadTimeLog: (state, action: PayloadAction<InitTimelogData>) => {
      const { date } = action.payload;
      const { allHourIds, byHourId } = createTimeLog(date);

      state.allHourIds = allHourIds;
      state.byHourId = byHourId;
    },
  },
});

export const { loadTimeLog } = timeLogSlice.actions;

export default timeLogSlice.reducer;

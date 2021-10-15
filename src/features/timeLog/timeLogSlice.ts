import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createTimeLog } from "../../utils/createTimeLog";
import { DateInfo } from "../calendar/calendarSlice";

export interface TimeLogState {
  allHourIds: string[];
  byHourId: ByHourId;
}

interface TimeLogInfoByMinuteId {
  color?: string;
  summary?: string;
  done?: boolean;
}

export interface ByHourId {
  [hourId: string]: {
    [minuteId: string]: TimeLogInfoByMinuteId;
  };
}

const initialState: TimeLogState = {
  allHourIds: [],
  byHourId: {},
};

const timeLogSlice = createSlice({
  name: "timeLog",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<DateInfo>) => {
      const { allHourIds, byHourId } = createTimeLog(action.payload);

      state.allHourIds = allHourIds;
      state.byHourId = byHourId;
    },
  },
});

export const { init } = timeLogSlice.actions;

export default timeLogSlice.reducer;

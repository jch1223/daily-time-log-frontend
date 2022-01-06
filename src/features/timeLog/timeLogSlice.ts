import { createSlice } from "@reduxjs/toolkit";

import { createTimeLog } from "../../utils/createTimeLog";

export interface TimeLogState {
  allHourIds: number[];
  byHourId: ByHourId;
}

interface TimeLogInfoByMinuteId {
  color?: string;
  summary?: string;
}

export interface ByHourId {
  [hourId: number]: {
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
    loadTimeLog: (state) => {
      const { allHourIds, byHourId } = createTimeLog();

      state.allHourIds = allHourIds;
      state.byHourId = byHourId;
    },
  },
});

export const { loadTimeLog } = timeLogSlice.actions;

export default timeLogSlice.reducer;

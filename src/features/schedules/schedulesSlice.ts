import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScheduleInfo {
  id: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: {
    email: string;
    self: true;
  };
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
}

interface SchedulesState {
  allSchedulesId: string[];
  byScheduleId: {
    [index: string]: ScheduleInfo;
  };
}

const initialState: SchedulesState = {
  allSchedulesId: [],
  byScheduleId: {},
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addGoogleSchedules: (state, action: PayloadAction<ScheduleInfo[]>) => {
      action.payload.forEach((item) => {
        state.allSchedulesId.push(item.id);
        state.byScheduleId[item.id] = item;
      });
    },
  },
});

export const { addGoogleSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;

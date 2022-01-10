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
  schedulesData: ScheduleInfo[];
}

const initialState: SchedulesState = {
  allSchedulesId: [],
  byScheduleId: {},
  schedulesData: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    initGoogleSchedules: (state) => {
      state.allSchedulesId = [];
      state.byScheduleId = {};
    },
    addGoogleSchedules: (state, action: PayloadAction<ScheduleInfo[]>) => {
      action.payload.forEach((item) => {
        state.allSchedulesId.push(item.id);
        state.byScheduleId[item.id] = item;
      });

      state.schedulesData = action.payload;
    },
  },
});

export const { initGoogleSchedules, addGoogleSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;

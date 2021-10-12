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
  data: ScheduleInfo[];
}

const initialState: SchedulesState = {
  data: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addGoogleSchedules: (state, action: PayloadAction<ScheduleInfo[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addGoogleSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;

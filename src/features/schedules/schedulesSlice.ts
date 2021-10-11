import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleInfo {
  id: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: {
    email: "ico1828@gmail.com";
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
  name: "calendar",
  initialState,
  reducers: {
    addGoogleSchedules: (state, action: PayloadAction<ScheduleInfo[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addGoogleSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;

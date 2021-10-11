import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { createCalendarData } from "../../utils/createCalendar";

export interface CalendarState {
  displayed: DateInfo;
  allDatesId?: string[];
  byDateId: {
    [dateId: string]: DateDetailInfo;
  };
}

export interface DateInfo {
  year?: number;
  month: number;
  date: number;
  timezone?: string;
}

interface DateDetailInfo extends DateInfo {
  id: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  events: [];
}

export interface ByDateId {
  [key: string]: DateDetailInfo;
}

const initialState: CalendarState = {
  allDatesId: [],
  byDateId: {},
  displayed: {
    year: 0,
    month: 0,
    date: 0,
  },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<DateInfo>) => {
      const { calendarAllDatesId, calendarByDateId } = createCalendarData(action.payload);

      state.displayed = action.payload;
      state.allDatesId = calendarAllDatesId;
      state.byDateId = calendarByDateId;
    },
  },
});

export const { init } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { createCalendarData } from "../../utils/createCalendar";

export interface CalendarState {
  displayed: DateInfo | null;
  allDatesId?: string[];
  byDateId: {
    [dateId: string]: DateDetailInfo;
  };
}

export interface DateInfo {
  year: number;
  month: number;
  date: number;
  timezone?: string;
}

export interface ByDateId {
  [key: string]: DateDetailInfo;
}

interface DateDetailInfo extends DateInfo {
  id: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  isSaturday: boolean;
}

const initialState: CalendarState = {
  allDatesId: [],
  byDateId: {},
  displayed: null,
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
    nextMonth: (state) => {
      state.displayed.month += 1;
      const { calendarAllDatesId, calendarByDateId } = createCalendarData(state.displayed);

      state.allDatesId = calendarAllDatesId;
      state.byDateId = calendarByDateId;
    },
    prevMonth: (state) => {
      state.displayed.month -= 1;
      const { calendarAllDatesId, calendarByDateId } = createCalendarData(state.displayed);

      state.allDatesId = calendarAllDatesId;
      state.byDateId = calendarByDateId;
    },
    setDisplayedDate: (state, action: PayloadAction<number>) => {
      state.displayed.date = action.payload;
    },
  },
});

export const { init, nextMonth, prevMonth, setDisplayedDate } = calendarSlice.actions;

export default calendarSlice.reducer;

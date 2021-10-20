import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { createCalendarData } from "../../utils/createCalendar";
import { ScheduleInfo } from "../schedules/schedulesSlice";

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

interface DateDetailInfo extends DateInfo {
  id: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  events: ScheduleInfo[];
}

export interface ByDateId {
  [key: string]: DateDetailInfo;
}

const initialState: CalendarState = {
  allDatesId: [],
  byDateId: {},
  displayed: null,
};

interface EventPayLoad {
  dateId: string;
  event: ScheduleInfo;
}

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
    addEvent: (state, action: PayloadAction<EventPayLoad>) => {
      const { dateId, event } = action.payload;

      if (state.byDateId[dateId]) {
        state.byDateId[dateId].events = [...state.byDateId[dateId].events, event];
      }
    },
  },
});

export const { init, addEvent } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;

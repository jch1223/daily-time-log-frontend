import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

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
    setEvent: (state, action: PayloadAction<ScheduleInfo[]>) => {
      const schedulesData = action.payload;

      for (let i = 0; i < schedulesData.length; i++) {
        if (schedulesData[i].start.date) {
          const startDate = dayjs(schedulesData[i].start.date);
          const endDate = dayjs(schedulesData[i].end.date);

          const dateDiff =
            endDate.diff(startDate.format("YYYY-MM-DD"), "date") / (1000 * 60 * 60 * 24);

          for (let j = 0; j < dateDiff; j++) {
            const dateId = startDate.set({ date: startDate.date() + j }).format("YYYY-MM-DD");
            const event = schedulesData[i];

            if (state.byDateId[dateId]) {
              state.byDateId[dateId].events = [...state.byDateId[dateId].events, event];
            }
          }
        }
      }
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

export const { init, setEvent, nextMonth, prevMonth, setDisplayedDate } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;

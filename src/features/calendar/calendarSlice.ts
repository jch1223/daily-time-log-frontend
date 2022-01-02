import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { createCalendarData } from "../../utils/createCalendar";
import { ScheduleInfo } from "../schedules/schedulesSlice";

export interface CalendarState {
  displayed: DateInfo | null;
  allDatesId?: string[];
  byDateId: ByDateId;
}

export interface DateInfo {
  year?: number;
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
  schedules: string[];
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
    setDisplayedDate: (state, action: PayloadAction<DateInfo>) => {
      state.displayed.date = action.payload.date;
      state.displayed.month = action.payload.month;
    },
    addEvents: (state, action: PayloadAction<ScheduleInfo[]>) => {
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
              state.byDateId[dateId].schedules = [...state.byDateId[dateId].schedules, event.id];
            }
          }
        }
      }
    },
  },
});

export const { init, nextMonth, prevMonth, setDisplayedDate, addEvents } = calendarSlice.actions;

export default calendarSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RunningTimeType {
  id?: string;
  milestoneId?: string;
  start?: {
    dateTime?: string;
    timezone?: string;
  };
  end?: {
    dateTime?: string;
    timezone?: string;
  };
}

interface RunningTimeState {
  allRunningTimesId: string[];
  byRunningTimesId: {
    [key: string]: RunningTimeType;
  };
}

const initialState: RunningTimeState = {
  allRunningTimesId: [],
  byRunningTimesId: {},
};

const runningTimesSlice = createSlice({
  name: "runningTimes",
  initialState,
  reducers: {
    loadRunningTimes: (state) => {
      // const goals = localStorage.getItem("goals");
      // if (!goals) {
      //   localStorage.setItem("goals", JSON.stringify({ ...state.byDateId }));
      //   return state;
      // }
      // const goalsData = JSON.parse(goals);
      // if (!goalsData[action.payload]) {
      //   goalsData[action.payload] = [];
      // }
      // localStorage.setItem("goals", JSON.stringify(goalsData));
      // state.byDateId = goalsData;
    },
    //   updateGoals: (state, action: PayloadAction<GoalInfo>) => {
    //     const { dateId, goal } = action.payload;

    //     let goals = localStorage.getItem("goals");

    //     if (!goals) {
    //       localStorage.setItem("goals", JSON.stringify({ ...state.byDateId }));
    //       goals = localStorage.getItem("goals");
    //     }

    //     const goalsData = JSON.parse(goals);

    //     if (!goalsData[dateId]) {
    //       goalsData[dateId] = [];
    //     }

    //     goalsData[dateId].push(goal);
    //     localStorage.setItem("goals", JSON.stringify(goalsData));

    //     state.byDateId = goalsData;
    //   },
  },
});

export const { loadRunningTimes } = runningTimesSlice.actions;

export default runningTimesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Milestone } from "../milestones/milestonesSlice";

export interface Goal {
  id?: string;
  milestoneId?: string;
  color: string;
  summary: string;
  start?: {
    dateTime?: string;
    timezone?: string;
  };
  end?: {
    dateTime?: string;
    timezone?: string;
  };
}

interface ByDateId {
  [dateId: string]: Goal[];
}

interface GoalInfo {
  dateId: string;
  goal: Goal;
}

const initialState: { runningMilestone: Milestone; byDateId: ByDateId } = {
  runningMilestone: null,
  byDateId: {},
};

const milestonesSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<string>) => {
      const goals = localStorage.getItem("goals");

      if (!goals) {
        localStorage.setItem("goals", JSON.stringify({ ...state.byDateId }));
        return state;
      }

      const goalsData = JSON.parse(goals);

      if (!goalsData[action.payload]) {
        goalsData[action.payload] = [];
      }

      localStorage.setItem("goals", JSON.stringify(goalsData));

      state.byDateId = goalsData;
    },
    setMilestoneData: (state, action: PayloadAction<Milestone>) => {
      state.runningMilestone = action.payload;
    },
    updateGoals: (state, action: PayloadAction<GoalInfo>) => {
      const { dateId, goal } = action.payload;

      let goals = localStorage.getItem("goals");

      if (!goals) {
        localStorage.setItem("goals", JSON.stringify({ ...state.byDateId }));
        goals = localStorage.getItem("goals");
      }

      const goalsData = JSON.parse(goals);

      if (!goalsData[dateId]) {
        goalsData[dateId] = [];
      }

      goalsData[dateId].push(goal);
      localStorage.setItem("goals", JSON.stringify(goalsData));

      state.byDateId = goalsData;
    },
  },
});

export const { setMilestoneData, updateGoals, init } = milestonesSlice.actions;

export default milestonesSlice.reducer;

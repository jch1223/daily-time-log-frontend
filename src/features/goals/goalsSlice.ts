import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

interface Goal {
  id?: string;
  milestoneId?: string;
  start?: {
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    dateTime?: string;
    timeZone?: string;
  };
}

const initialState: { runningMilestoneId: string; goals: Goal[] } = {
  runningMilestoneId: null,
  goals: [],
};

const milestonesSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setMilestoneId: (state, action: PayloadAction<string>) => {
      state.runningMilestoneId = action.payload;
    },
    updateGoals: (state, action: PayloadAction<Goal>) => {
      let goals = localStorage.getItem("goals");

      if (!goals) {
        localStorage.setItem("goals", JSON.stringify([...state.goals]));
        goals = localStorage.getItem("goals");
      }

      const goalsData = JSON.parse(goals);
      goalsData.push(action.payload);

      localStorage.setItem("goals", JSON.stringify(goalsData));

      state.goals = goalsData;
    },
  },
});

export const { setMilestoneId, updateGoals } = milestonesSlice.actions;

export default milestonesSlice.reducer;

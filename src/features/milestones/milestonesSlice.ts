import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

interface Milestone {
  id: string;
  summary: string;
}

const initialState: Milestone[] = [];

const milestonesSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {
    init: (state) => {
      const milestones = localStorage.getItem("milestones");

      if (!milestones) {
        localStorage.setItem("milestones", JSON.stringify(state));
        return state;
      }

      return JSON.parse(milestones);
    },
    createMilestone: (state) => {
      state.push({ id: uuid(), summary: "" });
    },
    deleteMilestone: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { init, createMilestone, deleteMilestone } = milestonesSlice.actions;

export default milestonesSlice.reducer;

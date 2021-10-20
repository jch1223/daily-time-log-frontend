import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import getRandomColor from "../../utils/getRandomColor";

export interface Milestone {
  id: string;
  summary: string;
  color?: string;
  isDeleted?: boolean;
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
      const milestones = localStorage.getItem("milestones");
      const color = getRandomColor();

      if (!milestones) {
        localStorage.setItem("milestones", JSON.stringify(state));
        return state;
      }

      const milestonesData = JSON.parse(milestones);
      const newMilestone = { id: uuid(), summary: "", isDeleted: false, color };

      milestonesData.push(newMilestone);

      localStorage.setItem("milestones", JSON.stringify(milestonesData));
      return milestonesData;
    },
    updateMilestone: (state, action: PayloadAction<Milestone>) => {
      const milestones = localStorage.getItem("milestones");

      if (!milestones) {
        localStorage.setItem("milestones", JSON.stringify(state));
        return state;
      }

      const milestonesData = JSON.parse(milestones);

      const newMilestonesData = milestonesData
        .map((item: Milestone) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }

          return item;
        })
        .filter((item: Milestone) => item.summary);

      localStorage.setItem("milestones", JSON.stringify(newMilestonesData));
      return newMilestonesData;
    },
    deleteMilestone: (state, action: PayloadAction<string>) => {
      const milestones = localStorage.getItem("milestones");

      if (!milestones) {
        localStorage.setItem("milestones", JSON.stringify(state));
        return state;
      }

      const milestonesData = JSON.parse(milestones);
      const newMilestonesData = milestonesData
        .map((item: Milestone) => {
          if (item.id === action.payload) {
            item.isDeleted = true;
          }

          return item;
        })
        .filter((item: Milestone) => item.summary);

      localStorage.setItem("milestones", JSON.stringify(newMilestonesData));
      return newMilestonesData;
    },
  },
});

export const { init, createMilestone, updateMilestone, deleteMilestone } = milestonesSlice.actions;

export default milestonesSlice.reducer;

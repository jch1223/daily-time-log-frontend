import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MilestoneType {
  id: string;
  summary: string;
  color?: string;
  isDeleted?: boolean;
  runningTimes?: string[];
}

export interface MilestoneState {
  allMilestonesId: string[];
  byMilestonesId: {
    [key: string]: MilestoneType;
  };
}

const initialState: MilestoneState = {
  allMilestonesId: [],
  byMilestonesId: {},
};

const milestonesSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {
    loadMilestones: (state, action: PayloadAction<MilestoneType[]>) => {
      const milestonesData = action.payload;

      milestonesData.forEach((milestone) => {
        state.allMilestonesId.push(milestone.id);
        state.byMilestonesId[milestone.id] = milestone;
      });
    },
    addMilestone: (state, action: PayloadAction<MilestoneType>) => {
      const milestoneData = action.payload;

      state.allMilestonesId.push(milestoneData.id);
      state.byMilestonesId[milestoneData.id] = milestoneData;
    },
    updateMilestone: (state, action: PayloadAction<MilestoneType>) => {
      const milestoneData = action.payload;

      state.byMilestonesId[milestoneData.id].summary = milestoneData.summary;
    },
    removeMilestone: (state, action: PayloadAction<string>) => {
      state.byMilestonesId[action.payload].isDeleted = true;
    },
  },
});

export const { loadMilestones, addMilestone, updateMilestone, removeMilestone } =
  milestonesSlice.actions;

export default milestonesSlice.reducer;

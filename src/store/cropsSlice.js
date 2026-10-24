import { createSlice, createSelector } from '@reduxjs/toolkit';
const cropsSlice = createSlice({
    name: 'crops',
    initialState: [],
    reducers: {
        addCrop: (state, action) => {
            state.push({id: Date.now(), ...action.payload});
        },
        removeCrop: (state, action) => {
            return state.filter(crop => crop.id !== action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});
export const { addCrop, removeCrop, updateCrop } = cropsSlice.actions;
export default cropsSlice.reducer;
export const selectCrops = (state) => state.crops;

export const healthLabel = (s) =>
  s === undefined || s === null || s === '' ? 'No data'
  : s >= 70 ? 'Healthy' : s >= 40 ? 'Needs Attention' : 'Critical';

export const selectCuttingSchedule = createSelector([selectCrops], (crops) => {
  const today = new Date().setHours(0, 0, 0, 0);
  return crops
    .filter((c) => c.cuttingDate)
    .map((c) => ({
      ...c,
      daysRemaining: Math.ceil((new Date(c.cuttingDate) - today) / 86400000),
    }))
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
});

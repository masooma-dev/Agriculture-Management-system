import { createSlice } from '@reduxjs/toolkit'

const harvestsSlice = createSlice({
  name: 'harvests',
  initialState: [],
  reducers: {
    addHarvest: (state, action) => {
      state.push({ id: Date.now(), ...action.payload })
    },
    removeHarvest: (state, action) =>
      state.filter((h) => h.id !== action.payload),
  },
})

export const { addHarvest, removeHarvest } = harvestsSlice.actions
export default harvestsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const farmsSlice = createSlice({
  name: 'farms',
  initialState: [],
  reducers: {
    addFarm: (state, action) => {
      state.push({ id: Date.now(), ...action.payload })
    },
    removeFarm: (state, action) =>
      state.filter((f) => f.id !== action.payload),
    updateFarm: (state, action) => {
      const i = state.findIndex((f) => f.id === action.payload.id)
      if (i !== -1) state[i] = { ...state[i], ...action.payload }
    },
  },
})

export const { addFarm, removeFarm, updateFarm } = farmsSlice.actions
export default farmsSlice.reducer
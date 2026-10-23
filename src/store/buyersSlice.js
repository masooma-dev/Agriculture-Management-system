import { createSlice } from '@reduxjs/toolkit'

const buyersSlice = createSlice({
  name: 'buyers',
  initialState: [],
  reducers: {
    addBuyer: (state, action) => {
      state.push({ id: Date.now(), ...action.payload })
    },
    removeBuyer: (state, action) =>
      state.filter((b) => b.id !== action.payload),
  },
})

export const { addBuyer, removeBuyer } = buyersSlice.actions
export default buyersSlice.reducer
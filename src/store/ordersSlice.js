import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push({ id: Date.now(), ...action.payload })
    },
    removeOrder: (state, action) =>
      state.filter((o) => o.id !== action.payload),
  },
})

export const { addOrder, removeOrder } = ordersSlice.actions
export default ordersSlice.reducer
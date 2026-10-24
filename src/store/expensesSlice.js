import { createSlice } from '@reduxjs/toolkit';

const load = () => {
  try { return JSON.parse(localStorage.getItem('agri_expenses')) || []; } catch { return []; }
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: load(),
  reducers: {
    addExpense: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    removeExpense: (state, action) => state.filter((e) => e.id !== action.payload),
  },
});

export const { addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
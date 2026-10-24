import { createSlice, nanoid } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    add: {
      reducer: (s, a) => { s.push(a.payload); },
      prepare: (d) => ({ payload: { id: nanoid(), cropId: d.cropId,
        category: d.category, amount: Number(d.amount), date: d.date, note: d.note || "" } }),
    },
    update: (s, a) => {
      const i = s.findIndex((e) => e.id === a.payload.id);
      if (i !== -1) s[i] = { ...s[i], ...a.payload };
    },
    remove: (s, a) => s.filter((e) => e.id !== a.payload),
  },
});
export const expenseActions = expensesSlice.actions;
export default expensesSlice.reducer;
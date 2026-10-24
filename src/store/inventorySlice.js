import { createSlice, nanoid } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: [],
  reducers: {
    add: {
      reducer: (s, a) => { s.push(a.payload); },
      prepare: (d) => ({ payload: { id: nanoid(), item: d.item, type: d.type,
        qty: Number(d.qty), minQty: Number(d.minQty), unit: d.unit || "kg", history: [] } }),
    },
    update: (s, a) => {
      const i = s.findIndex((x) => x.id === a.payload.id);
      if (i !== -1) s[i] = { ...s[i], ...a.payload };
    },
    use: (s, a) => {
      const it = s.find((x) => x.id === a.payload.id);
      if (it) {
        it.qty = Math.max(0, it.qty - Number(a.payload.amount));
        it.history.push({ amount: Number(a.payload.amount), date: new Date().toISOString() });
      }
    },
    remove: (s, a) => s.filter((x) => x.id !== a.payload),
  },
});
export const inventoryActions = inventorySlice.actions;
export default inventorySlice.reducer;
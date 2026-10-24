import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    add: {
      reducer: (s, a) => { s.push(a.payload); },
      prepare: (d) => ({ payload: { id: nanoid(), title: d.title, type: d.type,
        cropId: d.cropId || "", dueDate: d.dueDate, status: "Pending" } }),
    },
    update: (s, a) => {
      const i = s.findIndex((t) => t.id === a.payload.id);
      if (i !== -1) s[i] = { ...s[i], ...a.payload };
    },
    remove: (s, a) => s.filter((t) => t.id !== a.payload),
  },
});
export const taskActions = tasksSlice.actions;
export default tasksSlice.reducer;
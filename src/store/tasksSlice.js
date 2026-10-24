import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), status: 'Pending', ...action.payload });
    },
    setTaskStatus: (state, action) => {
      const t = state.find((x) => x.id === action.payload.id);
      if (t) t.status = action.payload.status;
    },
    removeTask: (state, action) =>
      state.filter((x) => x.id !== action.payload),
  },
});

export const { addTask, setTaskStatus, removeTask } = slice.actions;
export default slice.reducer;
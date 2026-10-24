import { createSlice, nanoid } from "@reduxjs/toolkit";

const activitySlice = createSlice({
  name: "activity",
  initialState: [],
  reducers: {
    log: {
      reducer: (s, a) => { s.unshift(a.payload); if (s.length > 200) s.pop(); },
      prepare: (d) => ({ payload: { id: nanoid(), user: d.user || "system",
        action: d.action, entity: d.entity, timestamp: new Date().toISOString() } }),
    },
    clear: () => [],
  },
});
export const activityActions = activitySlice.actions;
export default activitySlice.reducer;
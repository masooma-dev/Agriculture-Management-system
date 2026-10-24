import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: "light", toast: null, sidebarOpen: true },
  reducers: {
    toggleTheme: (s) => { s.theme = s.theme === "light" ? "dark" : "light"; },
    showToast: (s, a) => { s.toast = a.payload; }, // {type:"success", message:"Saved"}
    hideToast: (s) => { s.toast = null; },
    toggleSidebar: (s) => { s.sidebarOpen = !s.sidebarOpen; },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
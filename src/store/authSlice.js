import { createSlice } from '@reduxjs/toolkit';

export const USERS = [
  { id: 1, username: 'manager', password: 'manager123', name: 'Manager', role: 'manager' },
  { id: 2, username: 'admin', password: 'admin123', name: 'Admin', role: 'admin' },
];

const saved = localStorage.getItem('agri_user');
const savedUser = saved ? JSON.parse(saved) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    isAuthenticated: !!savedUser,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('agri_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('agri_user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
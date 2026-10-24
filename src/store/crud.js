import { createSlice, nanoid } from '@reduxjs/toolkit';
export const load = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
export const makeCrud = (name, key) => createSlice({
  name, initialState: load(key),
  reducers: {
    add: { reducer: (s, a) => { s.push(a.payload); }, prepare: (d) => ({ payload: { id: nanoid(), ...d } }) },
    update: (s, a) => s.map(x => x.id === a.payload.id ? { ...x, ...a.payload } : x),
    remove: (s, a) => s.filter(x => x.id !== a.payload),
  },
});
import { createSlice } from '@reduxjs/toolkit';

const WeatherSlice = createSlice({
  name: 'weather',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setWeather } = WeatherSlice.actions;
export default WeatherSlice.reducer;
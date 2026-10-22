import {createSlice} from '@reduxjs/toolkit';
const cropsSlice = createSlice({
    name: 'crops',
    initialState: [],
    reducers: {
        addCrop: (state, action) => {
            state.push({id: Date.now(), ...action.payload});
        },
        removeCrop: (state, action) => {
            return state.filter(crop => crop.id !== action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});
export const { addCrop, removeCrop, updateCrop } = cropsSlice.actions;
export default cropsSlice.reducer;

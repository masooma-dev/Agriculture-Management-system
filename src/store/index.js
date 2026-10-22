import { configureStore } from '@reduxjs/toolkit'
import cropReducer from './cropsSlice'
import { persistMiddleware } from './persistMiddleware'

let savedCrops = []
try {
  const raw = localStorage.getItem('agri_crops')
  savedCrops = raw ? JSON.parse(raw) : []
} catch (e) {
  savedCrops = []
}

export const store = configureStore({
  reducer: { crops: cropReducer },
  preloadedState: { crops: savedCrops },
  middleware: (getDefault) => getDefault().concat(persistMiddleware),
  devTools: true,
})
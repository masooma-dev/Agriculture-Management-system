import buyersReducer from './buyersSlice'
import { configureStore } from '@reduxjs/toolkit'
import cropReducer from './cropsSlice'
import farmsReducer from './farmsSlice'
import harvestsReducer from './harvestsSlice'
import ordersReducer from './ordersSlice'
import { persistMiddleware } from './persistMiddleware'


function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || []}
    catch {
      return []
    }
    }
  

export const store = configureStore({
  reducer: {
    crops: cropReducer,
    farms: farmsReducer,
    harvests: harvestsReducer,
    orders: ordersReducer,
    buyers: buyersReducer,
  },
 preloadedState: {
    crops: load('agri_crops'),
    farms: load('agri_farms'),
    harvests: load('agri_harvests'),
    orders: load('agri_orders'),
    buyers: load('agri_buyers'),
  },
  
})
store.subscribe(() => {
  try {
    localStorage.setItem('agri_buyers', JSON.stringify(store.getState().buyers))
  } catch {
    // storage full, ignore
  }
})

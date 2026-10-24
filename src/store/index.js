import { configureStore } from '@reduxjs/toolkit';
import cropReducer from './cropsSlice';
import farmsReducer from './farmsSlice';
import harvestsReducer from './harvestsSlice';
import ordersReducer from './ordersSlice';
import buyersReducer from './buyersSlice';
import weather from './WeatherSlice';
import tasks from './tasksSlice';
import expenses from './expensesSlice';
import inventory from './inventorySlice';
import auth from './authSlice';
import activity from './activitySlice';
import ui from './uiSlice';
import { load } from './crud';
import { persistMiddleware, activityLogger } from './middleware';

export const store = configureStore({
  reducer: { crops: cropReducer, farms: farmsReducer, harvests: harvestsReducer, orders: ordersReducer, buyers: buyersReducer,
    weather, tasks, expenses, inventory, auth, activity, ui },
  preloadedState: { crops: load('agri_crops'), farms: load('agri_farms'), harvests: load('agri_harvests'),
    orders: load('agri_orders'), buyers: load('agri_buyers') },
  middleware: (gdm) => gdm({ serializableCheck: false }).concat(activityLogger, persistMiddleware),
  devTools: true,
});
import { createSelector } from '@reduxjs/toolkit'

export const getStatus = (score) =>
  score >= 70 ? 'Healthy' : score >= 40 ? 'Needs Attention' : 'Critical'

export const daysLeft = (date) =>
  Math.ceil((new Date(date) - new Date().setHours(0, 0, 0, 0)) / 86400000)

const selectCrops = (state) => state.crops || []
const selectOrders = (state) => state.orders || []

export const selectDueCrops = createSelector([selectCrops], (crops) =>
  crops
    .filter((c) => c.cuttingDate && daysLeft(c.cuttingDate) <= 3)
    .sort((a, b) => new Date(a.cuttingDate) - new Date(b.cuttingDate))
)

export const selectHarvestStats = createSelector(
  [selectCrops, selectOrders],
  (crops, orders) => {
    const harvested = crops.reduce((s, c) => s + (Number(c.harvestQty) || 0), 0)
    const ordered = orders.reduce((s, o) => s + (Number(o.quantity) || 0), 0)
    const sold = orders
      .filter((o) => o.status === 'Delivered')
      .reduce((s, o) => s + (Number(o.quantity) || 0), 0)
    return {
      harvested,
      ordered,
      sold,
      remaining: harvested - sold,
      pending: orders.filter((o) => o.status === 'Pending').length,
      delivered: orders.filter((o) => o.status === 'Delivered').length,
    }
  }
)
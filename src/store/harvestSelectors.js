import { createSelector } from '@reduxjs/toolkit';

const list = (x) => (Array.isArray(x) ? x : []);
const num = (v) => Number(v) || 0;

export const selectHarvestStats = createSelector(
  [(s) => s.harvests, (s) => s.orders, (s) => s.buyers],
  (harvests, orders, buyers) => {
    const harvested = list(harvests).reduce((t, h) => t + num(h.quantity ?? h.qty), 0);
    const sold = list(buyers).reduce((t, b) => t + num(b.quantity), 0);
    const o = list(orders);
    return {
      harvested,
      sold,
      remaining: harvested - sold,
      ordered: o.length,
      pending: o.filter((x) => x.status === 'Pending').length,
      delivered: o.filter((x) => x.status === 'Delivered').length,
      soldPercent: harvested ? Math.round((sold / harvested) * 100) : 0,
    };
  }
);
import { createSelector } from '@reduxjs/toolkit';

const num = (v) => Number(v) || 0;

export const selectProfitByCrop = createSelector([(s) => s.expenses], (expenses) => {
  const map = {};
  (Array.isArray(expenses) ? expenses : []).forEach((e) => {
    const key = e.cropName || 'General';
    if (!map[key]) map[key] = { crop: key, expense: 0, revenue: 0 };
    if (e.type === 'Revenue') map[key].revenue += num(e.amount);
    else map[key].expense += num(e.amount);
  });
  return Object.values(map).map((r) => ({ ...r, net: r.revenue - r.expense }));
});

export const selectTotals = createSelector([selectProfitByCrop], (rows) => {
  const expense = rows.reduce((t, r) => t + r.expense, 0);
  const revenue = rows.reduce((t, r) => t + r.revenue, 0);
  return { expense, revenue, net: revenue - expense };
});
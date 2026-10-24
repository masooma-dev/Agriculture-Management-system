import { createSelector } from '@reduxjs/toolkit';

export const selectAlerts = createSelector(
  [(s) => s.crops, (s) => s.tasks, (s) => s.inventory, (s) => s.weather],
  (crops, tasks, inventory, weather) => {
    const alerts = [];
    const today = new Date().setHours(0, 0, 0, 0);
    const list = (x) => (Array.isArray(x) ? x : []);

    list(crops).forEach((c) => {
      if (c.cuttingDate) {
        const d = Math.ceil((new Date(c.cuttingDate) - today) / 86400000);
        if (d < 0) alerts.push(`${c.name}: cutting overdue`);
        else if (d <= 3) alerts.push(`${c.name}: cutting in ${d} day(s)`);
      }
      if (c.healthScore !== undefined && c.healthScore !== '' && Number(c.healthScore) < 40)
        alerts.push(`${c.name}: critical health`);
    });
    list(tasks).forEach((t) => {
      if (t.status !== 'Done' && t.dueDate && new Date(t.dueDate) < today)
        alerts.push(`Task overdue: ${t.title}`);
    });
    list(inventory).forEach((i) => {
      if (Number(i.qty) < Number(i.minQty)) alerts.push(`Low stock: ${i.item}`);
    });
    const h = weather?.data?.humidity ?? weather?.humidity;
    if (h > 60) alerts.push(`High humidity: ${h}%`);
    return alerts;
  }
);
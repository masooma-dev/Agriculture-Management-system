import  log  from './activitySlice';
const KEYS = { crops: 'agri_crops', farms: 'agri_farms', harvests: 'agri_harvests', orders: 'agri_orders', buyers: 'agri_buyers',
  tasks: 'agri_tasks', expenses: 'agri_expenses', inventory: 'agri_inventory', activity: 'agri_activity' };
export const persistMiddleware = (s) => (next) => (a) => {
  const r = next(a);
  if (/^(weather|ui)\//.test(a.type)) return r;
  const st = s.getState();
  Object.entries(KEYS).forEach(([k, key]) => { try { localStorage.setItem(key, JSON.stringify(st[k])); } catch { /* quota */ } });
  return r;
};
export const activityLogger = (s) => (next) => (a) => {
  const r = next(a);
  const m = /^(\w+)\/(add|update|remove)$/.exec(a.type);
  if (m && m[1] !== 'activity') s.dispatch(log({ user: s.getState().auth.user || 'system', action: m[2], entity: m[1] }));
  return r;
};
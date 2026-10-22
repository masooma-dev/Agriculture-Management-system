export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  try {
    localStorage.setItem('agri_crops', JSON.stringify(store.getState().crops))
  } catch (e) {
    console.warn('Could not save crops', e)
  }
  return result
}
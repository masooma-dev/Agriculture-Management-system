export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  try {
    const { crops, farms } = store.getState()
    localStorage.setItem('agri_crops', JSON.stringify(crops))
    localStorage.setItem('agri_farms', JSON.stringify(farms))
  } catch (e) {
    console.warn('Could not save data', e)
  }
  return result
}
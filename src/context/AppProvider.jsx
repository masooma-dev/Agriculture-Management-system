import { AppContext } from '../hooks/useWeather'
import useLocalStorage from '../hooks/useLocalStorage.JS'
import {seedCrops, seedOrders, seedBuyers} from '../data/seedData'

export default function AppProvider({ children }) {
  const [crops, setCrops] = useLocalStorage('agri_crops', seedCrops)
  const [orders, setOrders] = useLocalStorage('agri_orders', seedOrders)
  const [buyers, setBuyers] = useLocalStorage('agri_buyers', seedBuyers)

  return (
    <AppContext.Provider value={{ crops, setCrops, orders, setOrders, buyers, setBuyers }}>
      {children}
    </AppContext.Provider>
  )
}

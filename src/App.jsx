import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import { useSelector } from 'react-redux'
import CropForm from './components/CropForm'
import CropList from './components/CropList'
import FarmForm from './components/FarmForm'
import FarmList from './components/FarmList'
import HarvestForm from './store/HarvestForm'
import HarvestList from './store/HarvestList'
import OrderForm from './components/OrderForm'
import OrderList from './components/OrderList'
import BuyerForm from './components/BuyerForm'
import BuyerList from './components/BuyerList'

function App() {
  const crops = useSelector((state) => state.crops) || []
  const farms = useSelector((state) => state.farms) || []
  const harvests = useSelector((state) => state.harvests) || []
  const orders = useSelector((state) => state.orders) || []

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <header>
        <div className="header-info">
          <h1>AGRICULTURE MANAGEMENT SYSTEM</h1>
          <p>Manage your farms, crops, harvests and orders in one place</p>
          <p className="date">{today}</p>
                  </div>
      </header>

      <main>
        <section className="dashboard">
          <h2>Dashboard</h2>
<div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <div className="card" style={{ flex: 1, padding: '16px' }}>
              Farms
              <h3>{farms.length}</h3>
            </div>
            <div className="card" style={{ flex: 1, padding: '16px' }}>
              Crops
              <h3>{crops.length}</h3>
            </div>
            <div className="card" style={{ flex: 1, padding: '16px' }}>
              Harvests
              <h3>{harvests.length}</h3>
            </div>
            <div className="card" style={{ flex: 1, padding: '16px' }}>
              Orders
              <h3>{orders.length}</h3>
            </div>
          </div>

          <h3>Farms</h3>
          <FarmForm />
          <FarmList />

          <h3>Crops</h3>
          <CropForm />
          <CropList />

          <h3>Harvests</h3>
          <HarvestForm />
          <HarvestList />

          <h3>Orders</h3>
          <OrderForm />
          <OrderList />
          <h3>Buyers</h3>
          <BuyerForm/>
          <BuyerList/>
        </section>
      </main>
    </>
  )
}

export default App
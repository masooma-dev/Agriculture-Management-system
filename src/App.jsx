import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addCrop } from './store/cropsSlice'

function App() {
  const crops = useSelector((state) => state.crops)
  const dispatch = useDispatch()

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

        <div className="top-meta">
          <div className="notifications">
            <span>notifications</span>
            <span>3</span>
          </div>

          <div className="alerts">
            <span>alerts</span>
            <span>2</span>
          </div>

          <div className="profile">
            <span>Admin</span>
          </div>
        </div>
      </header>

      <main>
        <section className="dashboard">
          <h2>Dashboard</h2>
          <p>Manage your farms, crops, harvests and orders in one place</p>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <div className="card" style={{ flex: 1, padding: '16px' }}>Farms</div>
            <div className="card" style={{ flex: 1, padding: '16px' }}>Crops</div>
            <div className="card" style={{ flex: 1, padding: '16px' }}>Harvests</div>
            <div className="card" style={{ flex: 1, padding: '16px' }}>Orders</div>
          </div>

          <button onClick={() => dispatch(addCrop({ name: 'Wheat' }))}>
            Add Crop
          </button>
          <p>Crops in store: {crops.length}</p>
        </section>
      </main>
    </>
  )
}

export default App

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { ToastContainer } from './components/UI/ToastContainer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <AppRoutes />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App

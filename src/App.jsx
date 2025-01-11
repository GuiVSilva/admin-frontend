import { Route, Routes } from 'react-router-dom'

import OverviewPage from './pages/dashboard/OverviewPage'

import Sidebar from './components/Sidebar'
import RegisterProducts from './pages/products/RegisterProducts'

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/*BG*/}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
      <div className="flex flex-col w-full h-full overflow-auto">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          style={{ zIndex: 99999 }}
          toastClassName={({ type }) => {
            const baseStyle =
              ' flex flex-items items-center w-full h-20 text-white rounded-lg py-2 px-4'
            if (type === 'success') {
              return `${baseStyle} bg-green-700`
            }
            if (type === 'error') {
              return `${baseStyle} bg-red-800`
            }
            if (type === 'info') {
              return `${baseStyle} bg-blue-700`
            }
            if (type === 'warning') {
              return `${baseStyle} bg-yellow-600`
            }
          }}
        />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route
            path="/products/register-products"
            element={<RegisterProducts />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App

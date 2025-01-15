import Header from '../../components/Header'
import { motion } from 'framer-motion'
import StatCard from '../../components/StatCard'
import { ReceiptText, ShoppingBag, User, Zap } from 'lucide-react'
import SalesOverviewChart from '../../components/charts/SalesOverviewChart'
import BestSellingProductsChart from '../../components/charts/BestSellingProductsChart'
import OrdersCharts from '../../components/charts/OrdersCharts'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from '@material-tailwind/react'

const OverviewPage = () => {
  const { isLoaded, userId } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        navigate('/')
      } else {
        setLoading(false)
      }
    }
  }, [isLoaded, userId, navigate])

  return (
    <div className="flex-1 overflow-auto relative z-10">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-800">
          <Spinner className="h-12 w-12 text-gray-500" color="blue" />
        </div>
      ) : (
        <>
          <Header title="Dashboard" />
          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            {/* STATS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total de Vendas"
                icons={Zap}
                value="R$ 1.000,00"
                color="#6366F1"
              />
              <StatCard
                name="Total de Clientes"
                icons={User}
                value="100"
                color="#8b5cf6"
              />
              <StatCard
                name="Total de Pedidos"
                icons={ShoppingBag}
                value="567"
                color="#ec4899"
              />
              <StatCard
                name="Contas a receber"
                icons={ReceiptText}
                value="5"
                color="#a32e38"
              />
            </motion.div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SalesOverviewChart />
              <BestSellingProductsChart />
              <OrdersCharts />
            </div>
          </main>
        </>
      )}
    </div>
  )
}

export default OverviewPage

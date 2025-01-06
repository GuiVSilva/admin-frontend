import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts'

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']

const SALES_CHANNEL_DATA = [
  { name: 'Jul', value: 4200 },
  { name: 'Aug', value: 3800 },
  { name: 'Sep', value: 5100 },
  { name: 'Oct', value: 4600 },
  { name: 'Nov', value: 5400 },
  { name: 'Dec', value: 7200 },
  { name: 'Jan', value: 6100 },
  { name: 'Feb', value: 5900 },
  { name: 'Mar', value: 6800 },
  { name: 'Apr', value: 6300 },
  { name: 'May', value: 7100 },
  { name: 'Jun', value: 7500 }
]

const OrdersCharts = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Pedidos </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={SALES_CHANNEL_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563'
              }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend />
            <Bar dataKey={'value'} name="2025" fill="#8884d8">
              {SALES_CHANNEL_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
export default OrdersCharts

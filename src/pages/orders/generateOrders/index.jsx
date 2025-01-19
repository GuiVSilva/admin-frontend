import { Header, StatCard, Button } from '@/components'
import { motion } from 'framer-motion'
import {
  BookCheck,
  CheckCircle,
  CircleX,
  Clock,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2
} from 'lucide-react'
import theme from '../../../themes/global'
import Table from '../../../components/Table'
import { useState } from 'react'
import Pagination from '../../../components/Pagination'

const columns = [
  { label: 'Número', key: 'number' },
  { label: 'Vendedor', key: 'customer' },
  { label: 'Cliente', key: 'client' },
  { label: 'Valor', key: 'total' },
  { label: 'Status', key: 'status' },
  { label: 'Data', key: 'date' },
  { label: 'Ações', key: 'actions' }
]

const data = [
  {
    number: '1',
    customer: 'Vendendor 1',
    client: 'Cliente 1',
    total: 'R$ 235,40',
    status: 'Aprovado',
    date: '19/01/2025'
  },
  {
    number: '2',
    customer: 'Vendendor 2',
    client: 'Cliente 2',
    total: 'R$ 1000,00',
    status: 'Pendente',
    date: '19/01/2025'
  },
  {
    number: '3',
    customer: 'Vendendor 3',
    client: 'Cliente 3',
    total: 'R$ 550,25',
    status: 'Cancelado',
    date: '19/01/2025'
  }
]

export const GenerateOrders = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const filteredData = data?.filter(
    item =>
      item?.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.status?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Gerar Pedidos" />

        <main className="max-w-7xl mx-auto py-20 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total de pedidos"
              icons={BookCheck}
              value="10"
              color="#6366f1"
            />
            <StatCard
              name="Pedidos Pendentes"
              icons={Clock}
              value="2"
              color="#f59e06"
            />
            <StatCard
              name="Pedidos Aprovados"
              icons={CheckCircle}
              value="4"
              color="#10B981"
            />

            <StatCard
              name="Pedidos Cancelados"
              icons={CircleX}
              value="4"
              color="#ef4444"
            />
          </motion.div>
          <div className="flex justify-between items-center mb-4">
            <Button type="button" className={theme.button.success} size="lg">
              <Plus size={18} className="mr-2" />
              Adicionar Pedido
            </Button>

            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <Table name="Pedidos Gerados" headers={columns}>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full ${
                        item.status === 'Aprovado'
                          ? 'bg-green-600 text-white'
                          : item.status === 'Pendente'
                          ? 'bg-yellow-600 text-white'
                          : item.status === 'Cancelado'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="text-gray-400 hover:text-gray-500  mr-2">
                      <Eye size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300 mr-2">
                      <Trash2 size={18} />
                    </button>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-4"
                >
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </Table>
          <Pagination
            filteredData={filteredData}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </main>
      </div>
    </>
  )
}

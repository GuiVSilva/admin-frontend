import Header from '../../components/Header'
import { motion } from 'framer-motion'
import StatCard from '../../components/StatCard'
import {
  AlertTriangle,
  DollarSign,
  Edit,
  Package,
  Plus,
  Scale,
  Search,
  Trash2
} from 'lucide-react'
import Table from '../../components/Table'
import { useState } from 'react'
import Pagination from '../../components/Pagination'
import { DialogAddProducts } from './Dialog/DialogAddProducts'

const headers = [
  { label: 'Nome do Produto', key: 'name' },
  { label: 'Categoria', key: 'category' },
  { label: 'Preço', key: 'price' },
  { label: 'Estoque', key: 'stock' },
  { label: 'Vendas', key: 'sales' },
  { label: 'Ações', key: 'actions' }
]

const data = [
  {
    id: 1,
    name: 'Produto A',
    category: 'Categoria 1',
    price: 10.99,
    stock: 100,
    sales: 50
  },
  {
    id: 2,
    name: 'Produto B',
    category: 'Categoria 2',
    price: 20.99,
    stock: 150,
    sales: 80
  },
  {
    id: 3,
    name: 'Produto C',
    category: 'Categoria 3',
    price: 30.99,
    stock: 200,
    sales: 90
  },
  {
    id: 4,
    name: 'Produto D',
    category: 'Categoria 4',
    price: 40.99,
    stock: 300,
    sales: 100
  }
  // ... mais dados
]

const RegisterProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false)
  const itemsPerPage = 3
  const filteredData = data.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }
  return (
    <>
      <DialogAddProducts handleCloseDialog={handleCloseDialog} open={open} />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Cadastro de Produtos" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Vendidos no dia"
              icons={Package}
              value="10"
              color="#6366f1"
            />
            <StatCard
              name="Baixo estoque"
              icons={AlertTriangle}
              value="30"
              color="#f59e0b"
            />
            <StatCard
              name="Saldo em estoque"
              icons={Scale}
              value="200"
              color="#a0a3a1"
            />
            <StatCard
              name="Receita Total"
              icons={DollarSign}
              value="R$ 2000.00"
              color="#10B981"
            />
          </motion.div>
          <div className="flex justify-between items-center mb-4">
            {/* Botão Cadastrar */}
            <button
              className="flex items-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
              onClick={handleOpenDialog}
            >
              <Plus size={18} className="mr-2" />
              Cadastrar Produto
            </button>

            {/* Campo de Pesquisa */}
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
          <Table name="Cadastro de Produtos" headers={headers}>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
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

export default RegisterProducts

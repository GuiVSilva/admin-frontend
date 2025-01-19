// import Table from "../../../components/Table";
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Package,
  Scale,
  LayoutPanelTop,
  Plus,
  ArrowRightLeft,
  Search,
  Eye
} from 'lucide-react'
import theme from '../../../themes/global'
import DialogMovimentation from './Dialogs/DialogMovimentation'
import { useState } from 'react'
import DialogRegisterMinStock from './Dialogs/DialogRegisterMinStock'
import { Pagination, Table, Header, StatCard, Button } from '@/components'

const headers = [
  { label: 'Descrição', key: 'description' },
  { label: 'Quantidade', key: 'quantity' },
  { label: 'Visualizar', key: 'view' }
]

const data = [
  {
    id: 1,
    name: 'Local A',
    quantity: 10
  },
  {
    id: 2,
    name: 'Local B',
    quantity: 10
  },
  {
    id: 3,
    name: 'Local C',
    quantity: 10
  },
  {
    id: 4,
    name: 'Local D',
    quantity: 10
  }
]

const MovimentationStock = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDialogMovimentation, setOpenDialogMovimentation] = useState(false)
  const [openDialogMinStock, setOpenDialogMinStock] = useState(false)

  const itemsPerPage = 3
  const filteredData = data?.filter(item =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleOpenDialogMovimentation = () => {
    setOpenDialogMovimentation(true)
  }

  const handleCloseDialogMovimentation = () => {
    setOpenDialogMovimentation(false)
  }

  const handleOpenDialogMinStock = () => {
    setOpenDialogMinStock(true)
  }

  const handleCloseDialogMinStock = () => {
    setOpenDialogMinStock(false)
  }

  return (
    <>
      <DialogRegisterMinStock
        open={openDialogMinStock}
        onClose={handleCloseDialogMinStock}
      />
      <DialogMovimentation
        open={openDialogMovimentation}
        onClose={handleCloseDialogMovimentation}
      />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Movimentação de Estoque" />

        <main className="max-w-7xl mx-auto py-20 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total em estoque"
              icons={Package}
              value="10.000"
              color="#6366f1"
            />
            <StatCard
              name="Produto mais movimentado"
              icons={AlertTriangle}
              value="TELA"
              color="#f59e0b"
            />
            <StatCard
              name="Abaixo do nível mínimo"
              icons={Scale}
              value="15"
              color="#a0a3a1"
            />

            <StatCard
              name="Local mais movimentado"
              icons={LayoutPanelTop}
              value="Expedição"
              color="#06b6d4"
            />
          </motion.div>

          <div className="flex justify-between">
            <div className="flex gap-6 items-center mb-4">
              <Button
                type="button"
                className={theme.button.success}
                size="lg"
                onClick={() => handleOpenDialogMovimentation()}
              >
                <ArrowRightLeft size={18} className="mr-2" />
                Movimentar Estoque
              </Button>

              <Button
                onClick={handleOpenDialogMinStock}
                type="button"
                className={theme.button.gray}
                size="lg"
              >
                <Plus size={18} className="mr-2" />
                Mínimo Estoque
              </Button>
            </div>
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

          <Table name="Locais" headers={headers}>
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
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                      // onClick={() => handleOpenDialogEdit(item)}
                    >
                      <Eye size={18} />
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
export default MovimentationStock

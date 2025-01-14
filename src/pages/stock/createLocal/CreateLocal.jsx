// import React from "react";

import { useState } from 'react'
import Header from '../../../components/Header'
// import StatCard from "../../../components/StatCard";
import Table from '../../../components/Table'
import { motion } from 'framer-motion'
import {
  // AlertTriangle,
  // DollarSign,
  Edit,
  // Package,
  Plus,
  // Scale,
  Search,
  Trash2
} from 'lucide-react'
import Pagination from '../../../components/Pagination'
import { DialogCreateLocal } from './Dialog/DialogCreateLocal'

const headers = [
  { label: 'Descrição', key: 'description' },
  { label: 'Ações', key: 'actions' }
]

const data = [
  {
    id: 1,
    name: 'Local A'
  },
  {
    id: 2,
    name: 'Local B'
  },
  {
    id: 3,
    name: 'Local C'
  },
  {
    id: 4,
    name: 'Local D'
  }
]

const CreateLocal = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDialogRegister, setOpenDialogRegister] = useState(false)

  const itemsPerPage = 3
  const filteredData = data?.filter(
    item =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleOpenDialogRegister = () => {
    setOpenDialogRegister(true)
  }

  const handleCloseDialogRegister = () => {
    setOpenDialogRegister(false)
  }

  return (
    <>
      <DialogCreateLocal
        open={openDialogRegister}
        onClose={handleCloseDialogRegister}
      />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Cadastro de Locais" />

        <main className="max-w-7xl mx-auto py-20 px-4 lg:px-8">
          {/* <motion.div
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
          </motion.div> */}

          <div className="flex justify-between items-center mb-4">
            {/* Botão Cadastrar */}
            <button
              className="flex items-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
              onClick={handleOpenDialogRegister}
            >
              <Plus size={18} className="mr-2" />
              Cadastrar Local
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

          <Table name="Cadastro de Locais" headers={headers}>
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
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                      // onClick={() => handleOpenDialogEdit(item)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      // onClick={() => handleOpenDialogDelete(item)}
                    >
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
export default CreateLocal

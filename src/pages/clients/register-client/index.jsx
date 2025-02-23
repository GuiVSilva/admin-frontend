import Header from '../../../components/Header'
import { motion } from 'framer-motion'
import StatCard from '../../../components/StatCard'
import { Edit, Plus, Search, Trash2, UserCheck, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import Table from '../../../components/Table'
import Pagination from '../../../components/Pagination'
import { DialogRegisterClient } from './Dialog/DialogRegisterClient'
import { DialogEditClient } from './Dialog/DialogEditClient'
import { DialogDeleteClient } from './Dialog/DialogDeleteClient'
import { clientsService } from '../../../services/clients'

const headers = [
  { label: 'Nome', key: 'name' },
  { label: 'CPF/CNPJ', key: 'cpf_cnpj' },
  { label: 'Celular', key: 'cellPhone' },
  { label: 'Ações', key: 'actions' }
]

const RegisterClients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDialogRegister, setOpenRegister] = useState(false)
  const [openDialogEdit, setOpenDialogEdit] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [line, setLine] = useState([])
  const [clients, setClients] = useState([])

  const itemsPerPage = 3

  const handleClients = async () => {
    try {
      const response = await clientsService.findClients()
      console.log('response', response)
      setClients(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleClients()
  }, [])

  const filteredData = clients?.filter(
    item =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.cnpf_cnpj?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleOpenDialogRegister = () => {
    setOpenRegister(true)
  }

  const handleCloseDialogRegister = () => {
    setOpenRegister(false)
    handleClients()
  }

  const handleOpenDialogEdit = item => {
    setOpenDialogEdit(true)
    setLine(item)
  }

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false)
    handleClients()
  }

  const handleOpenDialogDelete = item => {
    setOpenDialogDelete(true)
    setLine(item)
  }

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false)
    handleClients()
  }

  return (
    <>
      <DialogDeleteClient
        handleCloseDialogDelete={handleCloseDialogDelete}
        openDialogDelete={openDialogDelete}
        line={line}
      />
      <DialogEditClient
        handleCloseDialogEdit={handleCloseDialogEdit}
        openDialogEdit={openDialogEdit}
        line={line}
      />
      <DialogRegisterClient
        handleCloseDialogRegister={handleCloseDialogRegister}
        openDialogRegister={openDialogRegister}
      />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Cadastro de Clientes" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total de Clientes"
              icons={Users}
              value="10"
              color="#6366f1"
            />
            <StatCard
              name="Clientes Ativos"
              icons={UserCheck}
              value="10"
              color="#f59e0b"
            />
          </motion.div>
          <div className="flex justify-between items-center mb-4">
            {/* Botão Cadastrar */}
            <button
              className="flex items-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
              onClick={handleOpenDialogRegister}
            >
              <Plus size={18} className="mr-2" />
              Cadastrar Cliente
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
                    {item.cnpf_cnpj}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.cellPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                      onClick={() => handleOpenDialogEdit(item)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleOpenDialogDelete(item)}
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
export default RegisterClients

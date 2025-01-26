import { useState } from 'react'
import { Dialog, Select, Input, Button } from '@/components'
import { Field, Form, Formik } from 'formik'
import Table from '../../../../components/Table'
import { motion } from 'framer-motion'
import { ArrowRight, CirclePlus, Trash2 } from 'lucide-react'
import theme from '../../../../themes/global'
import { toast } from 'react-toastify'
import { DialogClientOrder } from './DialogClientOrder'

const columns = [
  { label: 'Produto', key: 'name_product' },
  { label: 'Quantidade', key: 'qtd_product' }
]

const options = [
  { label: 'Produto A', value: 0 },
  { label: 'Produto B', value: 1 }
]

export const DialogRegisterOrder = ({
  openDialogRegister,
  handleCloseDialogRegister
}) => {
  const [tableRows, setTableRows] = useState([
    { id: 1, product: '', quantity: '' }
  ])
  const [openDialog, setOpenDialog] = useState(false)

  const handleAddRow = () => {
    setTableRows(prevRows => [
      ...prevRows,
      { id: prevRows.length + 1, product: '', quantity: '' }
    ])
  }

  const handleDeleteRow = id => {
    if (tableRows.length === 1) {
      toast.error('Tem que existir pelo menos 1 item!')
      return
    }
    setTableRows(prevRows => prevRows.filter(row => row.id !== id))
  }

  const handleProductChange = (id, value) => {
    setTableRows(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, product: value } : row))
    )
  }

  const handleQuantityChange = (id, value) => {
    setTableRows(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, quantity: value } : row))
    )
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
    handleCloseDialogRegister()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setTableRows([{ id: 1, product: '', quantity: '' }])
  }

  return (
    <>
      <DialogClientOrder
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        tableRows={tableRows}
      />
      <Dialog
        size="lg"
        open={openDialogRegister}
        onClose={() =>
          handleCloseDialogRegister(
            setTableRows([{ id: 1, product: '', quantity: '' }])
          )
        }
      >
        <Dialog.Title>Criar Pedido</Dialog.Title>
        <Formik initialValues={{}}>
          <Form>
            <Dialog.Content>
              <div
                className={`${
                  tableRows.length > 6 ? 'max-h-80 overflow-y-auto' : ''
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'transparent transparent',
                  padding: '20px'
                }}
              >
                <Table name="Produtos do pedido" headers={columns}>
                  {tableRows.map(row => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <Select
                          name={`rows[${row.id}].product`}
                          label="Produto"
                          options={options}
                          size="lg"
                          onChange={e =>
                            handleProductChange(row.id, e.target.value)
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <Field
                          name={`rows[${row.id}].quantity`}
                          placeholder="Quantidade"
                          type="number"
                          as={Input}
                          size="md"
                          onChange={e =>
                            handleQuantityChange(row.id, e.target.value)
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          type="button"
                          className="text-green-500 hover:text-green-600 mr-2"
                          onClick={handleAddRow}
                        >
                          <CirclePlus size={18} />
                        </button>
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-300 mr-2"
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </Table>
              </div>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                type="button"
                className={theme.button.error}
                onClick={() =>
                  handleCloseDialogRegister(
                    setTableRows([{ id: 1, product: '', quantity: '' }])
                  )
                }
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={theme.button.blue}
                onClick={handleOpenDialog}
              >
                Prosseguir
                <ArrowRight className="ml-3" size={18} />
              </Button>
            </Dialog.Actions>
          </Form>
        </Formik>
      </Dialog>
    </>
  )
}

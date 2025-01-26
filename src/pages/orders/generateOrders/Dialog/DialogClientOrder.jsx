import { Dialog, Button } from '@/components'
import { ErrorMessage, Form, Formik } from 'formik'
import CustomAutocomplete from '../../../../components/CustomAutocomplete'
import { Typography } from '@material-tailwind/react'
import { useState } from 'react'
import theme from '../../../../themes/global'
import { toast } from 'react-toastify'

const options = [
  { label: 'Cliente 1', value: '1' },
  { label: 'Cliente 2', value: '2' },
  { label: 'Cliente 3', value: '3' },
  { label: 'Cliente 4', value: '4' },
  { label: 'Cliente 5', value: '5' },
  { label: 'Cliente 6', value: '6' }
]

export const DialogClientOrder = ({
  openDialog,
  handleCloseDialog,
  tableRows
}) => {
  const [isLoading, setIsLoading] = useState(false)
  if (!openDialog) {
    return null
  }
  console.log('aqui chego assim', tableRows)

  const handleSubmit = async values => {
    setIsLoading(true)
    console.log('values', values.select_clients.label)
    console.log('values', values.select_clients.value)
    toast.info('Processando, aguarde um momento!')
    await new Promise(resolve => setTimeout(resolve, 1000))
    const isSuccess = true
    if (isSuccess) {
      toast.success('Pedido adicionado com sucesso!')
      setIsLoading(false)
      handleCloseDialog()
    } else {
      toast.error('Falha ao adicionar pedido!')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog size="md" open={openDialog} onClose={handleCloseDialog}>
        <Dialog.Title>Finalização do Pedido</Dialog.Title>
        <Formik initialValues={{ select_clients: '' }} onSubmit={handleSubmit}>
          <Form>
            <Typography
              variant="small"
              className="mb-2 text-left font-medium text-gray-400"
            >
              Nome do Cliente
            </Typography>
            <Dialog.Content>
              <CustomAutocomplete
                name="select_clients"
                options={options}
                label="Selecione um cliente"
                placeholder="Digite o nome do cliente"
                loading={isLoading}
                size="lg"
              />
              <ErrorMessage
                name="select_clients"
                component="div"
                className="text-red-500 text-sm"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                type="submit"
                className={theme.button.success}
                loading={isLoading}
              >
                Salvar
              </Button>
              <Button
                type="button"
                className={theme.button.gray}
                onClick={handleCloseDialog}
                loading={isLoading}
              >
                Cancelar
              </Button>
            </Dialog.Actions>
          </Form>
        </Formik>
      </Dialog>
    </>
  )
}

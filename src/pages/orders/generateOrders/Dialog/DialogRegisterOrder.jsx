import { Dialog, Button } from '@/components'
import { ErrorMessage, Form, Formik } from 'formik'
import CustomAutocomplete from '../../../../components/CustomAutocomplete'
import { Typography } from '@material-tailwind/react'
import { useState } from 'react'
import theme from '../../../../themes/global'
import { toast } from 'react-toastify'

export const DialogRegisterOrder = ({
  openDialogRegister,
  handleCloseDialogRegister
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const options = [
    { label: 'Cliente 1', value: '1' },
    { label: 'Cliente 2', value: '2' },
    { label: 'Cliente 3', value: '3' },
    { label: 'Cliente 4', value: '4' },
    { label: 'Cliente 5', value: '5' },
    { label: 'Cliente 6', value: '6' }
  ]

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
      handleCloseDialogRegister()
    } else {
      toast.error('Falha ao adicionar pedido!')
      setIsLoading(false)
    }
  }
  return (
    <>
      <Dialog
        size="sm"
        open={openDialogRegister}
        onClose={handleCloseDialogRegister}
      >
        <Dialog.Title>Criar Pedido</Dialog.Title>
        <Formik initialValues={{ select_clients: '' }} onSubmit={handleSubmit}>
          <Form>
            <Dialog.Content>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium text-gray-400"
                >
                  Nome do Cliente
                </Typography>
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
              </div>
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
                onClick={handleCloseDialogRegister}
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

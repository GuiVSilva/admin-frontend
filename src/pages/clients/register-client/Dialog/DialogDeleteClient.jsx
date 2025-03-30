import { Form, Formik } from 'formik'
import { Button, Dialog } from '@/components'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Typography } from '@material-tailwind/react'
import theme from '../../../../themes/global'
import { clientsService } from '../../../../services/clients'

export const DialogDeleteClient = ({
  openDialogDelete,
  handleCloseDialogDelete,
  line
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    console.log('line.id', line.id)
    try {
      await clientsService.deleteClient({ id: line.id })
      toast.success('Cliente excluido com sucesso!')
      setIsLoading(false)
      handleCloseDialogDelete()
    } catch (error) {
      toast.error(
        error.response.data.message || 'Ocorreu um erro ao cadastrar Cliente'
      )
      setIsLoading(false)
    }
  }

  return (
    <Dialog size="sm" open={openDialogDelete} onClose={handleCloseDialogDelete}>
      <Dialog.Title>Excluir Cliente</Dialog.Title>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-10 text-center pt-10">
            <Typography variant="h5" className="text-gray-300">
              Tem certeza que deseja excluir o Cliente?
            </Typography>
          </div>

          <Dialog.Actions>
            <Button
              type="submit"
              className={theme.button.error}
              loading={isLoading}
            >
              Excluir
            </Button>
            <Button
              type="button"
              className={theme.button.gray}
              onClick={handleCloseDialogDelete}
              loading={isLoading}
            >
              Cancelar
            </Button>
          </Dialog.Actions>
        </Form>
      </Formik>
    </Dialog>
  )
}

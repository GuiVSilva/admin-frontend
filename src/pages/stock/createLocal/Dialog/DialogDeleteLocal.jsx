import { Form, Formik } from 'formik'
import { Typography } from '@material-tailwind/react'
import { Button, Dialog } from '@/components'
import { useState } from 'react'
import { stockService } from '../../../../services/stock'
import { toast } from 'react-toastify'

export const DialogDeleteLocal = ({
  openDialogDelete,
  handleCloseDialogDelete,
  line
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await stockService.deleteLocation({ id: line?.id })
      setIsLoading(false)
      toast.success('Local excluído com sucesso')
      handleCloseDialogDelete()
    } catch (error) {
      setIsLoading(false)
      toast.error(
        error.response.data.message || 'Ocorreu um erro ao excluir Local'
      )
      console.error(error)
    }
  }
  return (
    <>
      <Dialog
        size="sm"
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
      >
        <Dialog.Title>Excluir Local</Dialog.Title>
        <Dialog.Content>
          <Formik initialValues={[]} onSubmit={handleSubmit}>
            <Form>
              <div className="mb-10 text-center pt-10">
                <Typography variant="h5" className="text-gray-300">
                  Tem certeza que deseja excluir o local?
                </Typography>
              </div>

              <Dialog.Actions>
                <Button
                  type="submit"
                  className="bg-red-800 text-white hover:bg-red-900 px-6"
                  loading={isLoading}
                >
                  Excluir
                </Button>
                <Button
                  type="button"
                  className="bg-gray-600 text-white hover:bg-gray-700 px-6"
                  onClick={handleCloseDialogDelete}
                  loading={isLoading}
                >
                  Cancelar
                </Button>
              </Dialog.Actions>
            </Form>
          </Formik>
        </Dialog.Content>
      </Dialog>
    </>
  )
}

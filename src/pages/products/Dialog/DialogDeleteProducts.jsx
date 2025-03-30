import { Form, Formik } from 'formik'
import { Button, Dialog } from '@/components'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Typography } from '@material-tailwind/react'
import theme from '../../../themes/global'
import { productsService } from '../../../services/products'

export const DialogDeleteProducts = ({
  openDialogDelete,
  handleCloseDialogDelete,
  line
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await productsService.deleteProduct({
        id: line.id
      })
      toast.success('Produto excluído com sucesso')
      setIsLoading(false)
      handleCloseDialogDelete()
    } catch (error) {
      console.log(error)
      toast.error(
        error.response.data.message || 'Ocorreu um erro ao excluir Produto'
      )
      setIsLoading(false)
    }
  }

  return (
    <Dialog size="sm" open={openDialogDelete} onClose={handleCloseDialogDelete}>
      <Dialog.Title>Excluir Produto</Dialog.Title>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-10 text-center pt-10">
            <Typography variant="h5" className="text-gray-300">
              Tem certeza que deseja excluir o produto?
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

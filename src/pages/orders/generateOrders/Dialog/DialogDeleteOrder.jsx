import { Button, Dialog } from '@/components'
import { Typography } from '@material-tailwind/react'
import { Form, Formik } from 'formik'
import theme from '../../../../themes/global'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const DialogDeleteOrder = ({
  openDialogDelete,
  handleCloseDialogDelete,
  line
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    toast.info('Processando, aguarde um momento!')
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('id do pedido', line.id)
    const isSuccess = true

    if (isSuccess) {
      toast.success('Pedido excluido com sucesso!')
      setIsLoading(false)
      handleCloseDialogDelete()
    } else {
      toast.error('Falha ao excluir pedido!')
      setIsLoading(false)
    }
  }
  return (
    <>
      <Dialog
        size="sm"
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
      >
        <Dialog.Title>Excluir Pedido</Dialog.Title>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-10 text-center pt-10">
              <Typography variant="h5" className="text-gray-300">
                Tem certeza que deseja excluir o pedido?
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
    </>
  )
}

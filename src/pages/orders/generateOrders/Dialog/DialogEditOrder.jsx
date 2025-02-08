import { Dialog } from '@/components'

export const DialogEditOrder = ({
  openDialogEdit,
  handleCloseDialogEdit,
  line
}) => {
  console.log('line', line)
  return (
    <>
      <Dialog size="lg" open={openDialogEdit} onClose={handleCloseDialogEdit}>
        <Dialog.Title>Editar Pedido</Dialog.Title>
      </Dialog>
    </>
  )
}

import { Dialog } from '@/components'

export const DialogClientOrder = ({
  openDialog,
  handleCloseDialog,
  tableRows
}) => {
  if (!openDialog) {
    return null
  }
  console.log('aqui chego assim', tableRows)
  return (
    <>
      <Dialog size="md" open={openDialog} onClose={handleCloseDialog}>
        <Dialog.Title>Finalização do Pedido</Dialog.Title>
      </Dialog>
    </>
  )
}

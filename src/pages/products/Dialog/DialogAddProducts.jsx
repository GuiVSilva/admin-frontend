import {
  IconButton,
  Typography,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter
} from '@material-tailwind/react'
import { X } from 'lucide-react'
import { Input } from '../../../components/Input '
// import { Select } from '../../../components/Select'
import { TextArea } from '../../../components/TextArea'
import { Button } from '../../../components/Button'

export const DialogAddProducts = ({ open, handleCloseDialog }) => {
  return (
    <Dialog
      size="sm"
      open={open}
      className="p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg"
    >
      <DialogHeader className="relative m-0 block border-b border-gray-700 pb-2">
        <Typography variant="h4" className="text-gray-100">
          Cadastrar Produto
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
          onClick={handleCloseDialog}
        >
          <X className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6">
        <div>
          <Typography
            variant="small"
            className="mb-2 text-left font-medium text-gray-400"
          >
            Nome
          </Typography>
          <Input id="name" name="name" placeholder="Digite o nome" />
        </div>
        <div>
          <Typography
            variant="small"
            className="mb-2 text-left font-medium text-gray-400"
          >
            Marca
          </Typography>
          <input
            type="text"
            id="mark"
            name="mark"
            placeholder="Digite uma marca"
            className="mt-1 block w-full px-3 py-2 border border-transparent rounded-md shadow-sm focus:outline-none bg-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400"
          />
        </div>
        {/* <div>
          <Typography
            variant="small"
            className="mb-2 text-left font-medium text-gray-400"
          >
            Categoria
          </Typography>
          <Select
            id="category"
            name="category"
            options={[
              { value: 'clothing', label: 'Roupas' },
              { value: 'electronics', label: 'Eletrônicos' },
              { value: 'appliances', label: 'Eletrodomésticos' },
              { value: 'others', label: 'Outros' }
            ]}
          />
        </div> */}
        <div>
          <Typography
            variant="small"
            className="mb-2 text-left font-medium text-gray-400"
          >
            Descrição (Opcional)
          </Typography>
          <TextArea
            placeholder="Digite uma descrição para o produto"
            rows={4}
          />
        </div>
      </DialogBody>
      <DialogFooter className="border-t border-gray-700 pt-4">
        <Button
          className="bg-green-700 text-white hover:bg-green-800"
          onClick={handleCloseDialog}
        >
          Salvar
        </Button>
        <Button
          className="ml-4 bg-gray-600 text-white hover:bg-gray-700"
          onClick={handleCloseDialog}
        >
          Cancelar
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

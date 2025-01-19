import {
  Dialog as TailwindDialog,
  IconButton,
  Typography
} from '@material-tailwind/react'
import { X } from 'lucide-react'

// Componente principal
const Dialog = ({ open, onClose, size = 'sm', children }) => {
  return (
    <TailwindDialog
      open={open}
      size={size}
      className="p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg"
    >
      <div className="relative">
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
          onClick={onClose}
        >
          <X className="h-10 w-4 stroke-2 mb-5" />
        </IconButton>
        {children}
      </div>
    </TailwindDialog>
  )
}

// Subcomponente para o título
Dialog.Title = ({ children }) => (
  <div className="mb-4 border-b border-gray-700 pb-2">
    <Typography variant="h4" className="text-gray-100">
      {children}
    </Typography>
  </div>
)
Dialog.Title.displayName = 'Dialog.Title'

// Subcomponente para o conteúdo
Dialog.Content = ({ children }) => (
  <div className="space-y-4 pb-6">{children}</div>
)
Dialog.Content.displayName = 'Dialog.Content'

// Subcomponente para as ações
Dialog.Actions = ({ children }) => (
  <div className="flex justify-center space-x-4 border-t border-gray-700 pt-4">
    {children}
  </div>
)
Dialog.Actions.displayName = 'Dialog.Actions'

// Definir o displayName do componente principal
Dialog.displayName = 'Dialog'

export default Dialog

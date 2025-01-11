// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   IconButton,
//   Typography
// } from '@material-tailwind/react'
// import { X } from 'lucide-react'

// export const DialogCustom = ({
//   open,
//   handleCloseDialog,
//   children,
//   title,
//   size = 'sm'
// }) => {
//   if (!open) return null

//   return (
//     <Dialog
//       open={open}
//       size={size}
//       className="p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg"
//     >
//       {/* Header */}
//       <DialogHeader className="relative m-0 block border-b border-gray-700 pb-2">
//         <Typography variant="h4" className="text-gray-100">
//           {title}
//         </Typography>
//         <IconButton
//           size="sm"
//           variant="text"
//           className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
//           onClick={handleCloseDialog}
//         >
//           <X className="h-4 w-4 stroke-2" />
//         </IconButton>
//       </DialogHeader>

//       {/* Body */}
//       <DialogBody className="space-y-4 pb-6">{children}</DialogBody>

//       {/* Footer */}
//       <DialogFooter className="border-t border-gray-700 pt-4"></DialogFooter>
//     </Dialog>
//   )
// }

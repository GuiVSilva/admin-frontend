import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography
} from '@material-tailwind/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { X } from 'lucide-react'
import { Input } from '../../../../components/Input'
import { useState } from 'react'
import { Button } from '../../../../components/Button'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  cnpf_cnpj: Yup.string().required('A CPF/CNPJ é obrigatório'),
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
  cellPhone: Yup.string().required('O número de telefone é obrigatório')
})

export const DialogRegisterClient = ({
  openDialogRegister,
  handleCloseDialogRegister
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async values => {
    console.log('values', values)
    toast.info('Processando, aguarde um momento!')
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const isSuccess = true

    if (isSuccess) {
      toast.success('Cliente cadastrado com sucesso!')
      setIsLoading(false)
      handleCloseDialogRegister()
    } else {
      toast.error('Falha ao cadastrar cliente!')
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      size="sm"
      open={openDialogRegister}
      className="p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg"
    >
      <DialogHeader className="relative m-0 block border-b border-gray-700 pb-2">
        <Typography variant="h4" className="text-gray-100">
          Dados do Cliente
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
          onClick={handleCloseDialogRegister}
        >
          <X className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <Formik
        initialValues={{ name: '', cnpf_cnpj: '', email: '', cellPhone: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <DialogBody className="space-y-4 pb-6">
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium text-gray-400"
              >
                Nome
              </Typography>
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Digite o nome"
                loading={isLoading}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium text-gray-400"
              >
                CPF/CNPJ
              </Typography>
              <Field
                as={Input}
                id="cnpf_cnpj"
                name="cnpf_cnpj"
                placeholder="Digite o CNPJ ou CNPj"
                loading={isLoading}
                mask="cpf_cnpj"
              />
              <ErrorMessage
                name="cnpf_cnpj"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium text-gray-400"
                >
                  Email
                </Typography>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  placeholder="Digite email"
                  loading={isLoading}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium text-gray-400"
                >
                  Celular
                </Typography>
                <Field
                  as={Input}
                  id="cellPhone"
                  name="cellPhone"
                  placeholder="Digite o número"
                  loading={isLoading}
                  mask="phone"
                />
                <ErrorMessage
                  name="cellPhone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="border-t border-gray-700 pt-4">
            <Button
              type="submit"
              className="bg-green-700 text-white hover:bg-green-800"
              loading={isLoading}
            >
              Salvar
            </Button>
            <Button
              type="button"
              className="ml-4 bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleCloseDialogRegister}
              loading={isLoading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </Form>
      </Formik>
    </Dialog>
  )
}

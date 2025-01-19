import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input, Dialog } from '@/components'
import { useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Typography } from '@material-tailwind/react'
import theme from '../../../../themes/global'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  cnpf_cnpj: Yup.string().required('A CPF/CNPJ é obrigatório'),
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
  cellPhone: Yup.string().required('O número de telefone é obrigatório')
})

export const DialogEditClient = ({
  openDialogEdit,
  handleCloseDialogEdit,
  line
}) => {
  const [isLoading, setIsLoading] = useState(false)
  console.log('line', line)

  const handleSubmit = async values => {
    console.log('values', values)
    toast.info('Processando, aguarde um momento!')
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const isSuccess = true

    if (isSuccess) {
      toast.success('Cliente atualizado com sucesso!')
      setIsLoading(false)
      handleCloseDialogEdit()
    } else {
      toast.error('Falha ao atualizar cliente!')
      setIsLoading(false)
    }
  }

  return (
    <Dialog size="sm" open={openDialogEdit} onClose={handleCloseDialogEdit}>
      <Dialog.Title>Editar Cliente</Dialog.Title>
      <Formik
        initialValues={{
          name: line.name,
          cnpf_cnpj: line.cpf_cnpj,
          email: line.email,
          cellPhone: line.cellPhone
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Dialog.Content>
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              type="submit"
              className={theme.button.warning}
              loading={isLoading}
            >
              Atualizar
            </Button>
            <Button
              type="button"
              className={theme.button.gray}
              onClick={handleCloseDialogEdit}
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

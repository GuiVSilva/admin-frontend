import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Button, Input, Dialog } from '@/components'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Typography } from '@material-tailwind/react'
import theme from '../../../../themes/global'
import { buscaCepService } from '../../../../services/buscaCep'
import { clientsService } from '../../../../services/clients'
import { useUser } from '@clerk/clerk-react'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  cnpf_cnpj: Yup.string().required('O CPF/CNPJ é obrigatório'),
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
  cellPhone: Yup.string().required('O número de telefone é obrigatório'),
  cep: Yup.string().required('O CEP é obrigatório'),
  address: Yup.string().required('O endereço é obrigatório'),
  house_number: Yup.string().required('O número da casa é obrigatório'),
  neighborhood: Yup.string().required('O bairro é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório')
})

export const DialogRegisterClient = ({
  openDialogRegister,
  handleCloseDialogRegister
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handleSubmit = async values => {
    setIsLoading(true)
    const newValues = { ...values, user: user.fullName }
    try {
      await clientsService.createClient(newValues)
      toast.success('Cliente cadastrado com sucesso!')
      setIsLoading(false)
      handleCloseDialogRegister()
    } catch (error) {
      console.log('error', error)
      toast.error('Falha ao cadastrar cliente!')
      setIsLoading(false)
    }
  }

  const findCep = async (cep, setFieldValue) => {
    setIsLoading(true)
    try {
      const { data } = await buscaCepService.findCep(cep)

      if (!data.erro) {
        setFieldValue('address', data.logradouro)
        setFieldValue('complementar', data.complemento)
        setFieldValue('neighborhood', data.bairro)
        setFieldValue('city', data.localidade)
        setFieldValue('state', data.uf)
      } else {
        toast.error('CEP não encontrado!')
      }

      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
      toast.error('Ocorreu um erro ao buscar o cep')
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      size="lg"
      open={openDialogRegister}
      onClose={handleCloseDialogRegister}
    >
      <Dialog.Title>Dados do Cliente</Dialog.Title>
      <Formik
        initialValues={{
          name: '',
          cnpf_cnpj: '',
          email: '',
          cellPhone: '',
          cep: '',
          address: '',
          complementar: '',
          neighborhood: '',
          city: '',
          state: '',
          house_number: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
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
              <div className="flex gap-4">
                <div className="w-full">
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium text-gray-400"
                  >
                    CEP
                  </Typography>
                  <Field
                    as={Input}
                    id="cep"
                    name="cep"
                    placeholder="Digite o cep"
                    loading={isLoading}
                    onBlur={e => findCep(e.target.value, setFieldValue)}
                  />
                  <ErrorMessage
                    name="cep"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium text-gray-400"
                  >
                    Endereço
                  </Typography>
                  <Field
                    as={Input}
                    id="address"
                    name="address"
                    placeholder=""
                    loading={isLoading}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium text-gray-400"
                  >
                    Número
                  </Typography>
                  <Field
                    as={Input}
                    id="house_number"
                    name="house_number"
                    placeholder=""
                    loading={isLoading}
                  />
                  <ErrorMessage
                    name="house_number"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium text-gray-400"
                  >
                    Bairro
                  </Typography>
                  <Field
                    as={Input}
                    id="neighborhood"
                    name="neighborhood"
                    placeholder=""
                    loading={isLoading}
                  />
                  <ErrorMessage
                    name="neighborhood"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium text-gray-400"
                  >
                    Cidade
                  </Typography>
                  <Field
                    as={Input}
                    id="city"
                    name="city"
                    placeholder=""
                    loading={isLoading}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium text-gray-400"
                  >
                    Estado
                  </Typography>
                  <Field
                    as={Input}
                    id="state"
                    name="state"
                    placeholder=""
                    loading={isLoading}
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium text-gray-400"
                >
                  Complementar
                </Typography>
                <Field
                  as={Input}
                  id="complementar"
                  name="complementar"
                  placeholder=""
                  loading={isLoading}
                />
                <ErrorMessage
                  name="complementar"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                type="submit"
                className={theme.button.success}
                loading={isLoading}
              >
                Salvar
              </Button>
              <Button
                type="button"
                className={theme.button.gray}
                onClick={handleCloseDialogRegister}
                loading={isLoading}
              >
                Cancelar
              </Button>
            </Dialog.Actions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

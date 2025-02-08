import { Dialog, Button, Input } from '@/components'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import CustomAutocomplete from '../../../../components/CustomAutocomplete'
import { Typography } from '@material-tailwind/react'
import { useState } from 'react'
import theme from '../../../../themes/global'
import { toast } from 'react-toastify'
import { buscaCepService } from '../../../../services/buscaCep'

const options = [
  { label: 'Cliente 1', value: '1' },
  { label: 'Cliente 2', value: '2' },
  { label: 'Cliente 3', value: '3' },
  { label: 'Cliente 4', value: '4' },
  { label: 'Cliente 5', value: '5' },
  { label: 'Cliente 6', value: '6' }
]

export const DialogClientOrder = ({
  openDialog,
  handleCloseDialog,
  tableRows
}) => {
  const [isLoading, setIsLoading] = useState(false)
  if (!openDialog) {
    return null
  }
  console.log('aqui chego assim', tableRows)

  const handleSubmit = async values => {
    setIsLoading(true)
    console.log('values', values.select_clients.label)
    console.log('values', values.select_clients.value)
    toast.info('Processando, aguarde um momento!')
    await new Promise(resolve => setTimeout(resolve, 1000))
    const isSuccess = true
    if (isSuccess) {
      toast.success('Pedido adicionado com sucesso!')
      setIsLoading(false)
      handleCloseDialog()
    } else {
      toast.error('Falha ao adicionar pedido!')
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
    <>
      <Dialog size="md" open={openDialog} onClose={handleCloseDialog}>
        <Dialog.Title>Finalização do Pedido</Dialog.Title>
        <Formik
          initialValues={{
            select_clients: '',
            cep: '',
            address: '',
            complementar: '',
            neighborhood: '',
            city: '',
            state: ''
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium text-gray-400"
              >
                Nome do Cliente
              </Typography>
              <Dialog.Content>
                <CustomAutocomplete
                  name="select_clients"
                  options={options}
                  label="Selecione um cliente"
                  placeholder="Digite o nome do cliente"
                  loading={isLoading}
                  size="lg"
                />
                <ErrorMessage
                  name="select_clients"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                      size="lg"
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
                      size="lg"
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
                      id="number"
                      name="number"
                      placeholder=""
                      loading={isLoading}
                    />
                    <ErrorMessage
                      name="number"
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
                      size="lg"
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
                      size="lg"
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
                  onClick={handleCloseDialog}
                  loading={isLoading}
                >
                  Cancelar
                </Button>
              </Dialog.Actions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

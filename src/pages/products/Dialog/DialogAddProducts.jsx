import { Typography } from '@material-tailwind/react'

import theme from '../../../themes/global'

import { Button, TextArea, Input, Dialog } from '@/components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { productsService } from '../../../services/products'
import { useUser } from '@clerk/clerk-react'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  mark: Yup.string().required('A marca é obrigatória'),
  cost_price: Yup.string().required('O valor de custo é obrigatório'),
  sale_price: Yup.string().required('O valor de venda é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória')
})

const formatCurrencyToDecimal = value => {
  if (!value) return null
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'))
}

export const DialogAddProducts = ({
  openDialogRegister,
  handleCloseDialogRegister
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handleSubmit = async values => {
    console.log('values', values)
    setIsLoading(true)
    try {
      await productsService.createProduct({
        name: values.name,
        mark: values.mark,
        cost_price: formatCurrencyToDecimal(values.cost_price),
        sale_price: formatCurrencyToDecimal(values.sale_price),
        description: values.description,
        user: user.fullName
      })
      toast.success('Produto cadastrado com sucesso')
      setIsLoading(false)
      handleCloseDialogRegister()
    } catch (error) {
      console.log(error)
      toast.error(
        error.response.data.message || 'Ocorreu um erro ao cadastrar Produto'
      )
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      size="sm"
      open={openDialogRegister}
      onClose={handleCloseDialogRegister}
    >
      <Dialog.Title>Dados do Produto</Dialog.Title>
      <Formik
        initialValues={{
          name: '',
          mark: '',
          description: '',
          cost_price: '',
          sale_price: ''
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
                Marca
              </Typography>
              <Field
                as={Input}
                id="mark"
                name="mark"
                placeholder="Digite uma marca"
                loading={isLoading}
                size={10}
              />
              <ErrorMessage
                name="mark"
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
                  Preço de custo
                </Typography>
                <Field
                  as={Input}
                  id="cost_price"
                  name="cost_price"
                  placeholder="Valor de Custo"
                  loading={isLoading}
                  mask="money"
                />
                <ErrorMessage
                  name="cost_price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium text-gray-400"
                >
                  Preço de venda
                </Typography>
                <Field
                  as={Input}
                  id="sale_price"
                  name="sale_price"
                  placeholder="Valor de Venda"
                  loading={isLoading}
                  mask="money"
                />
                <ErrorMessage
                  name="sale_price"
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
                Descrição
              </Typography>
              <Field
                as={TextArea}
                id="description"
                name="description"
                placeholder="Digite uma descrição para o produto"
                rows={2}
                loading={isLoading}
              />
              <ErrorMessage
                name="description"
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
      </Formik>
    </Dialog>
  )
}

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Typography } from '@material-tailwind/react'
import { Button, Input, Dialog } from '@/components'
import { useState } from 'react'
import theme from '../../../../themes/global'
import { stockService } from '../../../../services/stock'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/clerk-react'

import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  local: Yup.string().required('O nome é obrigatório')
})

export const DialogCreateLocal = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handleSubmit = async values => {
    setIsLoading(true)
    try {
      await stockService.createLocation({
        local: values.local,
        user: user.fullName
      })
      toast.success('Local cadastrado com sucesso')
      setIsLoading(false)
      onClose()
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      toast.error(
        error.response.data.message || 'Ocorreu um erro ao cadastrar Local'
      )
    }
  }

  return (
    <>
      <Dialog size="sm" open={open} onClose={onClose}>
        <Dialog.Title>Dados do Local</Dialog.Title>
        <Dialog.Content>
          <Formik
            initialValues={{ local: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div>
                <Typography>Nome do Local</Typography>
              </div>
              <Field
                as={Input}
                name="local"
                placeholder="Digite um local"
                loading={isLoading}
              />
              <ErrorMessage
                name="local"
                component="div"
                className="text-red-500 text-sm"
              />

              <Dialog.Actions>
                <Button
                  type="submit"
                  className={theme.button.success}
                  loading={isLoading}
                  size="lg"
                >
                  Salvar
                </Button>
                <Button
                  type="button"
                  className={theme.button.gray}
                  onClick={onClose}
                  loading={isLoading}
                  size="lg"
                >
                  Cancelar
                </Button>
              </Dialog.Actions>
            </Form>
          </Formik>
        </Dialog.Content>
      </Dialog>
    </>
  )
}

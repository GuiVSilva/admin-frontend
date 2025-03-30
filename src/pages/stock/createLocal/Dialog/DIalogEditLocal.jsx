import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Typography } from '@material-tailwind/react'
import { Button, Input, Dialog } from '@/components'
import { useState } from 'react'

import * as Yup from 'yup'
import { stockService } from '../../../../services/stock'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  local: Yup.string().required('O nome é obrigatório')
})

export const DialogEditLocal = ({ open, onClose, line }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async values => {
    setIsLoading(true)
    try {
      await stockService.updateLocation({
        id: line.id,
        local: values.local
      })
      toast.success('Local editado com sucesso')
      setIsLoading(false)
      onClose()
    } catch (error) {
      setIsLoading(false)
      toast.error(
        error.response.data.message || 'Ocorreu um erro ao editar Local'
      )
      console.error(error)
    }
  }
  return (
    <>
      <Dialog size="sm" open={open} onClose={onClose}>
        <Dialog.Title>Editar Dados do Local</Dialog.Title>
        <Dialog.Content>
          <Formik
            initialValues={{ local: line?.name }}
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
                  className="bg-green-700 text-white hover:bg-green-800"
                  loading={isLoading}
                >
                  Salvar
                </Button>
                <Button
                  type="button"
                  className="ml-4 bg-gray-600 text-white hover:bg-gray-700"
                  onClick={onClose}
                  loading={isLoading}
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

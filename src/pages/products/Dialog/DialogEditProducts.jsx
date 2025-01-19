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
import { Button, TextArea, Input  } from "@/components";
import { useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  mark: Yup.string().required('A marca é obrigatória'),
  cost_price: Yup.string().required('O valor de custo é obrigatório'),
  sale_price: Yup.string().required('O valor de venda é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória')
})

export const DialogEditProducts = ({
  openDialogEdit,
  handleCloseDialogEdit,
  line
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async values => {
    console.log('values', values)
    toast.info('Processando, aguarde um momento!')
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const isSuccess = true

    if (isSuccess) {
      toast.success('Produto atualizado com sucesso!')
      setIsLoading(false)
      handleCloseDialogEdit()
    } else {
      toast.error('Falha ao atualizar produto!')
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      size="sm"
      open={openDialogEdit}
      className="p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg -z-10"
    >
      <DialogHeader className="relative m-0 block border-b border-gray-700 pb-2">
        <Typography variant="h4" className="text-gray-100">
          Editar Produto
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
          onClick={handleCloseDialogEdit}
        >
          <X className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <Formik
        initialValues={{
          name: line.name,
          mark: line.mark,
          description: line.description,
          cost_price: line.cost_price,
          sale_price: line.sale_price
        }}
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
                Marca
              </Typography>
              <Field
                as={Input}
                id="mark"
                name="mark"
                placeholder="Digite uma marca"
                loading={isLoading}
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
            {/* <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium text-gray-400"
                    >
                      Marca
                    </Typography>
                    <Select
                      name="select_sub_problem"
                      label="Sub Problema"
                      options={options}
                      loading={isLoading}
                    />
      
                    <ErrorMessage
                      name="mark"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div> */}
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
          </DialogBody>
          <DialogFooter className="border-t border-gray-700 pt-4">
            <Button
              type="submit"
              className="bg-yellow-600 text-white hover:bg-yellow-700"
              loading={isLoading}
            >
              Atualizar
            </Button>
            <Button
              type="button"
              className="ml-4 bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleCloseDialogEdit}
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

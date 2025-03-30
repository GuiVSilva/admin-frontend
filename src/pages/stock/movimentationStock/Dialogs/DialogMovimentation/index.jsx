import { Field, Form, Formik } from 'formik'
import { Typography } from '@material-tailwind/react'
import { Button, Input, Dialog } from '@/components'
import theme from '../../../../../themes/global'
import { productsService } from '../../../../../services/products'
import { useEffect, useState } from 'react'
import CustomAutocomplete from '../../../../../components/CustomAutocomplete'
import { stockService } from '../../../../../services/stock'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/clerk-react'
import { Select } from '@/components'

const optionsTypeMoviments = [
  { label: 'Entrada', value: 0 },
  { label: 'Saida', value: 1 }
]

const DialogMovimentation = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [locations, setLocations] = useState([])
  const { user } = useUser()

  const handleProducts = async () => {
    try {
      const data = await productsService.findProducts()
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLocations = async () => {
    try {
      const response = await stockService.findLocations()
      setLocations(response)
    } catch (error) {
      console.error(error)
    }
  }

  const optionsProducts = products?.map(item => ({
    label: item?.name,
    value: item?.id
  }))

  const optionsLocations = locations?.map(item => ({
    label: item?.name,
    value: item?.id
  }))

  useEffect(() => {
    handleProducts()
    handleLocations()
  }, [])

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true)
    console.log('values', values)
    try {
      await stockService.createMovement({
        id_product: values.select_product.value,
        id_location: values.select_location.value,
        quantity: values.quantity,
        user: user.fullName,
        type_moviment: values.type_moviment
      })
      toast.success('Movimentação registrada com sucesso!')
      setIsLoading(false)
      resetForm()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error(
        error.response.data.message ||
          'Ocorreu um erro ao registrar Movimentação'
      )
      setIsLoading(false)
    }
  }
  return (
    <>
      <Dialog size="md" open={open} onClose={onClose}>
        <Dialog.Title>Movimentar Estoque</Dialog.Title>

        <Formik
          initialValues={{
            select_product: '',
            select_location: '',
            quantity: '',
            type_moviment: ''
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Dialog.Content>
                <div className="grid grid-cols-1 gap-3 p-3">
                  <div className="flex gap-4 ">
                    <div className="w-full">
                      <Typography>Produtos</Typography>
                      <CustomAutocomplete
                        name="select_product"
                        options={optionsProducts}
                        label="Selecione um Produto"
                        placeholder="Digite o nome do produto"
                        loading={isLoading}
                        size="lg"
                      />
                    </div>

                    <div className="w-full">
                      <Typography>Locais</Typography>
                      <CustomAutocomplete
                        name="select_location"
                        options={optionsLocations}
                        label="Selecione um Local"
                        placeholder="Digite o nome do local"
                        loading={isLoading}
                        size="lg"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-full">
                      <Typography>Quantidade</Typography>
                      <Field
                        name="quantity"
                        placeholder="Quantidade"
                        type="number"
                        as={Input}
                      />
                    </div>
                    <div className="w-full">
                      <Typography>Tipo de Movimentação</Typography>
                      <Select
                        name="type_moviment"
                        label="Tipo de Movimentação"
                        options={optionsTypeMoviments}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Content>
              <Dialog.Actions>
                <Button className={theme.button.success} type="submit">
                  Salvar
                </Button>
                <Button
                  className={theme.button.gray}
                  type="submit"
                  onClick={onClose}
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

export default DialogMovimentation


import { Typography } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import { Button, Input, Select, Dialog } from "@/components";
import theme from "@/themes/global";
const DialogRegisterMinStock = ({ open, onClose }) => {
  const options = [{ label: "Produto A", value: 0 }];
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Dialog.Title>Minimo Por Produto</Dialog.Title>
        <Formik>
          {() => (
            <Form>
              <Dialog.Content>
                <div className="grid grid-cols-1 gap-3 p-3">
                  <div className="flex gap-4 ">
                    <div className="w-full">
                      <Typography>Produtos</Typography>
                      <Select
                        name="select_product"
                        label="Produto"
                        options={options}
                      />
                    </div>

                    <div className="w-full">
                      <Typography>Mínimo de Estoque</Typography>
                      <Field
                        name="quantity"
                        type="number"
                        placeholder="Quantidade"
                        as={Input}
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
  );
};
export default DialogRegisterMinStock;

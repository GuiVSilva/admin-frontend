import { Button, Dialog, Select, Input } from "@/components";
import { Typography } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import theme from "@/themes/global";

const options = [{ label: "Produto A", value: 0 }];
const optionsLocal = [{ label: "Local A", valuel: 0 }];
const DialogTranferProduct = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Dialog.Title>Transferência de Produto</Dialog.Title>
        <Dialog.Content>
          <Formik>
            {() => (
              <Form>
                <Dialog.Content>
                  <div className="grid grid-cols-1 gap-3 p-3">
                    <div className="flex gap-4 ">
                      <div className="w-full">
                        <Typography>Produto</Typography>
                        <Select
                          name="select_product"
                          label="Produto"
                          options={options}
                        />
                      </div>

                      <div className="w-full">
                        <Typography>De</Typography>
                        <Select
                          name="select_local"
                          label="Locall"
                          options={optionsLocal}
                        />
                      </div>

                      
                      <div className="w-full">
                        <Typography>Para</Typography>
                        <Select
                          name="select_local"
                          label="Locall"
                          options={optionsLocal}
                        />
                      </div>
                    </div>

                    <div>
                      <Typography>Quantidade</Typography>
                      <Field
                        name="quantity"
                        placeholder="Quantidade"
                        type="number"
                        as={Input}
                      />
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
        </Dialog.Content>
      </Dialog>
    </>
  );
};
export default DialogTranferProduct;

import { Field, Form, Formik } from "formik";
import Dialog from "../../../../../components/Dialog";
import { Select } from "../../../../../components/Select";
import { Typography } from "@material-tailwind/react";
import { Input } from "../../../../../components/Input";
import { Button } from "../../../../../components/Button";
import theme from "../../../../../themes/global";

const DialogMovimentation = ({ open, onClose }) => {
  const options = [{ label: "Produto A", value: 0 }];
  const optionsLocal = [{ label: "Local A", valuel: 0 }];
  return (
    <>
      <Dialog size="md" open={open} onClose={onClose}>
        <Dialog.Title>Movimentar Estoque</Dialog.Title>

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
                      <Typography>Locais</Typography>
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
      </Dialog>
    </>
  );
};

export default DialogMovimentation;

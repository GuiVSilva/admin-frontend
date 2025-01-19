import { ErrorMessage, Field, Form, Formik } from "formik";
import { Typography } from "@material-tailwind/react";
import { Button, Input, Dialog } from "@/components";
import { useState } from "react";
import theme from "../../../../themes/global";

export const DialogCreateLocal = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.lof(values);
  };
  return (
    <>
      <Dialog size="sm" open={open} onClose={onClose}>
        <Dialog.Title>Dados do Local</Dialog.Title>
        <Dialog.Content>
          <Formik initialValues={{ local: "" }} onSubmit={handleSubmit}>
            <Form>
              <div>
                <Typography>Nome do Local</Typography>
              </div>
              <Field
                as={Input}
                id="local"
                name="local"
                placeholder="Digite um local"
                loading={isLoading}
              />
              <ErrorMessage
                name="mark"
                component="div"
                className="text-red-500 text-sm"
              />
            </Form>
          </Formik>
        </Dialog.Content>
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
      </Dialog>
    </>
  );
};

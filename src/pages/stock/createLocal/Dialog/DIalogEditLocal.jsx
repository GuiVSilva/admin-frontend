import { ErrorMessage, Field, Form, Formik } from "formik";
import { Typography } from "@material-tailwind/react";
import { Button, Input, Dialog } from "@/components";
import { useState } from "react";

export const DialogEditLocal = ({ open, onClose, line }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.lof(values);
  };
  return (
    <>
      <Dialog size="sm" open={open} onClose={onClose}>
        <Dialog.Title>Editar Dados do Local</Dialog.Title>
        <Dialog.Content>
          <Formik initialValues={{ local: line?.name }} onSubmit={handleSubmit}>
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
      </Dialog>
    </>
  );
};

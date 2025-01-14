import { Form, Formik } from "formik";
import Dialog from "../../../../components/Dialog";
import { Typography } from "@material-tailwind/react";
import { Button } from "../../../../components/Button";
import { useState } from "react";

export const DialogDeleteLocal = ({
  openDialogDelete,
  handleCloseDialogDelete,
  line,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log(values);
  };
  return (
    <>
      <Dialog
        size="sm"
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
      >
        <Dialog.Title>Excluir Local</Dialog.Title>
        <Dialog.Content>
          <Formik initialValues={{ local: line?.name }} onSubmit={handleSubmit}>
            <Form>
              <div className="mt-4 text-center pt-10">
                <Typography variant="h5" className="text-gray-300">
                  Tem certeza que deseja excluir o local?
                </Typography>
              </div>
            </Form>
          </Formik>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            type="submit"
            className="bg-red-800 text-white hover:bg-red-900 px-6"
            loading={isLoading}
          >
            Excluir
          </Button>
          <Button
            type="button"
            className="bg-gray-600 text-white hover:bg-gray-700 px-6"
            onClick={handleCloseDialogDelete}
            loading={isLoading}
          >
            Cancelar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

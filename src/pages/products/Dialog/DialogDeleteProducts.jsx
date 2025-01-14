import {
  Dialog,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";
import { useState } from "react";

export const DialogDeleteProducts = ({
  openDialogDelete,
  handleCloseDialogDelete,
  line,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    toast.info("Processando, aguarde um momento!");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("id do produto", line.id);
    const isSuccess = true;

    if (isSuccess) {
      toast.success("Produto excluido com sucesso!");
      setIsLoading(false);
      handleCloseDialogDelete();
    } else {
      toast.error("Falha ao excluir produto!");
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      size="sm"
      open={openDialogDelete}
      className="p-6 bg-gray-800 text-gray-300 rounded-lg shadow-lg"
    >
      <DialogHeader className="relative border-b border-gray-700 pb-2 text-center">
        <Typography variant="h4" className="text-gray-100">
          Excluir Produto
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
          onClick={handleCloseDialogDelete}
        >
          <X className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form>
          <div className="mt-4 text-center pt-10">
            <Typography variant="h5" className="text-gray-300">
              Tem certeza que deseja excluir o produto?
            </Typography>
          </div>

          <DialogFooter className="mt-6 flex justify-center gap-4">
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
          </DialogFooter>
        </Form>
      </Formik>
    </Dialog>
  );
};

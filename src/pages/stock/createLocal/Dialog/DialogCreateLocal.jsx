import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { X } from "lucide-react";
import { Input } from "../../../../components/Input";
import { useState } from "react";
import { Button } from "../../../../components/Button";

const DialogCreateLocal = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    console.log("Form submitted");
  };
  return (
    <>
      <Dialog
        size="sm"
        open={open}
        className="p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg"
      >
        <DialogHeader className="relative m-0 block border-b border-gray-700 pb-2">
          <Typography variant="h4" className="text-gray-100">
            Dados do Produto
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5 text-gray-300 hover:text-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <Formik initialValues={{ local: "" }} onSubmit={handleSubmit}>
          <Form>
            <DialogBody className="space-y-4 pb-6">
              <div>
                <Typography>Nome do Local</Typography>
              </div>
              <Field
                as={Input}
                id="local"
                name="local"
                placeholder="Digite um local"
                loading={isLoading}
                // size="lg"
              />
              <ErrorMessage
                name="mark"
                component="div"
                className="text-red-500 text-sm"
              />
            </DialogBody>

            <DialogFooter className="border-t border-gray-700 pt-4">
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
            </DialogFooter>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
};
export default DialogCreateLocal;

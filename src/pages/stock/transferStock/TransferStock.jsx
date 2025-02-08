import { StatCard, Header, Button } from "@/components";
import theme from "@/themes/global";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRightLeft,
  LayoutPanelTop,
  Package,
  Scale,
  Search,
} from "lucide-react";
import DialogTranferProduct from "./Dialogs/DialogTranferProduct";
import { useState } from "react";

const TransferStock = () => {
  const [openDialogTransfer, setOpenDialogTransfer] = useState(false);

  const handleOpenDialogTransfer = () => {
    setOpenDialogTransfer(true);
  };
  const handleCloseDialogTransfer = () => {
    setOpenDialogTransfer(false);
  };
  return (
    <>
      <DialogTranferProduct open={openDialogTransfer} onClose={handleCloseDialogTransfer} />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Transferência de Estoque" />

        <div className={theme.grid.cards}>
          <motion.div
            className={theme.grid.motion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total em estoque"
              icons={Package}
              value="10.000"
              color="#6366f1"
            />
            <StatCard
              name="Produto mais movimentado"
              icons={AlertTriangle}
              value="TELA"
              color="#f59e0b"
            />
            <StatCard
              name="Estoque com mais produtos"
              icons={Scale}
              value="Estoque C"
              color="#a0a3a1"
            />

            <StatCard
              name="Estoque com menos produtos"
              icons={LayoutPanelTop}
              value="Local A"
              color="#06b6d4"
            />
          </motion.div>

          <div className="flex justify-between">
            <div className="flex gap-6 items-center mb-4">
              <Button
                type="button"
                className={theme.button.success}
                size="lg"
                  onClick={() => handleOpenDialogTransfer()}
              >
                <ArrowRightLeft size={18} className="mr-2" />
                Transferir Produto
              </Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar"
                className={theme.input.search}
                //   value={searchTerm}
                //   onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransferStock;

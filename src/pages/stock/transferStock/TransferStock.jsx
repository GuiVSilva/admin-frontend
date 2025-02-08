import { StatCard, Header, Button, Pagination, Table } from "@/components";
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

const headers = [
  // { label: "Descrição", key: "description" },
  { label: "Produto", key: "product" },
  { label: "De", key: "de" },
  { label: "Para", key: "para" },
  { label: "Quantidade", key: "quantity" },
];

const data = [
  {
    id: 1,
    product: "Produto A",
    de: "Local A",
    para: "Local C",
    quantity: 10,
  },
  {
    id: 2,
    product: "Produto A",
    de: "Local A",
    para: "Local C",
    quantity: 10,
  },
  {
    id: 3,
    product: "Produto A",
    de: "Local A",
    para: "Local C",
    quantity: 10,
  },
  {
    id: 4,
    product: "Produto A",
    de: "Local A",
    para: "Local C",
    quantity: 10,
  },
];

const TransferStock = () => {
  const [openDialogTransfer, setOpenDialogTransfer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const filteredData = data?.filter((item) =>
    item?.product?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOpenDialogTransfer = () => {
    setOpenDialogTransfer(true);
  };
  const handleCloseDialogTransfer = () => {
    setOpenDialogTransfer(false);
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <DialogTranferProduct
        open={openDialogTransfer}
        onClose={handleCloseDialogTransfer}
      />
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <Table name="Últimas Transferências" headers={headers}>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.de}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.para}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.quantity}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center text-gray-500 py-4"
                >
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </Table>
          <Pagination
            filteredData={filteredData}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </>
  );
};
export default TransferStock;

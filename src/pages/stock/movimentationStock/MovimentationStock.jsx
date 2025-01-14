import { Button } from "../../../components/Button";
import Header from "../../../components/Header";
import StatCard from "../../../components/StatCard";

// import Table from "../../../components/Table";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Package,
  Scale,
  LayoutPanelTop,
  Plus,
  ArrowRightLeft,
} from "lucide-react";
import theme from "../../../themes/global";

const MovimentationStock = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Movimentação de Estoque" />

        <main className="max-w-7xl mx-auto py-20 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
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
              name="Abaixo do nível mínimo"
              icons={Scale}
              value="15"
              color="#a0a3a1"
            />

            <StatCard
              name="Local mais movimentado"
              icons={LayoutPanelTop}
              value="Expedição"
              color="#06b6d4"
            />
          </motion.div>

          <div className="flex gap-6 items-center mb-4">
            <Button type="button" className={theme.button.success}>
              <ArrowRightLeft size={18} className="mr-2" />
              Movimentar Estoque
            </Button>

            <Button type="button" className={theme.button.gray}>
              <Plus size={18} className="mr-2" />
              Mínino Estoque
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};
export default MovimentationStock;

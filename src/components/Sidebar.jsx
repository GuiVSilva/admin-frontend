import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart2,
  ShoppingBag,
  Users,
  DollarSign,
  ShoppingCart,
  Layers,
  CircleDollarSignIcon,
  FileChartColumn,
  Settings,
  Menu
} from 'lucide-react'

const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    icon: BarChart2,
    color: '#6366f1',
    href: '/'
  },
  {
    name: 'Produtos',
    icon: ShoppingBag,
    color: '#8B5CF6',
    href: '/products',
    subItems: [
      {
        name: 'Cadastrar Produtos',
        icon: ShoppingBag,
        href: '/products/register-products'
      }
    ]
  },
  {
    name: 'Clientes',
    icon: Users,
    color: '#EC4899',
    href: '/clients'
  },
  {
    name: 'Vendas',
    icon: DollarSign,
    color: '#10B981',
    href: '/sales'
  },
  {
    name: 'Pedidos',
    icon: ShoppingCart,
    color: '#F59E0B',
    href: '/orders'
  },
  {
    name: 'Estoque',
    icon: Layers,
    color: '#3B82F6',
    href: '/stock'
  },
  {
    name: 'Financeiro',
    icon: CircleDollarSignIcon,
    color: '#a32e38',
    href: '/finance'
  },
  {
    name: 'Relatórios',
    icon: FileChartColumn,
    color: '#999696',
    href: '/reports'
  },
  {
    name: 'Configurações',
    icon: Settings,
    color: '#6ee7b7',
    href: '/settings'
  }
]

const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState(null)
  const navigate = useNavigate()

  const toggleSubMenu = name => {
    setActiveItem(prev => (prev === name ? null : name))
  }

  const handleClickItem = item => {
    if (item.subItems) {
      toggleSubMenu(item.name)
    } else {
      navigate(item.href)
    }
  }

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSideBarOpen ? 'w-64' : 'w-20'
      }`}
      animate={{ width: isSideBarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 ">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.name}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer">
                <div
                  onClick={() => handleClickItem(item)}
                  className="flex items-center w-full"
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: '20px' }}
                  />
                  <AnimatePresence>
                    {isSideBarOpen && (
                      <motion.div
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              {/* Submenu */}
              <AnimatePresence>
                {activeItem === item.name && item.subItems?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-8"
                  >
                    {item.subItems.map(subItem => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="flex items-center p-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <subItem.icon size={16} className="mr-2" />
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar
import { FaHome, FaShoppingBag, FaShoppingCart, FaChartBar } from 'react-icons/fa';

export const navigation = [
  {
    name: 'Overview',
    icon: FaHome,
    path: '/dashboard',
  },
  {
    name: 'Inventory',
    icon: FaShoppingBag,
    path: '/dashboard/stock',
  },
  {
    name: 'Order',
    icon: FaShoppingCart,
    path: '/dashboard/order',
  },
  {
    name: 'Analytics',
    icon: FaChartBar,
    path: '/dashboard/analytics',
  },
];



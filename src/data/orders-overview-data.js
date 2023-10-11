import {
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";

export const ordersOverviewData = [
  {
    icon: BellIcon,
    color: "text-green-500",
    title: "Nueva solicitud de viaje",
    description: "22 Jun 15:30",
  },
  {
    icon: PlusCircleIcon,
    color: "text-red-500",
    title: "Transporte nro 1832412 coordinado",
    description: "21 Jun 11:30 AM",
  },
  {
    icon: BanknotesIcon,
    color: "text-blue-gray-900",
    title: "Nuevo pago, orden #9583120",
    description: "15 Jun",
  },
  {
    icon: BanknotesIcon,
    color: "text-blue-gray-900",
    title: "Nuevo pago, orden #9583320",
    description: "15 Jun",
  },
  {
    icon: TruckIcon,
    color: "text-pink-500",
    title: "Viaje Finalizado, orden #9583111",
    description: "13 Jun 4:54 PM",
  },
];

export default ordersOverviewData;

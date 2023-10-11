import {
  HomeIcon,
  CalculatorIcon,
  UserIcon,
  BanknotesIcon,
  TruckIcon,
  BeakerIcon,
  IdentificationIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications } from "@/pages/inicio";

import RutaProtegida from "@/layouts/RutaProtegida";

import { Clientes } from "@/pages/inicio/clientes";
import Proveedores from "@/pages/inicio/proveedores";
import Contable from "@/pages/inicio/contable";
import Prueba from "./pages/inicio/pruebas";
import Logistica from "./pages/inicio/logistica";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "inicio",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Inicio",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "coordinacion",
    pages: [
      {
        icon: <TruckIcon {...icon} />,
        name: "Coordinacion",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "administracion",
    pages: [
      {
        icon: <CalculatorIcon {...icon} />,
        name: "Administracion",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "comercial",
    pages: [
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "Comercial",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
  {
    layout: "pruebas",
    pages: [
      {
        icon: <BeakerIcon {...icon} />,
        name: "Pruebas",
        path: "/",
        element: <RutaProtegida />,
      },
    ],
  },
];

export default routes;

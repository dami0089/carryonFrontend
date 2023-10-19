import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import routes from "@/routes";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "@/configs/context";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { openNav, setOpenNav, openSide, setOpenSide } = useServicios();
  const [resize, setResize] = useState(false);

  if (cargando) return "Cargando...";

  const adjustContentWidth = () => {
    if (openSide) {
      document.body.classList.add("sidenav-open");
    } else {
      document.body.classList.remove("sidenav-open");
    }
  };

  // Efecto para ajustar el ancho del contenido principal al cambiar el estado de openSide
  useEffect(() => {
    adjustContentWidth();
  }, [openSide]);

  return (
    <>
      {auth._id && auth.rol === "admin" ? (
        <div className={`flex min-h-screen flex-col bg-blue-gray-50/50`}>
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "/img/logo-en-blanco.png"
                : "/img/logo-en-blanco.png"
            }
          />
          <div
            className={`flex flex-1 flex-col p-4 ${
              openSide ? "xl:ml-80" : "ml-4"
            } transition-all duration-300`}
          >
            {/* <div className="flex flex-1 flex-col p-4 xl:ml-80"> */}
            <DashboardNavbar />
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      ) : auth._id && auth.rol === "proveedor" ? (
        <div className="min-h-screen bg-blue-gray-50/50 p-10">
          <DashboardNavbar />
          <Configurator />
          <IconButton
            size="lg"
            color="white"
            className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
            ripple={false}
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </IconButton>
          <Outlet />
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        </div>
      ) : auth._id && auth.rol === "cliente" ? (
        <div className="min-h-screen bg-blue-gray-50/50 p-10">
          <DashboardNavbar />

          <Outlet />

          <div className=" text-blue-gray-600">
            <Footer />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;

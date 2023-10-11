import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/configs/context";
import io from "socket.io-client";

import { setOpenSidenav } from "@/configs/context";

import useAuth from "@/hooks/useAuth";
import Notificaciones from "@/components/inicio/Notificaciones";
import Buscar from "@/components/inicio/Buscar";
import useServicios from "@/hooks/useServicios";
import Cargando from "@/components/deTodos/Cargando";
import { useEffect } from "react";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { cerrarSesionAuth, auth } = useAuth();

  const {
    openSide,
    setOpenSide,
    handleModalQr,
    modalQr,
    autenticado,
    setAutenticado,
    autenti,
    consultarAutenticacion,
  } = useServicios();

  const handleclose = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  const onClickHandler = () => {
    setOpenSidenav(dispatch, !openSidenav);
    setOpenSide((prevState) => !prevState);
  };

  const handleAbrirModal = () => {
    if (autenticado == "2") {
      handleModalQr();
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    // const socket = io("http://54.197.132.60:3000");

    socket.on("connection-successful", () => {
      console.log("Connection with WhatsApp is successful!");
      // Aquí puedes realizar cualquier otra lógica que necesites una vez conectado.
    });

    socket.on("authentication-status", async (status) => {
      if (status === "authenticated") {
        setAutenticado("1");
      } else if (status === "requires-authentication") {
        setAutenticado("2");

        // Espera a que el evento "qr" sea emitido por el backend.
        socket.on("qr", async (qrText) => {
          // Genera la imagen QR a partir de la cadena recibida
          const qrImageUrl = await QRCode.toDataURL(qrText);
          setQr(qrImageUrl);
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (autenticado !== "1") {
      const consultarBase = async () => {
        await consultarAutenticacion();
      };
      consultarBase();
    }
  }, [autenticado]);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          {auth.rol === "proveedor" && ""}
          <div className="capitalize">
            {/* <Breadcrumbs
              className={`bg-transparent p-0 transition-all ${
                fixedNavbar ? "mt-1" : ""
              }`}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            </Breadcrumbs> */}
            {/* <Typography variant="h6" color="blue-gray">
              {page}
            </Typography> */}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-6">
          {auth.rol === "admin" && <Buscar />}
          <Notificaciones />
          <QrCodeIcon
            className={`h-8 w-8 text-black hover:cursor-pointer ${
              autenticado == "1"
                ? "text-green-300"
                : autenticado == "2"
                ? "text-red-300"
                : autenticado == "0"
                ? "text-gray-300"
                : ""
            }`}
            onClick={(e) => handleAbrirModal()}
          />
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid "
            onClick={() => onClickHandler()}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <Link to="">
            <Button
              variant="text"
              color="blue-gray"
              disabled={true}
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              {auth.nombre} {auth.apellido}
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>

          <Menu onClick={handleclose}>
            <MenuHandler onClick={handleclose}>
              <IconButton variant="text" color="blue-gray">
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={handleclose}
                />
              </IconButton>
            </MenuHandler>
          </Menu>
        </div>
      </div>
      <Cargando />
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
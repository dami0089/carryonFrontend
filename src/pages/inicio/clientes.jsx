import { React, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";

import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente";
import ModalNuevoCliente2 from "@/components/clientes/ModalNuevoCliente2";
import useClientes from "@/hooks/useClientes";
import ListadodeClientes from "../../components/clientes/ListadodeClientes";

import Profile from "@/components/clientes/Profile";

import ModalEditarUsuario from "@/components/usuarios/ModalEditarUsuario";
import ModalEliminarUsuario from "@/components/usuarios/ModalEliminarUsuario";
import ProfileServicio from "@/components/clientes/servicios/ProfileServicio";
import Cargando from "@/components/deTodos/Cargando";
import ModalEditarCliente from "@/components/clientes/profileCliente/ModalEditarCliente";
import ResultadoBusqueda from "@/components/inicio/ResultadoBusqueda";
import useServicios from "@/hooks/useServicios";
import { CurrencyDollarIcon, QueueListIcon } from "@heroicons/react/24/solid";
import ListadoLiquidacionMensualPorCliente from "@/components/clientes/ListadoLiquidacionMensualPorCliente";
import ModalFiltrarClienteLiquidacion from "@/components/clientes/ModalFiltrarClienteLiquidacion";
import ProfileProveedor from "@/components/proveedores/ProfileProveedor";
import useProveedores from "@/hooks/useProveedores";
import ModalEditarUsuarioCliente from "@/components/clientes/ModalEditarUsuarioCliente";

export function Clientes() {
  const {
    handleModalNuevoCliente,
    seleccion,
    modalEditarCliente,
    setSelectInicio,
    setSeleccion,
    handleModalNuevoFiltroLiquidacionClientes,
    modalFiltrarClientesLiquidacion,
  } = useClientes();

  const { setPaginaLogisticaSelector } = useServicios();

  const { seleccionProveedor, setSeleccionProveedor } = useProveedores();

  useEffect(() => {
    setSelectInicio(1);
  }, []);

  useEffect(() => {
    setPaginaLogisticaSelector(100);
  }, []);

  useEffect(() => {
    setSeleccionProveedor(1);
  }, []);

  const handleLiquidacion = (e) => {
    e.preventDefault();
    setSeleccion(20);
  };

  const handleClientes = (e) => {
    e.preventDefault();
    setSeleccion(1);
  };

  return seleccion === 1 ||
    seleccion === 2 ||
    seleccion === 3 ||
    seleccion === 4 ||
    seleccion === 20 ||
    seleccion === 6 ||
    seleccion === 7 ||
    seleccion === 8 ? (
    <>
      <div className="mt-12">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
          <Card onClick={handleModalNuevoCliente} className="cursor-pointer">
            <Card
              variant="gradient"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-500"
            >
              <PlusIcon className="h-8 w-8 text-white" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Nuevo cliente
              </Typography>
            </CardBody>
          </Card>
          <Card onClick={(e) => handleClientes(e)} className="cursor-pointer">
            <Card
              variant="gradient"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center  bg-blue-gray-400"
            >
              <QueueListIcon className="h-8 w-8 text-white" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Listado de clientes
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => handleLiquidacion(e)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center  bg-blue-gray-300"
            >
              <CurrencyDollarIcon className="h-8 w-8 text-white" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Liquidacion mensual x cliente
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div className=" mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between"
            >
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-5 mt-5 ml-3"
                >
                  {seleccion === 1 ? "Listado de Clientes" : ""}
                </Typography>
              </div>
            </CardHeader>
            {seleccion == 1 ? <ListadodeClientes /> : ""}
            {seleccion == 20 ? <ListadoLiquidacionMensualPorCliente /> : ""}
          </Card>
        </div>

        <ModalNuevoCliente />
        <ModalNuevoCliente2 />
        {modalEditarCliente ? <ModalEditarCliente /> : ""}
        {modalFiltrarClientesLiquidacion ? (
          <ModalFiltrarClienteLiquidacion />
        ) : (
          ""
        )}
        <ModalEditarUsuario />
        <ModalEditarUsuarioCliente />
        <ModalEliminarUsuario />

        <Cargando />
      </div>
    </>
  ) : seleccion === 20 ? (
    <ListadoLiquidacionMensualPorCliente />
  ) : seleccion === 5 ? (
    <Profile />
  ) : seleccion === 10 ? (
    <ProfileServicio />
  ) : seleccion === 11 ? (
    <ResultadoBusqueda />
  ) : seleccion === 12 ? (
    <ProfileProveedor />
  ) : (
    ""
  );
}

export default Clientes;

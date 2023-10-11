import { React, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

import { ToastContainer } from "react-toastify";

import useClientes from "@/hooks/useClientes";

import { PlusIcon, TruckIcon } from "@heroicons/react/24/solid";
import ListadoProximosViajesCliente from "@/components/pagina-clientes/ListadoProximosViajesCliente";
import useAuth from "@/hooks/useAuth";
import useServicios from "@/hooks/useServicios";
import ProfileServicioVistaCliente from "@/components/pagina-clientes/ProfileServicioVistaCliente";
import ModalNuevoServicio2 from "@/components/clientes/servicios/ModalNuevoServicio2";
import ModalNuevoServicio3 from "@/components/clientes/servicios/ModalNuevoServicio3";
import ModalNuevoServicio4 from "@/components/clientes/servicios/ModalNuevoServicio4";
import ModalResumenServicio from "@/components/clientes/servicios/ModalResumenServicio";
import NuevoServicioCliente from "@/components/pagina-clientes/ModalNuevoServicioCliente";
import Cargando from "@/components/deTodos/Cargando";

export function PaginaClientes() {
  const {
    handleNewService,
    seleccion,
    newService,
    modalNuevoServicio2,
    modalNuevoServicio3,
    modalNuevoServicio4,
    modalResumen,
  } = useClientes();

  const {
    obternerServiciosCliente,
    serviciosCliente,
    cargando,
    handleCargando,
  } = useServicios();

  const { auth } = useAuth();

  useEffect(() => {
    const traerData = async () => {
      handleCargando();
      await obternerServiciosCliente(auth.cliente);
      handleCargando();
    };
    traerData();
  }, []);

  const handleNuevoServicio = () => {
    handleNewService();
  };

  return seleccion == 1 ? (
    <>
      <div className="mt-12">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2 ">
          <Card className="cursor-pointer">
            <Card
              variant="gradient"
              color="blue"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center"
            >
              <TruckIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Mis servicios Pendientes
              </Typography>
            </CardBody>
          </Card>

          <Card onClick={handleNuevoServicio} className="cursor-pointer">
            <Card
              variant="gradient"
              color="green"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center"
            >
              <PlusIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Nuevo Servicio
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  {seleccion === 1 ? "Servicios Pendientes" : ""}
                </Typography>
              </div>
            </CardHeader>
            {seleccion == 1 ? <ListadoProximosViajesCliente /> : ""}
          </Card>
        </div>
      </div>
      {newService ? <NuevoServicioCliente /> : ""}
      {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
      {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
      {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
      {modalResumen ? <ModalResumenServicio /> : ""}
      {cargando ? <Cargando /> : ""}
    </>
  ) : seleccion === 2 ? (
    <ProfileServicioVistaCliente />
  ) : (
    ""
  );
}

export default PaginaClientes;

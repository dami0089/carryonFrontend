import { React, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Menu,
  Button,
} from "@material-tailwind/react";

import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import useProveedores from "@/hooks/useProveedores";

import ModalNuevoProveedor from "@/components/proveedores/ModalNuevoProveedor";

import useAuth from "@/hooks/useAuth";

import ModalNuevoMovimiento from "@/components/contable/ModalNuevoMovimiento";

import ModalNuevoPago from "@/components/contable/ModalNuevoPago";

import ListadoProximosViajesVistaProveedor from "@/components/pagina-proveedores/ListadoProximosViajesVistaProveedor";

import ListadoMisVehiculos from "@/components/pagina-proveedores/ListadoMisVehiculos";
import ListadoContable from "@/components/pagina-proveedores/ListadoContable";
import ProfileServicioVistaProveedor from "@/components/pagina-proveedores/ProfileServicioVistaProveedor";
import ListadoMisChoferes from "@/components/pagina-proveedores/ListadoMisChoferes";

import ModalNuevoChoferProveedor from "@/components/pagina-proveedores/ModalNuevoChoferProveedor";
import ModalNuevoCamionProveedor from "@/components/pagina-proveedores/ModalNuevoCamionProveedor";
import useServicios from "@/hooks/useServicios";
import ModalNuevoCamion from "@/components/proveedores/ModalNuevoCamion";
import ModalNuevoChofer from "@/components/proveedores/ModalNuevoChofer";
import ModalNuevoSemi from "@/components/proveedores/ModalNuevoSemi";
import ModalNuevoEquipo from "@/components/proveedores/ModalNuevoEquipo";
import Cargando from "@/components/deTodos/Cargando";

export function PaginaProveedores() {
  const {
    seleccionVistaProveedor,
    setSeleccionVistaProveedor,
    obtenerServiciosProveedor,
    obtenerCamiones,
    obtenerChoferes,
    camionesProveedor,
    serviciosProveedor,
    choferesProveedor,
    obtenerSemis,
    obtenerEquipos,
    equiposData,
    modalNuevoChoferP,
    modalNuevoCamionP,
    modalNuevoCamion,
    modalNuevoChofer,
    modalNuevoSemi,
    modalNuevoEquipo,
  } = useProveedores();

  const { semisProveedor, handleCargando, cargando } = useServicios();

  const { auth } = useAuth();

  useEffect(() => {
    const obtenerData = async () => {
      handleCargando();

      await obtenerSemis(auth.proveedor);
      handleCargando();
    };
    obtenerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerChoferes(auth.proveedor);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerCamiones(auth.proveedor);
    };
    traerData();
  }, []);

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerEquipos(auth.proveedor);
    };
    obtenerData();
  }, []);

  const handleMisViajes = (e) => {
    e.preventDefault();
    setSeleccionVistaProveedor(1);
  };

  const handleMisVehiculos = (e) => {
    e.preventDefault();
    setSeleccionVistaProveedor(2);
  };
  const handleMisChoferes = (e) => {
    e.preventDefault();
    setSeleccionVistaProveedor(3);
  };

  const handleContable = (e) => {
    e.preventDefault();
    setSeleccionVistaProveedor(4);
  };

  return seleccionVistaProveedor == 1 ||
    seleccionVistaProveedor == 2 ||
    seleccionVistaProveedor == 3 ||
    seleccionVistaProveedor == 4 ? (
    <>
      <div className="mt-12">
        <div className="mb-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
          <Card onClick={(e) => handleMisViajes(e)} className="cursor-pointer">
            <Card
              variant="gradient"
              className={`absolute -mt-4 grid h-10 w-10 place-items-center ${
                seleccionVistaProveedor == 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              <CalendarDaysIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Proximos Viajes
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => handleMisChoferes(e)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              className={`absolute -mt-4 grid h-10 w-10 place-items-center ${
                seleccionVistaProveedor == 3
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              <UserGroupIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Mis Equipos
              </Typography>
            </CardBody>
          </Card>

          {/* <Card onClick={(e) => handleContable(e)} className="cursor-pointer">
            <Card
              variant="gradient"
              color="green"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <CurrencyDollarIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Contable
              </Typography>
            </CardBody>
          </Card> */}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
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
                  className="ml-5 mt-5 mb-3"
                >
                  {seleccionVistaProveedor === 1 ? "Proximos Viajes" : ""}

                  {seleccionVistaProveedor == 4 ? "Contable" : ""}
                </Typography>
              </div>
            </CardHeader>
            {seleccionVistaProveedor == 1 ? (
              <ListadoProximosViajesVistaProveedor />
            ) : seleccionVistaProveedor == 3 ? (
              <ListadoMisChoferes />
            ) : seleccionVistaProveedor == 2 ? (
              <ListadoMisVehiculos />
            ) : seleccionVistaProveedor == 4 ? (
              <ListadoContable />
            ) : (
              ""
            )}
          </Card>
        </div>
        {modalNuevoChoferP ? <ModalNuevoChoferProveedor /> : ""}
        {modalNuevoCamionP ? <ModalNuevoCamionProveedor /> : ""}
        {modalNuevoCamion ? <ModalNuevoCamion /> : ""}
        {modalNuevoChofer ? <ModalNuevoChofer /> : ""}
        {modalNuevoSemi ? <ModalNuevoSemi /> : ""}
        {modalNuevoEquipo ? <ModalNuevoEquipo /> : ""}
        {cargando ? <Cargando /> : ""}
      </div>
    </>
  ) : (
    <ProfileServicioVistaProveedor />
  );
}

export default PaginaProveedores;

import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { ordersOverviewData, statisticsChartsData } from "@/data";

import useClientes from "@/hooks/useClientes";
import {
  ArrowPathIcon,
  BanknotesIcon,
  BellIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  RocketLaunchIcon,
  TruckIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import useServicios from "@/hooks/useServicios";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import ModalNuevoServicio from "@/components/clientes/servicios/ModalNuevoServicio";
import ModalNuevoServicio2 from "@/components/clientes/servicios/ModalNuevoServicio2";
import ModalNuevoServicio3 from "@/components/clientes/servicios/ModalNuevoServicio3";
import ModalNuevoServicio4 from "@/components/clientes/servicios/ModalNuevoServicio4";
import ModalAsignarProveedor from "@/components/proveedores/ModalAsignarProveedor";
import ModalCargarNumeroContenedores from "@/components/clientes/servicios/ModalCargarNumeroContenedores";
import { ToastContainer } from "react-toastify";

import ModalModificarEstadoViaje from "@/components/clientes/servicios/ModalModificarEstadoViaje";
import ListadoViajesSinNotificar from "@/components/inicio/ListadoViajesSinNotificar";

import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";
import Cargando from "@/components/deTodos/Cargando";
import ModalReasignarProveedor from "@/components/clientes/servicios/ModalReasignarProveedor";
import ModalAsignarEquipoEditarViaje from "@/components/clientes/servicios/ModalAsignarEquipoEditarViaje";
import ResultadoBusqueda from "@/components/inicio/ResultadoBusqueda";
import ModalNuevoDomicilio from "@/components/clientes/profileCliente/ModalNuevoDomicilio";
import ModalEditarViaje from "@/components/clientes/servicios/ModalEditarViaje";
import ModalTerminarViaje from "@/components/clientes/servicios/ModalTerminarViaje";
import ModalDevolucion from "@/components/clientes/servicios/ModalDevolucion";
import ModalEditarDomicilio from "@/components/clientes/profileCliente/ModalEditarDomicilio";
import ModalDevolucionMasDeUnContendor from "@/components/clientes/servicios/ModalDevolucionMasDeUnContendor";
import ModalModificarEstadoServicio from "@/components/clientes/servicios/ModalModificarEstadoServicio";
import ModalEditarContenedorListado from "@/components/clientes/servicios/ModalEditarContenedorDesdeListados";
import ProfileProveedor from "@/components/proveedores/ProfileProveedor";
import ModalResumenNuevo from "@/components/clientes/servicios/ModalResumenNuevo";
import Qr from "@/components/pruebas/Qr";
import UltimasActualizaciones from "@/components/inicio/UltimasActualizaciones";

export function Home() {
  const navigate = useNavigate();
  const {
    selectInicio,
    setSelectInicio,
    handleModalNuevoServicio,
    modalNuevoServicio,
    modalNuevoServicio2,
    modalNuevoServicio3,
    modalResumen,
    modalNuevoServicio4,
    modalDomicilio,
    setSeleccion,
    modalEditarDomicilio,
    seleccionComercial,
    setSeleccionComercial,
  } = useClientes();

  const {
    conteoServicios,
    cargasHoy,
    conteoManana,
    obtenerActualizaciones,
    buscoActualizaciones,
    setBuscoActualizaciones,
    obtenerServicios,
    obtenerServiciosHoy,
    obtenerServiciosManana,
    recargoProximosViajes,
    setRecargoProximosViajes,
    modalAsignarProveedor,
    modalContenedores,
    modalEstadoViaje,
    modalTerminarViaje,
    modalCargarDevolucion,
    setPaginaLogisticaSelector,
    modalEditarViaje,
    modalReAsignarEquipos,
    modalCargarDevolucionEditar,
    modalReAsignarProveedor,
    modalModificarEstadoServicio,
    modalEditarContenedorDesdeListados,
    handleModalQr,
    modalQr,
    countTomorrow,
    obtenerServiciosdespuesdehoy,
  } = useServicios();

  const handleSeleccion = (e) => {
    e.preventDefault();
    // setSelectInicio(2);
    navigate("/coordinacion/listado-viajes-anteriores");
  };

  const handleSeleccion2 = (e) => {
    e.preventDefault();
    // setSelectInicio(3);
    navigate("/coordinacion/listado-viajes-hoy");
  };

  const handleSeleccion3 = (e) => {
    e.preventDefault();
    // setSelectInicio(4);
    navigate("/coordinacion/listado-viajes-proximos-dias");
  };

  const handleSeleccion4 = (e) => {
    e.preventDefault();
    // setSelectInicio(10);
    navigate("/coordinacion/listado-viajes-manana");
  };

  const handleViajesSinNotificar = (e) => {
    e.preventDefault();
    navigate("/inicio/listado-viajes-sin-notificar");
  };

  const handleNuevoServicio = () => {
    handleModalNuevoServicio();
  };

  useEffect(() => {
    setSeleccion(1);
    setSeleccionComercial(1);
  }, []);

  useEffect(() => {
    setSeleccionComercial(1);
  }, []);

  useEffect(() => {
    setPaginaLogisticaSelector(100);
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServicios();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServiciosManana();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServiciosdespuesdehoy();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServiciosHoy();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const actualizoNumeros = async () => {
      if (recargoProximosViajes) {
        await obtenerServicios();
        await obtenerServiciosManana();
        await obtenerServiciosdespuesdehoy();
        await obtenerServiciosHoy();
        setRecargoProximosViajes(false);
      }
    };
    actualizoNumeros();
  }, [recargoProximosViajes]);

  return (
    <>
      <div className="mt-12">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-8 grid gap-x-6 gap-y-10 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-4">
          <Card className="cursor-pointer" onClick={(e) => handleSeleccion(e)}>
            <StatisticsCard
              key="1"
              title="Sin cerrar dias anteriores"
              icon={<ChevronDoubleLeftIcon className=" h-8 w-8 " />}
              color="white"
              footer={
                <Typography className="text-center text-xl font-normal text-blue-gray-600">
                  <strong className="text-green-500">{conteoServicios}</strong>
                </Typography>
              }
            />
          </Card>
          <Card className="cursor-pointer" onClick={(e) => handleSeleccion2(e)}>
            <StatisticsCard
              key="2"
              title="Coordinados para hoy"
              icon={<CalendarDaysIcon className=" h-8 w-8" />}
              color="white"
              footer={
                <Typography className="text-center text-xl font-normal text-blue-gray-600">
                  <strong className="text-green-500">{cargasHoy}</strong>
                </Typography>
              }
            />
          </Card>
          <Card className="cursor-pointer" onClick={(e) => handleSeleccion4(e)}>
            <StatisticsCard
              key="3"
              title="Cordinados Mañana"
              icon={<ChevronDoubleRightIcon className="h-8 w-8 " />}
              color="white"
              footer={
                <Typography className="text-center text-xl font-normal text-blue-gray-600">
                  <strong className="text-green-500">{countTomorrow}</strong>
                </Typography>
              }
            />
          </Card>
          <Card className="cursor-pointer" onClick={(e) => handleSeleccion3(e)}>
            <StatisticsCard
              key="3"
              title="Proximos dias"
              icon={<ChevronDoubleRightIcon className="h-8 w-8 " />}
              color="white"
              footer={
                <Typography className="text-center text-xl font-normal text-blue-gray-600">
                  <strong className="text-green-500">{conteoManana}</strong>
                </Typography>
              }
            />
          </Card>
        </div>
        <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-2">
          <Card
            onClick={(e) => handleNuevoServicio()}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              color="white"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <PlusIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Crear Nuevo Servicio
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => handleViajesSinNotificar(e)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              color="white"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <BellAlertIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Pedidos por notificar
              </Typography>
            </CardBody>
          </Card>
        </div>
        <UltimasActualizaciones />
      </div>

      {modalNuevoServicio ? <ModalNuevoServicio /> : ""}
      {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
      {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
      {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
      {/* {modalResumen ? <ModalResumenServicio /> : ""} */}
      {modalResumen ? <ModalResumenNuevo /> : ""}
      {modalDomicilio ? <ModalNuevoDomicilio /> : ""}
      {modalAsignarProveedor ? <ModalAsignarProveedor /> : ""}
      {modalContenedores ? <ModalCargarNumeroContenedores /> : ""}
      {modalEstadoViaje ? <ModalModificarEstadoViaje /> : ""}
      {modalModificarEstadoServicio ? <ModalModificarEstadoServicio /> : ""}
      {modalTerminarViaje ? <ModalTerminarViaje /> : ""}
      {modalEditarDomicilio ? <ModalEditarDomicilio /> : ""}
      {modalEditarViaje ? <ModalEditarViaje /> : ""}
      {modalCargarDevolucion ? <ModalDevolucion /> : ""}
      {modalQr ? <Qr /> : ""}
      {modalReAsignarEquipos ? <ModalAsignarEquipoEditarViaje /> : ""}
      {modalCargarDevolucionEditar ? <ModalDevolucionMasDeUnContendor /> : ""}
      {modalEditarContenedorDesdeListados ? (
        <ModalEditarContenedorListado />
      ) : (
        ""
      )}
      {modalReAsignarProveedor ? <ModalReasignarProveedor /> : ""}

      <Cargando />
    </>
  );
}

export default Home;

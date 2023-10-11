import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Menu,
} from "@material-tailwind/react";

import {
  CalendarDaysIcon,
  FunnelIcon,
  MapIcon,
  ServerStackIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import useProveedores from "@/hooks/useProveedores";
import useAuth from "@/hooks/useAuth";

import ListadoMisVehiculos from "@/components/pagina-proveedores/ListadoMisVehiculos";

import ModalNuevoProveedor from "@/components/proveedores/ModalNuevoProveedor";
import ModalNuevoCamionProveedor from "@/components/pagina-proveedores/ModalNuevoCamionProveedor";
import useServicios from "@/hooks/useServicios";
import ListadoDeTodosLosViajes from "@/components/logistica/ListadoDeTodosLosViajes";
import ListadoDeTodosLosServicios from "@/components/logistica/ListadoDeTodosLosServicios";
import ModalFiltrarServicios from "@/components/logistica/ModalFiltrarServicios";
import Cargando from "@/components/deTodos/Cargando";
import ProfileServicio from "@/components/clientes/servicios/ProfileServicio";
import ModalFiltrarViajes from "@/components/logistica/ModalFiltrarViajes";
import useClientes from "@/hooks/useClientes";
import ModalModificarEstadoViaje from "@/components/clientes/servicios/ModalModificarEstadoViaje";
import { ToastContainer } from "react-toastify";
import Profile from "@/components/clientes/Profile";
import ListadoTodosServiciosActivos from "@/components/logistica/ListadoTodosServiciosActivos";
import ResultadoBusqueda from "@/components/inicio/ResultadoBusqueda";
import ProfileProveedor from "@/components/proveedores/ProfileProveedor";
import MenuSelect from "@/components/logistica/MenuSelect";
import ModalNuevoServicio from "@/components/clientes/servicios/ModalNuevoServicio";
import ListadoOperacionesSinCerrarDiasAnteriores from "@/components/inicio/ListadoOperacionesSinCerrarDiasAnteriores";
import ListadoOperacionesCoordinadasParaHoy from "@/components/inicio/ListadoOperacionesCoordinadasParaHoy";
import ListadoOperacionesCoordinadasParaProximosDias from "@/components/inicio/ListadoOperacionesCoordinadasParaProximosDias";
import ListadoDocumentacionPendiente from "@/components/logistica/ListadoDocumentacionPendiente";
import ModalEditarDocumento from "@/components/clientes/servicios/ModalEditarDocumento";
import ListadoOperacionesCoordinadasManana from "@/components/inicio/ListadoOperacionesCoordinadasManana";
import ModalNuevoServicio2 from "@/components/clientes/servicios/ModalNuevoServicio2";
import ModalNuevoServicio3 from "@/components/clientes/servicios/ModalNuevoServicio3";
import ModalNuevoServicio4 from "@/components/clientes/servicios/ModalNuevoServicio4";
import ModalNuevoDomicilio from "@/components/clientes/profileCliente/ModalNuevoDomicilio";
import ModalResumenNuevo from "@/components/clientes/servicios/ModalResumenNuevo";
import ModalCargarNumeroContenedores from "@/components/clientes/servicios/ModalCargarNumeroContenedores";
import { useNavigate } from "react-router-dom";
import ModalNuevoChoferProveedor from "@/components/pagina-proveedores/ModalNuevoChoferProveedor";

export function Logistica() {
  const navigate = useNavigate();
  const { modalNuevoChoferP, modalNuevoProveedor, modalNuevoCamionP } =
    useProveedores();

  const {
    paginaLogisticaSelector,
    setPaginaLogisticaSelector,
    handleModalFiltrarServicios,
    obtenerTodosServicios,
    recargoProximosViajes,
    setRecargoProximosViajes,
    modalFiltrarViajes,
    handleModalFiltrarViajes,
    modalFiltrarServicios,
    modalEstadoViaje,
    cargando,
    modalEditarDocumento,
    modalContenedores,
    modalDomicilio,
  } = useServicios();

  const {
    setSeleccion,
    setSelectInicio,
    setSeleccionComercial,
    modalNuevoServicio,
    modalNuevoServicio2,
    modalNuevoServicio3,
    modalNuevoServicio4,
    modalResumen,
  } = useClientes();

  const { auth } = useAuth();

  useEffect(() => {
    setSeleccion(1);
  }, []);

  useEffect(() => {
    setSelectInicio(1);
  }, []);

  useEffect(() => {
    setSeleccionComercial(1);
  }, []);

  const handleFinalizados = (e) => {
    e.preventDefault();
    setPaginaLogisticaSelector(1);
  };

  const handleEnCursoViajes = (e) => {
    e.preventDefault();
    setPaginaLogisticaSelector(4);
  };

  const handleEnCurso = (e) => {
    e.preventDefault();
    setPaginaLogisticaSelector(2);
  };

  const handleTodosLosViajes = (e) => {
    e.preventDefault();
    setPaginaLogisticaSelector(3);
  };

  const handleFiltrarServicios = (e) => {
    e.preventDefault();
    handleModalFiltrarServicios();
  };

  useEffect(() => {
    const obtenerServ = async () => {
      if (recargoProximosViajes) {
        await obtenerTodosServicios();
        setRecargoProximosViajes(false);
      }
    };
    obtenerServ();
  }, [recargoProximosViajes]);

  const handleFiltrarViajes = () => {
    handleModalFiltrarViajes();
  };

  return paginaLogisticaSelector == 1 ||
    paginaLogisticaSelector == 2 ||
    paginaLogisticaSelector == 4 ? (
    <>
      <div className="mt-12">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <Card
            onClick={(e) => handleEnCursoViajes(e)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              color="white"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <TruckIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Servicios en curso
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => handleFinalizados(e)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              color="white"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <ServerStackIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Servicios para facturar
              </Typography>
            </CardBody>
          </Card>
          <Card onClick={(e) => handleEnCurso(e)} className="cursor-pointer">
            <Card
              variant="gradient"
              color="white"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <CalendarDaysIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Servicios Terminados
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => handleTodosLosViajes(e)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              color="white"
              className="absolute -mt-4 grid h-10 w-10 place-items-center"
            >
              <MapIcon className="h-8 w-8" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Todos los Viajes
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
                  {paginaLogisticaSelector === 1
                    ? "Servicios para Facturar"
                    : ""}
                  {paginaLogisticaSelector === 2
                    ? "Servicios por facturar"
                    : ""}
                  {paginaLogisticaSelector === 3 ? "Viajes" : ""}
                  {paginaLogisticaSelector === 4 ? "Servicios Activos" : ""}
                </Typography>
              </div>

              <Menu placement="left-start">
                <div>
                  {paginaLogisticaSelector == 1 ? (
                    <>
                      <div className="flex justify-center">
                        <FunnelIcon
                          className="h-8 w-8 cursor-pointer"
                          onClick={(e) => handleFiltrarServicios(e)}
                        />
                      </div>
                    </>
                  ) : paginaLogisticaSelector == 2 ? (
                    <>
                      <div className="flex justify-center">
                        <FunnelIcon className="h-8 w-8" />
                      </div>
                    </>
                  ) : paginaLogisticaSelector == 3 ? (
                    <>
                      <div className="flex justify-center">
                        <FunnelIcon
                          className="h-8 w-8 cursor-pointer"
                          onClick={(e) => handleFiltrarViajes(e)}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </Menu>
            </CardHeader>
            {paginaLogisticaSelector == 1 ? (
              <ListadoDeTodosLosServicios />
            ) : paginaLogisticaSelector == 2 ? (
              <ListadoMisVehiculos />
            ) : paginaLogisticaSelector == 4 ? (
              <ListadoTodosServiciosActivos />
            ) : (
              ""
            )}
          </Card>
        </div>
        {modalNuevoProveedor ? <ModalNuevoProveedor /> : ""}
        {modalNuevoChoferP ? <ModalNuevoChoferProveedor /> : ""}
        {modalNuevoCamionP ? <ModalNuevoCamionProveedor /> : ""}
        {modalFiltrarServicios ? <ModalFiltrarServicios /> : ""}
        {modalFiltrarViajes ? <ModalFiltrarViajes /> : ""}

        {modalEstadoViaje ? <ModalModificarEstadoViaje /> : ""}
        {modalNuevoServicio ? <ModalNuevoServicio /> : ""}
        {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
        {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
        {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
        {modalContenedores ? <ModalCargarNumeroContenedores /> : ""}
        {modalResumen ? <ModalResumenNuevo /> : ""}

        {modalDomicilio ? <ModalNuevoDomicilio /> : ""}
        {modalEditarDocumento ? <ModalEditarDocumento /> : ""}
      </div>
    </>
  ) : paginaLogisticaSelector == 3 ? (
    <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-3">
        <ListadoDeTodosLosViajes />
      </Card>
    </div>
  ) : paginaLogisticaSelector == 7 ? (
    <ResultadoBusqueda />
  ) : paginaLogisticaSelector == 8 ? (
    <ProfileProveedor />
  ) : paginaLogisticaSelector == 100 ? (
    <MenuSelect />
  ) : paginaLogisticaSelector == 15 ? (
    <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-3">
        <ListadoDocumentacionPendiente />
      </Card>
    </div>
  ) : cargando ? (
    <Cargando />
  ) : (
    ""("")
  );
}

export default Logistica;

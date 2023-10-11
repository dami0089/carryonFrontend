import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ArrowLeftCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { SpinnerCircular } from "spinners-react";

import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import ModalAgregarUsuario from "../usuarios/ModalAgregarUsuario";

import ModalEditarUsuario from "../usuarios/ModalEditarUsuario";

import ModalNuevoServicio from "./servicios/ModalNuevoServicio";

import ModalNuevoServicio2 from "./servicios/ModalNuevoServicio2";

import ModalResumenServicio from "./servicios/ModalResumenServicio";

import ModalNuevoServicio3 from "./servicios/ModalNuevoServicio3";

import ModalNuevoServicio4 from "./servicios/ModalNuevoServicio4";

import InicioProfile from "./profileCliente/InicioProfile";
import DomiciliosClienteProfile from "./profileCliente/DomiciliosClienteProfile";
import ContableClienteProfile from "./profileCliente/ContableClienteProfile";
import HistorialClienteProfile from "./profileCliente/HistorialClienteProfile";
import ModalNuevoDomicilio from "./profileCliente/ModalNuevoDomicilio";
import ModalCargarNumeroContenedores from "./servicios/ModalCargarNumeroContenedores";
import ModalNuevoUsuario from "./servicios/ModalNuevoUsuario";
import Cargando from "../deTodos/Cargando";
import ModalEditarCliente from "./profileCliente/ModalEditarCliente";
import ModalNuevoServicioDesdeFicha from "./servicios/ModalNuevoServicioDesdeFicha";
import ModalEditarDomicilio from "./profileCliente/ModalEditarDomicilio";
import useProveedores from "@/hooks/useProveedores";
import ListadosUsuariosProfile from "./ListadosUsuariosProfile";

export function Profile() {
  const {
    cuitEditar,
    setSeleccion,
    setCuitEditar,
    editarCliente,
    obtenerCliente,
    setEditarCliente,
    valueProfile,
    setValueProfile,
    formaDePago,

    cargando,
    setTipo,
    setNombre,
    setCuit,
    setDomicilio,
    setEmailFactura,
    setFechaVencimiento,
    setCantidad,
    actualizoCliente,
    setActualizoCliente,
    modalDomicilio,
    modalNuevoServicioDesdeFicha,
    selectInicio,
    setSelectInicio,
    seleccion,
    handleModalEditarDomicilio,
    modalEditarDomicilio,
    seleccionComercial,
    setSeleccionComercial,
    modalAgregarUsuario,
    modalEditarCliente,
    modalEditarUsuario,
    modalNuevoServicio,
    modalNuevoServicio2,
    modalResumen,
    modalNuevoServicio3,
    modalNuevoServicio4,
  } = useClientes();

  const {
    setServiciosCliente,
    setIdClienteServicio,
    handleCargando,
    modalCargarDevolucion,
    paginaLogisticaSelector,
    setPaginaLogisticaSelector,
    enBusqueda,
    setEnbusqueda,
  } = useServicios();

  const { seleccionProveedor, setSeleccionProveedor, setCuitEditarProveedor } =
    useProveedores();

  useEffect(() => {
    handleCargando();
    const traerData = async () => {
      if (cuitEditar) {
        await obtenerCliente(cuitEditar);
        handleCargando();
      }
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (actualizoCliente) {
        await obtenerCliente(cuitEditar);
        setActualizoCliente(false);
      }
    };
    traerData();
  }, [actualizoCliente]);

  useEffect(() => {
    formaDePago;
  }, [formaDePago]);

  useEffect(() => {
    setCuitEditarProveedor("");
  }, []);

  const handleBack = (e) => {
    e.preventDefault();

    if (seleccionComercial == 3) {
      if (enBusqueda == 1) {
        setSeleccion(11);
        setEnbusqueda(0);
      } else {
        setSeleccionComercial(2);
      }
    }

    if (selectInicio == 8) {
      if (enBusqueda == 1) {
        setSelectInicio(7);
        setEnbusqueda(0);
      } else {
        setSelectInicio(5);
      }
    }

    if (paginaLogisticaSelector == 6) {
      if (enBusqueda == 1) {
        setPaginaLogisticaSelector(7);
        setEnbusqueda(0);
      } else {
        setPaginaLogisticaSelector(5);
      }
    }

    if (seleccionProveedor == 8) {
      if (enBusqueda == 1) {
        setSeleccionProveedor(7);
        setEnbusqueda(0);
      } else {
        setSeleccionProveedor(1);
      }
    }

    // setServiciosCliente([]);
    // setIdClienteServicio("");
    // setEditarCliente("");
    // setTipo("");
    // setCuitEditar("");
    // setNombre("");
    // setCuit("");
    // setDomicilio("");
    // setEmailFactura("");
    // setFechaVencimiento("");
    // setCantidad("");
    // setSeleccion(1);
    // setValueProfile(1);
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <Card className="mx-3 mt-10 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {editarCliente.nombre ? editarCliente.nombre : ""}
                </Typography>
              </div>
            </div>
            <div className="w-98 block overflow-x-auto">
              <Tabs value="app">
                <TabsHeader>
                  <Tab
                    value="app"
                    className="mr-2"
                    onClick={(e) => setValueProfile(1)}
                  >
                    <div className="flex items-center">
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      <span className="ml-2 mr-2 inline-block">Inicio</span>
                    </div>
                  </Tab>
                  <Tab
                    value="user"
                    className="mr-2"
                    onClick={(e) => setValueProfile(5)}
                  >
                    <div className="flex items-center">
                      <UserGroupIcon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                      <span className="ml-2 mr-2 inline-block">Usuarios</span>
                    </div>
                  </Tab>
                  <Tab
                    value="address"
                    className="mr-2"
                    onClick={(e) => setValueProfile(2)}
                  >
                    <div className="flex items-center">
                      <BuildingOffice2Icon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                      <span className="ml-1 inline-block">Depositos</span>
                    </div>
                  </Tab>
                  <Tab
                    value="message"
                    className="mr-2"
                    onClick={(e) => setValueProfile(3)}
                  >
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                      <span className="ml-2 mr-2 inline-block">Contable</span>
                    </div>
                  </Tab>
                  <Tab
                    value="settings"
                    className="mr-2"
                    onClick={(e) => setValueProfile(4)}
                  >
                    <div className="flex items-center">
                      <ClockIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      <span className="ml-2 mr-2 inline-block">Historial</span>
                    </div>
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {valueProfile == 1 ? (
            <>
              <InicioProfile />
            </>
          ) : valueProfile == 2 ? (
            <>
              <DomiciliosClienteProfile />
            </>
          ) : valueProfile == 3 ? (
            <>
              <ContableClienteProfile />
            </>
          ) : valueProfile == 4 ? (
            <>
              <HistorialClienteProfile />
            </>
          ) : valueProfile == 5 ? (
            <>
              <ListadosUsuariosProfile />
            </>
          ) : (
            ""
          )}
        </CardBody>
      </Card>

      {modalAgregarUsuario ? <ModalAgregarUsuario /> : ""}
      {modalEditarCliente ? <ModalEditarCliente /> : ""}
      {modalEditarUsuario ? <ModalEditarUsuario /> : ""}

      {modalNuevoServicio ? <ModalNuevoServicio /> : ""}
      {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
      {modalResumen ? <ModalResumenServicio /> : ""}
      {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
      {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
      {modalDomicilio ? <ModalNuevoDomicilio /> : ""}
      {modalNuevoServicioDesdeFicha ? <ModalNuevoServicioDesdeFicha /> : ""}

      {modalCargarDevolucion ? <ModalDevolucion /> : ""}

      {modalEditarDomicilio ? <ModalEditarDomicilio /> : ""}

      <ModalNuevoUsuario />
      <Cargando />
      <ModalCargarNumeroContenedores />
    </>
  );
}

export default Profile;

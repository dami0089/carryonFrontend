import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import {
  BackwardIcon,
  ChevronDoubleDownIcon,
  DocumentTextIcon,
  ForwardIcon,
  PlusCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import React from "react";
import ModalNuevoServicio from "../clientes/servicios/ModalNuevoServicio";
import ModalNuevoServicio2 from "../clientes/servicios/ModalNuevoServicio2";
import ModalNuevoServicio3 from "../clientes/servicios/ModalNuevoServicio3";
import ModalNuevoServicio4 from "../clientes/servicios/ModalNuevoServicio4";
import ModalResumenServicio from "../clientes/servicios/ModalResumenServicio";
import ModalNuevoDomicilio from "../clientes/profileCliente/ModalNuevoDomicilio";
import { ToastContainer } from "react-toastify";
import Cargando from "../deTodos/Cargando";
import ModalEditarDocumento from "../clientes/servicios/ModalEditarDocumento";
import ModalResumenNuevo from "../clientes/servicios/ModalResumenNuevo";
import ModalCargarNumeroContenedores from "../clientes/servicios/ModalCargarNumeroContenedores";
import ProfileServicio from "../clientes/servicios/ProfileServicio";
import Profile from "../clientes/Profile";
import { useNavigate } from "react-router-dom";

const MenuSelect = () => {
  const navigate = useNavigate();
  const {
    handleModalNuevoServicio,
    modalNuevoServicio,
    modalNuevoServicio2,
    modalNuevoServicio3,
    modalNuevoServicio4,
    modalResumen,
    modalDomicilio,
  } = useClientes();

  const {
    cargando,
    paginaLogisticaSelector,
    setPaginaLogisticaSelector,
    handleCargando,
    volverCoordinacion,
    setVolverCoordinacion,
    modalEditarDocumento,
    modalContenedores,
  } = useServicios();

  const handleNuevoServicio = () => {
    handleModalNuevoServicio();
  };

  const handleTodosServicios = () => {
    navigate("/coordinacion/listado-viajes-todos");
  };

  const handleAyer = () => {
    navigate("/coordinacion/listado-viajes-anteriores");
  };

  const handleHoy = () => {
    navigate("/coordinacion/listado-viajes-hoy");
  };

  const handleproximos = () => {
    navigate("/coordinacion/listado-viajes-proximos-dias");
  };

  const handlePendiente = () => {
    setPaginaLogisticaSelector(15);
    setVolverCoordinacion(true);
  };

  const handleManana = () => {
    navigate("/coordinacion/listado-viajes-manana");
  };

  return (
    <>
      <div className="mt-20 flex flex-wrap justify-between">
        <ToastContainer pauseOnFocusLoss={false} />

        <div
          className="w-1/3 p-2 hover:cursor-pointer"
          onClick={(e) => handleNuevoServicio()}
        >
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <PlusCircleIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Nuevo Servicio
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-1/3 p-2 hover:cursor-pointer"
          onClick={(e) => handleTodosServicios()}
        >
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <RectangleGroupIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Todos los Viajes
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-1/3 p-2 hover:cursor-pointer"
          onClick={(e) => handlePendiente()}
        >
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <DocumentTextIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Documentacion Pendiente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

      <div className="mt-5 flex flex-wrap justify-between">
        <div
          className="w-1/4 p-2 hover:cursor-pointer"
          onClick={(e) => handleAyer()}
        >
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <BackwardIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Viajes Ayer
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-2">
          <div
            className="rounded-2xl bg-white p-4 shadow-lg hover:cursor-pointer dark:bg-gray-800"
            onClick={(e) => handleHoy()}
          >
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <ChevronDoubleDownIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Viajes Hoy
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-2">
          <div
            className="rounded-2xl bg-white p-4 shadow-lg hover:cursor-pointer dark:bg-gray-800"
            onClick={(e) => handleManana()}
          >
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <ForwardIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Viajes Mañana
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-2">
          <div
            className="rounded-2xl bg-white p-4 shadow-lg hover:cursor-pointer dark:bg-gray-800"
            onClick={(e) => handleproximos()}
          >
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <ForwardIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Proximos Viajes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalNuevoServicio ? <ModalNuevoServicio /> : ""}
      {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
      {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
      {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
      {modalResumen ? <ModalResumenNuevo /> : ""}
      {modalDomicilio ? <ModalNuevoDomicilio /> : ""}
      {modalContenedores ? <ModalCargarNumeroContenedores /> : ""}
      {modalEditarDocumento ? <ModalEditarDocumento /> : ""}
      {paginaLogisticaSelector === 5 ? <ProfileServicio /> : ""}

      {cargando ? <Cargando /> : ""}
    </>
  );
};

export default MenuSelect;

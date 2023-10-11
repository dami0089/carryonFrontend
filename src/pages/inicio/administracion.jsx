import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import {
  BackwardIcon,
  BookOpenIcon,
  ChevronDoubleDownIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  ForwardIcon,
  PlusCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import Cargando from "@/components/deTodos/Cargando";
import useContable from "@/hooks/useContable";
import ModalNuevaFactura from "@/components/contable/ModalNuevaFactura";
import ModalNuevoUsuario from "@/components/clientes/servicios/ModalNuevoUsuario";
import ModalNuevoUsuarioProveedor from "@/components/proveedores/ModalNuevoUsuarioProveedor";

const Administracion = () => {
  const { handleModalNuevaFactura, modalNuevaFactura } = useContable();

  const { setSeleccionComercial, setSeleccion, setSelectInicio } =
    useClientes();

  const { cargando, setPaginaLogisticaSelector, setVolverCoordinacion } =
    useServicios();

  useEffect(() => {
    setSeleccionComercial(1);
  }, []);

  useEffect(() => {
    setSeleccion(1);
  }, []);

  useEffect(() => {
    setSelectInicio(1);
  }, []);

  const handleTodosServicios = () => {
    setPaginaLogisticaSelector(3);
  };

  const handleAyer = () => {
    setPaginaLogisticaSelector(9);
    setVolverCoordinacion(true);
  };

  const handleNuevaFactura = () => {
    handleModalNuevaFactura();
  };

  return (
    <>
      <div className="mt-20 flex flex-wrap justify-between">
        <ToastContainer pauseOnFocusLoss={false} />

        <div
          className="w-1/3 p-2 hover:cursor-pointer"
          onClick={(e) => handleNuevaFactura()}
        >
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <DocumentPlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Nueva Factura
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
                  <CurrencyDollarIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Nuevo Cobro
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-2">
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <ClockIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Pendientes de Pago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

      <div className="mt-5 flex flex-wrap justify-between">
        <div
          className="w-1/3 p-2 hover:cursor-pointer"
          onClick={(e) => handleAyer()}
        >
          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <BookOpenIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Libro Ventas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalNuevaFactura ? <ModalNuevaFactura /> : ""}
      <ModalNuevoUsuarioProveedor />
      {cargando ? <Cargando /> : ""}
    </>
  );
};

export default Administracion;

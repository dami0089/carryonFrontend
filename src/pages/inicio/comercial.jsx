import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import {
  ArchiveBoxIcon,
  BackwardIcon,
  ChevronDoubleDownIcon,
  DocumentTextIcon,
  ForwardIcon,
  ListBulletIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  QueueListIcon,
  RectangleGroupIcon,
  TruckIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardHeader } from "@material-tailwind/react";
import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import Cargando from "@/components/deTodos/Cargando";
import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente";
import ModalNuevoCliente2 from "@/components/clientes/ModalNuevoCliente2";
import ListadodeClientes from "@/components/clientes/ListadodeClientes";
import Profile from "@/components/clientes/Profile";
import useProveedores from "@/hooks/useProveedores";
import ModalNuevoProveedor from "@/components/proveedores/ModalNuevoProveedor";
import ListadoDeProveedores from "@/components/proveedores/ListadodeProveedores";
import ProfileProveedor from "@/components/proveedores/ProfileProveedor";
import ModalEditarUsuarioCliente from "@/components/clientes/ModalEditarUsuarioCliente";
import { useNavigate } from "react-router-dom";

const Comercial = () => {
  const navigate = useNavigate();
  const {
    handleModalNuevoCliente,

    modalNuevoCliente,
    modalNuevoCliente2,
    seleccionComercial,
    setSeleccionComercial,
  } = useClientes();

  useEffect(() => {
    setSeleccionComercial(1);
  }, []);

  const { handleModalNuevoProveedor, modalNuevoProveedor } = useProveedores();

  const { cargando } = useServicios();

  const handleClientes = (e) => {
    e.preventDefault();
    navigate("/clientes/listado-clientes");
  };

  const handleTransportes = (e) => {
    e.preventDefault();
    navigate("/proveedores/listado-proveedores");
  };

  return (
    <>
      {seleccionComercial == 1 ? (
        <>
          <div className="mt-10 flex flex-wrap justify-between">
            <ToastContainer pauseOnFocusLoss={false} />

            <div
              className="w-full p-2 hover:cursor-pointer md:w-1/3"
              onClick={(e) => handleModalNuevoCliente()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <UserPlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Nuevo Cliente
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-full p-2 hover:cursor-pointer md:w-1/3"
              onClick={(e) => handleClientes(e)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <ListBulletIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Listado de Clientes
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 hover:cursor-pointer md:w-1/3">
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <PencilSquareIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Liquidacion Clientes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

          <div className="mt-5 flex flex-wrap justify-between">
            <div
              className="w-full p-2 hover:cursor-pointer md:w-1/3"
              onClick={(e) => handleModalNuevoProveedor()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <TruckIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Nuevo Transporte
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 hover:cursor-pointer md:w-1/3">
              <div
                className="rounded-2xl bg-white p-4 shadow-lg hover:cursor-pointer dark:bg-gray-800"
                onClick={(e) => handleTransportes(e)}
              >
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <QueueListIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Listado Transportes
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 hover:cursor-pointer md:w-1/3">
              <div
                className="rounded-2xl bg-white p-4 shadow-lg hover:cursor-pointer dark:bg-gray-800"
                // onClick={(e) => handleproximos()}
              >
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <ArchiveBoxIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Liquidacion por Transporte
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : seleccionComercial == 7 ? (
        <ResultadoBusqueda />
      ) : (
        ""
      )}

      {modalNuevoCliente ? <ModalNuevoCliente /> : ""}
      {modalNuevoCliente2 ? <ModalNuevoCliente2 /> : ""}
      {modalNuevoProveedor ? <ModalNuevoProveedor /> : ""}
      <ModalEditarUsuarioCliente />

      {cargando ? <Cargando /> : ""}
    </>
  );
};

export default Comercial;

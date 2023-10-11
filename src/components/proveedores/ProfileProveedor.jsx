import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ArrowLeftCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UsersIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import useProveedores from "@/hooks/useProveedores";
import { useCallback, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import ModalAgregarUsuario from "../usuarios/ModalAgregarUsuario";

import ModalEditarUsuario from "../usuarios/ModalEditarUsuario";

import ModalNuevoCamion from "./ModalNuevoCamion";
import ModalNuevoChofer from "./ModalNuevoChofer";
import InicioProfileProveedor from "./profileProveedor/InicioProfileProveedor";
import ContableProveedores from "./profileProveedor/ContableProveedores";
import HistorialProfileProveedor from "./profileProveedor/HistorialProfileProveedor";
import ModalNuevoSemi from "./ModalNuevoSemi";
import ModalNuevoEquipo from "./ModalNuevoEquipo";
import ModalNuevoUsuarioProveedor from "./ModalNuevoUsuarioProveedor";
import ChoferesProfileProveedor from "./profileProveedor/vehiculos/ChoferesProfileProveedor";
import ModalEditarChofer from "./ModalEditarChofer";
import ModalEditarCamion from "./ModalEditarCamion";
import ModalEditarSemi from "./ModalEditarSemi";
import Cargando from "../deTodos/Cargando";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import ListadoUsuariosProfileProveedor from "./ListadoUsuariosProfileProveedor";

export function ProfileProveedor() {
  const {
    obtenerProveedor,
    cuitEditarProveedor,
    editarProveedor,
    setSeleccionProveedor,
    valueProfile,
    setValueProfile,
    camionesProveedor,
    obtenerCamiones,
    nombreChofer,
    obtenerChoferes,
    obtenerSemis,
    semisProveedor,
    obtenerEquipos,
    equiposData,
    handleModalEditarCamion,
    modalEditarCamion,
    modalEditarChofer,
    actualizoListadoChoferes,
    setActualizoListadoChoferes,
    actualizoListadoCamiones,
    setActualizoListadoCamiones,
    modalEditarSemi,
    actualizoListadoSemis,
    setActualizoListadoSemis,
    nuevoEquipoActualizoListado,
    setNuevoEquipoActualizoListado,
    seleccionProveedor,
  } = useProveedores();
  const {
    seleccion,
    selectInicio,
    setSelectInicio,
    setSeleccion,
    setSeleccionComercial,
    seleccionComercial,
  } = useClientes();
  const {
    enBusqueda,
    setEnbusqueda,
    paginaLogisticaSelector,
    setPaginaLogisticaSelector,
  } = useServicios();
  const [renderizo, setRenderizo] = useState(false);

  //Actualiza al crear o modificar:

  useEffect(() => {
    const obtenerData = async () => {
      if (nuevoEquipoActualizoListado) {
        await obtenerEquipos(cuitEditarProveedor);
        setNuevoEquipoActualizoListado(false);
      }
    };
    obtenerData();
  }, [nuevoEquipoActualizoListado]);

  useEffect(() => {
    const traerData = async () => {
      if (actualizoListadoChoferes) {
        await obtenerChoferes(cuitEditarProveedor);
        setActualizoListadoChoferes(false);
      }
    };

    traerData();
  }, [actualizoListadoChoferes]);

  useEffect(() => {
    const traerData = async () => {
      if (actualizoListadoCamiones) {
        await obtenerCamiones(cuitEditarProveedor);
        setActualizoListadoCamiones(false);
      }
    };

    traerData();
  }, [actualizoListadoCamiones]);

  useEffect(() => {
    const obtenerData = async () => {
      if (actualizoListadoSemis) {
        await obtenerSemis(cuitEditarProveedor);
        setActualizoListadoSemis(true);
      }
    };

    obtenerData();
  }, [actualizoListadoSemis]);

  //obtiene info al abrir el componente

  useEffect(() => {
    const traerData = async () => {
      await obtenerCamiones(cuitEditarProveedor);
    };

    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerChoferes(cuitEditarProveedor);
    };

    traerData();
    // obtenerUs(obtenerUs);
  }, []);

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerSemis(cuitEditarProveedor);
    };

    obtenerData();
  }, []);

  useEffect(() => {
    const obtenerData = async () => {
      if (cuitEditarProveedor) {
        await obtenerEquipos(cuitEditarProveedor);
      }
    };
    obtenerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (cuitEditarProveedor) {
        await obtenerProveedor(cuitEditarProveedor);
      }
    };
    traerData();
  }, [cuitEditarProveedor]);

  const handleBack = (e) => {
    e.preventDefault();

    if (seleccion == 12) {
      if (enBusqueda == 3) {
        setSeleccion(11);
        setEnbusqueda(0);
      } else {
        setSeleccion(1);
      }
    }

    if (selectInicio == 9) {
      if (enBusqueda == 3) {
        setSelectInicio(7);
        setEnbusqueda(0);
      } else {
        setSelectInicio(1);
      }
    }

    if (paginaLogisticaSelector == 8) {
      if (enBusqueda == 3) {
        setPaginaLogisticaSelector(7);
        setEnbusqueda(0);
      } else {
        setPaginaLogisticaSelector(1);
      }
    }

    if (seleccionComercial == 6) {
      if (enBusqueda == 3) {
        setSeleccionProveedor(7);
        setEnbusqueda(0);
      } else {
        setSeleccionComercial(1);
      }
    }
  };

  return (
    <>
      <>
        <ToastContainer pauseOnFocusLoss={false} />

        <Card className="mx-3 mt-8 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {editarProveedor.nombre}
                  </Typography>
                </div>
              </div>

              <div className="w-98 block overflow-x-auto">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab
                      className="mr-2"
                      value="app"
                      onClick={(e) => setValueProfile(1)}
                    >
                      <div className="flex items-center">
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        <span className="ml-1 mr-2 inline-block">Inicio</span>
                      </div>
                    </Tab>
                    <Tab
                      className="mr-2"
                      value="user"
                      onClick={(e) => setValueProfile(4)}
                    >
                      <div className="flex items-center">
                        <UserGroupIcon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                        <span className="ml-1 mr-2 inline-block">Usuarios</span>
                      </div>
                    </Tab>
                    <Tab
                      className="mr-2"
                      value="address"
                      onClick={(e) => setValueProfile(2)}
                    >
                      <div className="flex items-center">
                        <BuildingOffice2Icon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                        <span className="ml-1 mr-2 inline-block">Contable</span>
                      </div>
                    </Tab>
                    <Tab
                      className="mr-2"
                      value="message"
                      onClick={(e) => setValueProfile(3)}
                    >
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                        <span className="ml-1 mr-2 inline-block">
                          Historial
                        </span>
                      </div>
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            {valueProfile == 1 ? (
              <InicioProfileProveedor />
            ) : valueProfile == 2 ? (
              <ContableProveedores />
            ) : valueProfile == 4 ? (
              <ListadoUsuariosProfileProveedor />
            ) : valueProfile == 3 ? (
              <HistorialProfileProveedor />
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </>

      <ModalAgregarUsuario />

      <ModalEditarUsuario />
      {modalEditarCamion ? <ModalEditarCamion /> : ""}
      <ModalNuevoCamion />
      <ModalNuevoChofer />
      <ModalNuevoSemi />
      <ModalNuevoEquipo />
      <ModalNuevoUsuarioProveedor />
      <Cargando />

      {modalEditarSemi ? <ModalEditarSemi /> : ""}

      {modalEditarChofer ? <ModalEditarChofer /> : ""}
    </>
  );
}

export default ProfileProveedor;

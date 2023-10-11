import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import {
  CalculatorIcon,
  ClockIcon,
  DocumentTextIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";

import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ModalAgregarUsuario from "../../usuarios/ModalAgregarUsuario";

import ModalEditarUsuario from "../../usuarios/ModalEditarUsuario";
import ModalNuevoServicio from "./ModalNuevoServicio";
import ModalNuevoServicio2 from "./ModalNuevoServicio2";
import ModalResumenServicio from "./ModalResumenServicio";
import ModalNuevoServicio3 from "./ModalNuevoServicio3";
import ModalNuevoServicio4 from "./ModalNuevoServicio4";
import ModalAsignarProveedor from "../../proveedores/ModalAsignarProveedor";
import ModalAsignarChoferes from "../../proveedores/ModalAsignarChoferes";
import ModalNuevaMinuta from "./ModalNuevaMinuta";

import Ficha from "./Ficha";
import ProveedorProfileServicio from "./ProveedorProfileServicio";
import HistoriaServicio from "./HistoriaServicio";
import useMensajeria from "@/hooks/useMensajeria";
import ModalMensajeria from "./mensajeria/Mensajeria";
import ModalModificarEstadoServicio from "./ModalModificarEstadoServicio";
import useProveedores from "@/hooks/useProveedores";
import ModalEditarViaje from "./ModalEditarViaje";
import ModalReasignarProveedor from "./ModalReasignarProveedor";
import ModalAsignarEquipoEditarViaje from "./ModalAsignarEquipoEditarViaje";
import Cargando from "@/components/deTodos/Cargando";
import useMinutas from "@/hooks/useMinutas";
import ModalTerminarViaje from "./ModalTerminarViaje";
import ModalAgregarObservaciones from "./ModalAgregarObservaciones";
import ListadoDocumentacion from "./ListadoDocumentacion";
import ModalEditarDocumento from "./ModalEditarDocumento";
import ContableFicha from "./ContableFicha";
import ModalEditarDevolucionVacio from "./ModalEditarDevolucionVacio";
import ModalDevolucionMasDeUnContendor from "./ModalDevolucionMasDeUnContendor";
import ModalHandleValorizar from "./ModalHandleValorizar";
import ModalAgregarCampo from "./ModalAgregarCampo";
import ModalCompletarDatosFactura from "./ModalCompletarDatosFactura";

export function ProfileServicio() {
  const {
    cuitEditar,
    setSeleccion,
    obtenerCliente,
    valueProfile,
    setValueProfile,
    formaDePago,
    selectInicio,
    setSelectInicio,
    modalNuevoServicio3,
    modalNuevoServicio4,
    modalResumen,
    modalNuevoServicio2,
    modalNuevoServicio,
    modalEditarUsuario,
    modalAgregarUsuario,
    seleccion,
  } = useClientes();
  const { modalMensajeria } = useMensajeria();

  const {
    numeroPedidoObtenerServicio,
    obtenerViajesServicio,
    idObtenerServicio,

    obtenerEstadosServicios,

    obtenerEstadosViaje,

    setBuscoActualizaciones,
    volver,
    setVolver,
    handleCargando,
    seAsignoProveedor,
    modalReAsignarEquipos,
    modalReAsignarProveedor,
    modalEditarViaje,
    modalModificarEstadoServicio,
    modalAsignarChoferes,
    modalAsignarProveedor,
    modalTerminarViaje,
    modalAgregarObservaciones,
    setPaginaLogisticaSelector,
    modalEditarDocumento,
    actualizoListadoViajes,
    setActualizoListadoViajes,
    modalEditarDevolucion,
    modalCargarDevolucion,
    modalCargarDevolucionEditar,
    modalValorizar,
    modalAgragarCampo,
    actualizarEstadoServicio,
    setActualizarEstadoServicio,
    modalCamposFactura,
    enBusqueda,
    setEnbusqueda,
    paginaLogisticaSelector,
    despachoDeAduanaObtenerServicio,
    numeroCliente,
  } = useServicios();

  const { modalMinutas } = useMinutas();

  const { seleccionProveedor, setSeleccionProveedor } = useProveedores();

  useEffect(() => {
    const traerData = async () => {
      if (cuitEditar) {
        handleCargando();
        await obtenerCliente(cuitEditar);
        handleCargando();
      }
    };
    traerData();
  }, []);

  useEffect(() => {
    formaDePago;
  }, [formaDePago]);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (idObtenerServicio) {
        handleCargando();
        await obtenerViajesServicio(idObtenerServicio);
        handleCargando();
      }
    };
    obtenerViajes();
  }, [idObtenerServicio]);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (actualizoListadoViajes) {
        handleCargando();
        await obtenerViajesServicio(idObtenerServicio);
        setActualizoListadoViajes(false);
        handleCargando();
      }
    };
    obtenerViajes();
  }, [actualizoListadoViajes]);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (seAsignoProveedor) {
        await obtenerViajesServicio(idObtenerServicio);
      }
    };
    obtenerViajes();
  }, [seAsignoProveedor]);

  useEffect(() => {
    const obtenerEstados = async () => {
      await obtenerEstadosServicios();
    };
    obtenerEstados();
  }, []);

  useEffect(() => {
    const obtenerEstados = async () => {
      await obtenerEstadosViaje();
    };
    obtenerEstados();
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    if (selectInicio === 5) {
      if (enBusqueda === 2) {
        setSelectInicio(7);
        setEnbusqueda(0);
      } else {
        setSelectInicio(1);
        setValueProfile(1);
      }
    }

    if (seleccion === 10 && volver === 8) {
      setSeleccion(20);
      setVolver(0);
    } else if (seleccion === 10) {
      if (enBusqueda == 2) {
        setSeleccion(11);
        setEnbusqueda(0);
      } else {
        setValueProfile(1);
        setSeleccion(5);
        setBuscoActualizaciones(true);
      }
    }

    if (paginaLogisticaSelector == 5) {
      if (enBusqueda == 2) {
        setPaginaLogisticaSelector(7);
        setEnbusqueda(0);
      } else {
        setPaginaLogisticaSelector(1);
      }
    }

    if (seleccionProveedor == 9) {
      if (enBusqueda == 2) {
        setSeleccionProveedor(7);
        setEnbusqueda(0);
      } else {
        setSeleccionProveedor(1);
      }
    }

    if (volver === 1) {
      setSelectInicio(3);
      setVolver(0);
    }
    if (volver === 20) {
      setSelectInicio(10);
      setVolver(0);
    }
    if (volver === 2) {
      setSelectInicio(4);
      setVolver(0);
    }
    if (volver === 3) {
      setSelectInicio(2);
      setVolver(0);
    }
    if (volver === 6) {
      setPaginaLogisticaSelector(3);
      setVolver(0);
    }
    if (volver === 7) {
      setPaginaLogisticaSelector(1);
      setVolver(0);
    }
    if (volver === 8) {
      setSeleccion(20);
      setVolver(0);
    }
    if (volver === 9) {
      setPaginaLogisticaSelector(4);
      setVolver(0);
    }
    if (volver === 10) {
      setPaginaLogisticaSelector(10);
      setVolver(0);
    }
    if (volver === 11) {
      setPaginaLogisticaSelector(11);
      setVolver(0);
    }
    if (volver === 12) {
      setPaginaLogisticaSelector(12);
      setVolver(0);
    }
    if (volver === 13) {
      setPaginaLogisticaSelector(9);
      setVolver(0);
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
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-1 text-center"
                  >
                    Ficha Servicio: {numeroPedidoObtenerServicio}
                  </Typography>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <Tabs value="app">
                  <TabsHeader className="space-x-5">
                    <Tab
                      value="ficha"
                      onClick={(e) => setValueProfile(1)}
                      className="flex flex-col items-center text-lg"
                    >
                      <div>
                        <DocumentTextIcon className="mb-1 inline-block h-6 w-6" />
                      </div>
                      <div>Ficha</div>
                    </Tab>

                    <Tab
                      value="documentacion"
                      onClick={(e) => setValueProfile(5)}
                      className="flex flex-col items-center text-lg"
                    >
                      <div>
                        <PaperClipIcon className="mb-1 inline-block h-6 w-6" />
                      </div>
                      <div>Documentacion</div>
                    </Tab>
                    <Tab
                      value="contable"
                      onClick={(e) => setValueProfile(4)}
                      className="flex flex-col items-center text-lg"
                    >
                      <div>
                        <CalculatorIcon className="mb-1 inline-block h-6 w-6" />
                      </div>
                      <div>Contable</div>
                    </Tab>
                    <Tab
                      value="historial"
                      onClick={(e) => setValueProfile(6)}
                      className="flex flex-col items-center text-lg"
                    >
                      <div>
                        <ClockIcon className="mb-1 inline-block h-6 w-6" />
                      </div>
                      <div>Historial</div>
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            {valueProfile == 1 ? (
              <Ficha />
            ) : valueProfile == 2 ? (
              "Hacer seccion Cliente"
            ) : valueProfile == 3 ? (
              <ProveedorProfileServicio />
            ) : valueProfile == 4 ? (
              <ContableFicha />
            ) : valueProfile == 5 ? (
              <ListadoDocumentacion />
            ) : valueProfile == 6 ? (
              <HistoriaServicio />
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </>

      {modalAgregarUsuario ? <ModalAgregarUsuario /> : ""}

      {modalEditarUsuario ? <ModalEditarUsuario /> : ""}

      <Cargando />

      {modalNuevoServicio ? <ModalNuevoServicio /> : ""}

      {modalCargarDevolucion ? <ModalDevolucion /> : ""}

      {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}

      {modalResumen ? <ModalResumenServicio /> : ""}

      {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}

      {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}

      {modalAsignarProveedor ? <ModalAsignarProveedor /> : ""}

      {modalAsignarChoferes ? <ModalAsignarChoferes /> : ""}

      {modalMinutas ? <ModalNuevaMinuta /> : ""}

      {modalMensajeria ? <ModalMensajeria /> : ""}

      {modalModificarEstadoServicio ? <ModalModificarEstadoServicio /> : ""}

      {modalEditarViaje ? <ModalEditarViaje /> : ""}

      {modalCargarDevolucionEditar ? <ModalDevolucionMasDeUnContendor /> : ""}

      {modalReAsignarProveedor ? <ModalReasignarProveedor /> : ""}

      {modalReAsignarEquipos ? <ModalAsignarEquipoEditarViaje /> : ""}

      {modalTerminarViaje ? <ModalTerminarViaje /> : ""}
      {modalEditarDocumento ? <ModalEditarDocumento /> : ""}
      {modalAgregarObservaciones ? <ModalAgregarObservaciones /> : ""}

      {modalEditarDevolucion ? <ModalEditarDevolucionVacio /> : ""}

      {modalValorizar ? <ModalHandleValorizar /> : ""}

      {modalAgragarCampo ? <ModalAgregarCampo /> : ""}
      {modalCamposFactura ? <ModalCompletarDatosFactura /> : ""}
    </>
  );
}

export default ProfileServicio;

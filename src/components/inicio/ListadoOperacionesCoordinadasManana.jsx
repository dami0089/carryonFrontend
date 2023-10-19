import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import {
  ArrowsPointingOutIcon,
  CalendarDaysIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";
import { ToastContainer } from "react-toastify";
import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";
import Cargando from "../deTodos/Cargando";
import ModalTerminarViaje from "../clientes/servicios/ModalTerminarViaje";
import ModalFiltrarViajes from "../logistica/ModalFiltrarViajes";
import ModalNuevoProveedor from "../proveedores/ModalNuevoProveedor";
import ModalNuevoChoferProveedor from "../pagina-proveedores/ModalNuevoChoferProveedor";
import ModalNuevoCamionProveedor from "../pagina-proveedores/ModalNuevoCamionProveedor";
import ModalFiltrarServicios from "../logistica/ModalFiltrarServicios";
import ModalNuevoDomicilio from "../clientes/profileCliente/ModalNuevoDomicilio";
import ModalAsignarProveedor from "../proveedores/ModalAsignarProveedor";
import ModalCargarNumeroContenedores from "../clientes/servicios/ModalCargarNumeroContenedores";
import ModalModificarEstadoViaje from "../clientes/servicios/ModalModificarEstadoViaje";
import ModalModificarEstadoServicio from "../clientes/servicios/ModalModificarEstadoServicio";
import ModalEditarDomicilio from "../clientes/profileCliente/ModalEditarDomicilio";
import ModalEditarViaje from "../clientes/servicios/ModalEditarViaje";
import ModalEditarContenedorListado from "../clientes/servicios/ModalEditarContenedorDesdeListados";
import ModalReasignarProveedor from "../clientes/servicios/ModalReasignarProveedor";
import ModalAsignarEquipoEditarViaje from "../clientes/servicios/ModalAsignarEquipoEditarViaje";
import ModalDevolucionMasDeUnContendor from "../clientes/servicios/ModalDevolucionMasDeUnContendor";
import ModalNuevoServicio from "../clientes/servicios/ModalNuevoServicio 2";
import ModalNuevoServicio2 from "../clientes/servicios/ModalNuevoServicio2";
import ModalNuevoServicio3 from "../clientes/servicios/ModalNuevoServicio3";
import ModalNuevoServicio4 from "../clientes/servicios/ModalNuevoServicio4";
import ModalResumenNuevo from "../clientes/servicios/ModalResumenNuevo";
import { useNavigate } from "react-router-dom";

const ListadoOperacionesCoordinadasManana = () => {
  const navigate = useNavigate();
  const {
    serviciosHoy,
    handleModalAsignarProveedor,
    setIdViajeAsignarProveedor,
    setIdObtenerServicio,
    handleModalEstadoViaje,
    setEstadoCambiado,
    setBuscoActualizaciones,
    handleModalEditarContenedorDesdeListados,
    setChofer,
    notificarViajes,
    recargoProximosViajes,
    setRecargoProximosViajes,
    handleCargando,
    actualizoListadoViajes,
    setActualizoListadoViajes,
    seAsignoProveedor,
    setSeAsignoProveedor,
    handleModalEditarViaje,
    setNumeroContenedorEditar,
    setFechaCargaEditar,
    setHoraCargaEditar,
    setEstadoEditar,
    setOrigenEditar,
    setDestinoEDitar,
    setProveedorEditar,
    setChoferEditar,
    setTipoServicioViajeEditar,
    setCamionEditar,
    setNombreProveedorEditar,
    setSemiEditar,
    setClienteEditarViaje,
    setIdEditarViaje,
    setDireccionRetornoEditarViaje,
    setBuscoEnEDitarViaje,
    setCantidadEditar,
    setPesoEditar,
    setVolumenEditar,
    setTipoCargaEditar,
    setFechaDevolucionContenedor,
    setHoraDevolucionContenedor,
    setFechaVencimientoDevolucionContenedor,
    setLugarDevolucionContenedorVacio,
    actualizoListadosDespuesDeAsignar,
    setActualizoListadosDespuesDeAsignar,
    setCambiarEstado,
    setIdProveedorEditarEstadoServicio,
    handleModalModificarEstadoServicio,
    setNumeroContenedor,
    volverCoordinacion,
    setVolverCoordinacion,
    setPaginaLogisticaSelector,
    cargando,
    modalFiltrarServicios,
    handleModalFiltrarViajes,
    modalFiltrarViajes,
    modalNuevoProveedor,
    modalNuevoChoferP,
    modalNuevoCamionP,
    modalDomicilio,
    modalAsignarProveedor,
    modalContenedores,
    modalEstadoViaje,
    modalModificarEstadoServicio,
    modalTerminarViaje,
    modalEditarDomicilio,
    modalEditarViaje,
    modalCargarDevolucion,
    modalReAsignarEquipos,
    modalCargarDevolucionEditar,
    modalEditarContenedorDesdeListados,
    modalReAsignarProveedor,
    obtenerViajes,
    handleModalReasignarEquipos,
    setIdCHoferEquipo,
    setIdCamionEquipo,
    setIdSemiEquipo,
    setIdEquipoProveedor,
    handleModalReasignarProveedor,
    serviciosdespuesdehoy,
    obtenerServiciosdespuesdehoy,
    setHoraDevolucionDesde,
    setHoraDevolucionHasta,
    handleTerminarViaje,
    setAdicionales,
    setFechaTerminacion,
    setHoraTerminacion,
    setDiasDemora,
    setObservacionesViaje,
  } = useServicios();

  const {
    setSelectInicio,
    selectInicio,
    handleModalNuevoServicio,
    modalNuevoServicio,
    modalNuevoServicio2,
    modalNuevoServicio3,
    modalNuevoServicio4,
    modalResumen,
  } = useClientes();

  useEffect(() => {
    const obtenerServ = async () => {
      handleCargando();
      await obtenerServiciosdespuesdehoy();
      handleCargando();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      if (seAsignoProveedor) {
        handleCargando();
        await obtenerServiciosdespuesdehoy();
        setSeAsignoProveedor(false);
        handleCargando();
      }
    };
    obtenerServ();
  }, [seAsignoProveedor]);

  useEffect(() => {
    const obtenerServ = async () => {
      if (actualizoListadoViajes) {
        handleCargando();

        await obtenerServiciosdespuesdehoy();
        handleCargando();
        setActualizoListadoViajes(false);
      }
    };
    obtenerServ();
  }, [actualizoListadoViajes]);

  useEffect(() => {
    const obtenerServ = async () => {
      if (recargoProximosViajes) {
        await obtenerServiciosdespuesdehoy();
        setRecargoProximosViajes(false);
      }
    };
    obtenerServ();
  }, [recargoProximosViajes]);

  useEffect(() => {
    const obtenerServ = async () => {
      if (selectInicio == 4 && actualizoListadosDespuesDeAsignar) {
        handleCargando();
        await obtenerServiciosdespuesdehoy();
        setActualizoListadosDespuesDeAsignar(false);
        handleCargando();
      }
    };
    obtenerServ();
  }, [actualizoListadosDespuesDeAsignar]);

  const handleClick = async (e, servicio) => {
    e.preventDefault();
    setIdObtenerServicio(servicio);
    navigate("/coordinacion/ficha-servicio");
  };

  const handleVolverInicio = (e) => {
    e.preventDefault();
    if (volverCoordinacion) {
      setPaginaLogisticaSelector(100);
      setVolverCoordinacion(false);
    } else {
      setSelectInicio(1);
      setIdViajeAsignarProveedor("");
      setIdObtenerServicio("");
      setBuscoActualizaciones(true);
    }
  };

  const handleAsignarProveedor = (servicio, proveedor, id) => {
    setIdObtenerServicio(servicio);
    setSeAsignoProveedor(proveedor);
    setIdViajeAsignarProveedor(id);
    handleModalAsignarProveedor();
  };

  const handleSeleccion = (e) => {
    e.preventDefault();
    // if (volverCoordinacion) {
    //   setPaginaLogisticaSelector(9);
    // } else {
    //   setSelectInicio(2);
    // }
    navigate("/coordinacion/listado-viajes-anteriores");
  };

  const handleSeleccion2 = (e) => {
    e.preventDefault();
    // if (volverCoordinacion) {
    //   setPaginaLogisticaSelector(10);
    // } else {
    //   setSelectInicio(3);
    // }
    navigate("/coordinacion/listado-viajes-hoy");
  };

  const handleSeleccion3 = (e) => {
    e.preventDefault();
    // if (volverCoordinacion) {
    //   setPaginaLogisticaSelector(11);
    // } else {
    //   setSelectInicio(4);
    // }
    navigate("/coordinacion/listado-viajes-proximos-dias");
  };

  const handleNotificar = async (_id) => {
    handleCargando();
    await notificarViajes(_id);
    handleCargando();
  };

  // Función para calcular la diferencia de tiempo entre dos fechas
  const calcularDiferenciaTiempo = (hora1, hora2) => {
    const tiempo1 = new Date(`2000-01-01T${hora1}`);
    const tiempo2 = new Date(`2000-01-01T${hora2}`);
    return tiempo1 - tiempo2;
  };

  // Ordenar los servicios por la hora más próxima primero
  const serviciosOrdenados = serviciosHoy.slice().sort((a, b) => {
    const diferencia = calcularDiferenciaTiempo(a.horaOrigen, b.horaOrigen);
    return diferencia;
  });

  ///////////
  const handleCambiarEstado = (_id, estado, chofer) => {
    setEstadoCambiado(estado);
    setIdViajeAsignarProveedor(_id);
    setChofer(chofer);
    handleModalEstadoViaje();
  };

  const handleCompletarContenedor = (
    id,
    contenedor,
    fecha,
    hora,
    fechav,
    lugar,
    horaDevolucionDesde,
    horaDevolucionHasta
  ) => {
    setNumeroContenedor(contenedor);
    setIdEditarViaje(id);
    setFechaDevolucionContenedor(fecha);
    setHoraDevolucionContenedor(hora);
    setFechaVencimientoDevolucionContenedor(fechav);
    setLugarDevolucionContenedorVacio(lugar);

    setHoraDevolucionDesde(horaDevolucionDesde),
      setHoraDevolucionHasta(horaDevolucionHasta),
      handleModalEditarContenedorDesdeListados();
  };

  const handleBack = () => {
    if (volverCoordinacion) {
      setPaginaLogisticaSelector(100);
      setVolverCoordinacion(false);
    } else {
      setSelectInicio(1);
      setIdViajeAsignarProveedor("");
      setIdObtenerServicio("");
      setBuscoActualizaciones(true);
    }
  };

  const handleFiltrarViajes = () => {
    handleModalFiltrarViajes();
  };

  const handleCambiarEstadoServicio = (
    servicio,
    estadoViaje,
    proveedor,
    adicionales,
    fechaTerminacion,
    horaTerminacion,
    observacionesViaje,
    id
  ) => {
    setCambiarEstado(estadoViaje);
    setIdObtenerServicio(servicio);
    setIdProveedorEditarEstadoServicio(proveedor);
    setAdicionales(adicionales);
    setFechaTerminacion(fechaTerminacion);
    setHoraTerminacion(horaTerminacion);
    setObservacionesViaje(observacionesViaje);
    setIdEditarViaje(id);
    handleModalModificarEstadoServicio();
  };

  const handleEditarViaje = (
    _id,
    numeroContenedor,
    nombreDomicilioOrigenTerminal,
    nombreDomicilioOrigenCliente,
    nombreDomicilioDestinoCliente,
    nombreDomicilioDestinoTerminal,
    fechaOrigen,
    estado,
    proveedor,
    horaOrigen,
    nombreProveedor,
    nombreChofer,
    patenteCamion,
    patenteSemi,
    tipoServicio,
    observacionesViaje,
    pesoCarga,
    volumenCarga,
    cantidadCarga,
    tipoCarga,
    cliente,
    direccionRetorno,
    domicilioOrigenTerminal,
    domicilioOrigenCliente,
    domicilioDestinoTerminal,
    domicilioDestinoCliente,
    fechaDevolucion,
    horaDevolucion,
    fechaVencimientoDevolucion,
    lugarDevolucion
  ) => {
    if (tipoServicio === "importacion") {
      setOrigenEditar(domicilioOrigenTerminal);
      setDestinoEDitar(domicilioDestinoCliente);
    }
    if (tipoServicio === "transito-aduanero") {
      setOrigenEditar(domicilioOrigenTerminal);
      setDestinoEDitar(domicilioDestinoTerminal);
    }
    if (tipoServicio === "one-way") {
      setOrigenEditar(domicilioOrigenCliente);
      setDestinoEDitar(domicilioDestinoTerminal);
    }
    if (tipoServicio === "round-trip") {
      setOrigenEditar(domicilioOrigenCliente);
      setDestinoEDitar(domicilioDestinoTerminal);
    }
    if (tipoServicio === "nacional") {
      setOrigenEditar(domicilioOrigenCliente);
      setDestinoEDitar(domicilioDestinoCliente);
    }
    if (tipoServicio === "vacios") {
      setOrigenEditar(domicilioOrigenCliente);
      setDestinoEDitar(domicilioDestinoTerminal);
    }
    if (tipoServicio === "empty-pick") {
      setOrigenEditar(domicilioOrigenCliente);
      setDestinoEDitar(domicilioDestinoCliente);
    }
    setNumeroContenedorEditar(numeroContenedor),
      setFechaCargaEditar(fechaOrigen);
    setProveedorEditar(proveedor);
    setEstadoEditar(estado);
    setHoraCargaEditar(horaOrigen);
    setNombreProveedorEditar(nombreProveedor);
    setChoferEditar(nombreChofer), setCamionEditar(patenteCamion);
    setSemiEditar(patenteSemi);
    setClienteEditarViaje(cliente);
    setTipoServicioViajeEditar(tipoServicio);
    setIdEditarViaje(_id);
    setDireccionRetornoEditarViaje(direccionRetorno);
    setObservacionesViaje(observacionesViaje);
    setTipoCargaEditar(tipoCarga);
    if (
      tipoCarga === "cajas" ||
      tipoCarga === "bultos" ||
      tipoCarga === "pallets"
    ) {
      setVolumenEditar(volumenCarga);
      setCantidadEditar(cantidadCarga);
    }
    setPesoEditar(pesoCarga);
    setFechaDevolucionContenedor(fechaDevolucion),
      setHoraDevolucionContenedor(horaDevolucion),
      setFechaVencimientoDevolucionContenedor(fechaVencimientoDevolucion),
      setLugarDevolucionContenedorVacio(lugarDevolucion),
      setBuscoEnEDitarViaje(true);
    handleModalEditarViaje();
  };

  const handleEquipos = (e, _id, proveedor, idEquipo, chofer, camion, semi) => {
    e.preventDefault();
    setIdEditarViaje(_id);
    setProveedorEditar(proveedor);
    setIdEquipoProveedor(idEquipo);
    setIdCHoferEquipo(chofer);
    setIdCamionEquipo(camion);
    setIdSemiEquipo(semi);
    handleModalReasignarEquipos();
  };

  const handleReasignar = (e, proveedor, _id) => {
    e.preventDefault();
    setIdEditarViaje(_id);
    setProveedorEditar(proveedor);
    handleModalReasignarProveedor();
  };

  const handleCompletarData = async (
    viaje,
    adicionales,
    fechaTerminacion,
    horaTerminacion,
    diasDemora,
    observacionesViaje
  ) => {
    setIdEditarViaje(viaje);
    setAdicionales(adicionales);
    setFechaTerminacion(fechaTerminacion);
    setHoraTerminacion(horaTerminacion);
    setDiasDemora(diasDemora);
    setObservacionesViaje(observacionesViaje);
    handleTerminarViaje();
  };

  const handleNuevoServicio = (e) => {
    handleModalNuevoServicio();
  };

  const handleManana = (e) => {
    e.preventDefault();
    // setSelectInicio(10);
    navigate("/coordinacion/listado-viajes-manana");
  };

  const handleClickGoogleMaps = (direccion) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${direccion} `;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="mt-10">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-5 ml-3 mr-3 text-center md:text-left">
          <Typography className="font-bold uppercase">
            Coordinados para Mañana
          </Typography>
        </div>
        <>
          <div className="mb-8 ml-3 mr-3 flex flex-row gap-x-6 gap-y-10 md:grid md:flex-none md:grid-cols-2 xl:grid-cols-5">
            {/* Nuevo Servicio */}
            <div
              className="hidden cursor-pointer p-2 md:block"
              onClick={(e) => handleNuevoServicio(e)}
            >
              <Card>
                <StatisticsCard
                  key="1"
                  title="Nuevo Servicio"
                  icon={<PlusCircleIcon className=" h-8 w-8 " />}
                  color="white"
                />
              </Card>
            </div>
            <div
              className="flex-1 cursor-pointer p-2 md:hidden"
              onClick={(e) => handleNuevoServicio(e)}
            >
              <PlusCircleIcon className="mx-auto h-6 w-6" />
            </div>

            {/* Días anteriores */}
            <div
              className="hidden cursor-pointer p-2 md:block"
              onClick={(e) => handleSeleccion(e)}
            >
              <Card>
                <StatisticsCard
                  key="1"
                  title="Dias anteriores"
                  icon={<ChevronDoubleLeftIcon className=" h-8 w-8 " />}
                  color="white"
                />
              </Card>
            </div>
            <div
              className="flex-1 cursor-pointer p-2 md:hidden"
              onClick={(e) => handleSeleccion(e)}
            >
              <ChevronDoubleLeftIcon className="mx-auto h-6 w-6 " />
            </div>

            {/* Coordinados hoy */}
            <div
              className="hidden cursor-pointer p-2 md:block"
              onClick={(e) => handleSeleccion2(e)}
            >
              <Card>
                <StatisticsCard
                  key="2"
                  title="Coordinados hoy"
                  icon={<CalendarDaysIcon className=" h-8 w-8" />}
                  color="white"
                />
              </Card>
            </div>
            <div
              className="flex-1 cursor-pointer p-2 md:hidden"
              onClick={(e) => handleSeleccion2(e)}
            >
              <CalendarDaysIcon className="mx-auto h-6 w-6" />
            </div>

            {/* Coordinados Mañana */}
            <div
              className="hidden cursor-pointer p-2 md:block"
              onClick={(e) => handleManana(e)}
            >
              <Card>
                <StatisticsCard
                  key="3"
                  title="Coordinados Mañana"
                  icon={<ChevronDoubleRightIcon className="h-8 w-8 " />}
                  color="blue"
                />
              </Card>
            </div>
            <div
              className="flex-1 cursor-pointer p-2 md:hidden"
              onClick={(e) => handleManana(e)}
            >
              <ChevronDoubleRightIcon className="mx-auto h-6 w-6 text-blue-300" />
            </div>

            {/* Próximos Viajes */}
            <div
              className="hidden cursor-pointer p-2 md:block"
              onClick={(e) => handleSeleccion3(e)}
            >
              <Card>
                <StatisticsCard
                  key="3"
                  title="Proximos Viajes"
                  icon={<ChevronDoubleRightIcon className="h-8 w-8 " />}
                  color="white"
                />
              </Card>
            </div>
            <div
              className="flex-1 cursor-pointer p-2 md:hidden"
              onClick={(e) => handleSeleccion3(e)}
            >
              <ChevronDoubleRightIcon className="mx-auto h-6 w-6 " />
            </div>
          </div>
        </>
        {serviciosdespuesdehoy.length > 0 ? (
          <div className="mb-4  grid grid-cols-1 gap-6  xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3">
              <CardBody className=" overflow-x-scroll px-0 pb-2 pt-0">
                <div className="max-h-[78vh] overflow-y-auto">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead className="sticky top-0 bg-blue-gray-50">
                      <tr>
                        {[
                          "Nro Viaje",
                          "Fecha y Hora Carga",
                          "Tipo Servicio",
                          "Cliente",
                          "Nro Contenedor",
                          "Tipo-Carga/Cantidad/ Peso/Volumen",
                          "Observaciones Servicio",
                          "Domicilio Origen",
                          "Domicilio Destino",
                          "Proveedor",
                          "Chofer/Camion/Semi",
                          "Estado Servicio",
                          "Estado Viaje",
                          "Adicionales",
                          "Fecha de Terminacion",
                          "Hora Terminacion",
                          "Observaciones Viaje",

                          "Accion",
                        ].map((el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 px-6 py-3  text-center"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {serviciosdespuesdehoy // Filtrar proveedores con estado distinto a "Terminado"
                        .map(
                          (
                            {
                              _id,
                              estadoServicio,
                              numeroDeViaje,
                              fechaOrigen,
                              horaOrigen,
                              tipoServicio,
                              nombreCliente,
                              numeroContenedor,

                              tipoCarga,
                              cantidadCarga,
                              pesoCarga,
                              volumenCarga,
                              nombreDomicilioOrigenCliente,
                              nombreDomicilioOrigenTerminal,
                              nombreDomicilioDestinoCliente,
                              nombreDomicilioDestinoTerminal,
                              nombreProveedor,
                              nombreChofer,
                              patenteSemi,
                              patenteCamion,
                              adicionales,
                              fechaTerminacion,
                              horaTerminacion,
                              diasDemora,
                              estado,
                              observacionesServicio,
                              observacionesViaje,
                              servicio,
                              notificado,
                              proveedor,
                              fantasiaOrigen,
                              fantasiaDestino,
                              chofer,
                              fechaDevolucion,
                              horaDevolucion,
                              fechaVencimientoDevolucion,
                              lugarDevolucion,
                              cliente,
                              direccionRetorno,
                              domicilioOrigenTerminal,
                              domicilioOrigenCliente,
                              domicilioDestinoTerminal,
                              domicilioDestinoCliente,
                              camion,
                              semi,
                              idEquipo,
                              horaDevolucionDesde,
                              horaDevolucionHasta,
                            },
                            key
                          ) => {
                            const className = `text-center py-3 px-5  ${
                              key === projectsTableData.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                            return (
                              <tr key={_id}>
                                <td className={className}>
                                  <Button
                                    color="blue"
                                    className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap ${
                                      estadoServicio === "Coordinado"
                                        ? "bg-green-300"
                                        : "bg-deep-orange-300"
                                    }  px-4 py-1 `}
                                    fullWidth
                                    onClick={(e) => handleClick(e, servicio)}
                                  >
                                    <Typography
                                      variant="small"
                                      className="flex items-center justify-between text-sm font-medium capitalize"
                                    >
                                      <span className="mr-1 text-black ">
                                        {numeroDeViaje}
                                      </span>
                                      <div className="h-4 w-4 text-black">
                                        <ChevronRightIcon />
                                      </div>
                                    </Typography>
                                  </Button>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center gap-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="w-40 text-center text-xs font-medium"
                                    >
                                      {formateoFechaCorto(fechaOrigen)}
                                      <br />
                                      <strong>{horaOrigen} Hs</strong>
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium uppercase text-blue-gray-600"
                                  >
                                    {tipoServicio}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="w-40 text-xs font-black uppercase text-blue-gray-600"
                                  >
                                    {nombreCliente}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`${
                                        fechaVencimientoDevolucion
                                          ? lugarDevolucion
                                            ? "bg-green-300"
                                            : "bg-red-200"
                                          : "bg-red-200"
                                      } min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap  px-4 py-1 text-black shadow-gray-300`}
                                      fullWidth
                                      onClick={(e) =>
                                        handleCompletarContenedor(
                                          _id,
                                          numeroContenedor,
                                          fechaDevolucion,
                                          horaDevolucion,
                                          fechaVencimientoDevolucion,
                                          lugarDevolucion,
                                          horaDevolucionDesde,
                                          horaDevolucionHasta
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize"
                                        onClick={(e) =>
                                          handleCompletarContenedor(
                                            _id,
                                            numeroContenedor,
                                            fechaDevolucion,
                                            horaDevolucion,
                                            fechaVencimientoDevolucion,
                                            lugarDevolucion,
                                            horaDevolucionDesde,
                                            horaDevolucionHasta
                                          )
                                        }
                                      >
                                        <span className="mr-1">
                                          {numeroContenedor != 0
                                            ? numeroContenedor
                                            : "Ingresar"}
                                        </span>
                                        <div className="h-4 w-4">
                                          <ChevronDownIcon />
                                        </div>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className=" w-40 text-xs font-medium uppercase text-blue-gray-600"
                                  >
                                    {tipoCarga === "Contenedor20"
                                      ? "Contenedor 20"
                                      : ""}
                                    {tipoCarga === "Contenedor40"
                                      ? "Contenedor 40"
                                      : ""}
                                    {tipoCarga === "Contenedor40HC"
                                      ? "Contenedor 40 HC"
                                      : ""}
                                    {tipoCarga !== "Contenedor20"
                                      ? tipoCarga !== "Contendor40"
                                        ? tipoCarga !== "Contenedor40HC"
                                          ? tipoCarga
                                          : ""
                                        : ""
                                      : ""}
                                    /
                                    {tipoCarga === "Contenedor20" ||
                                    tipoCarga === "Contenedor40" ||
                                    tipoCarga === "Contenedor40HC"
                                      ? "-"
                                      : cantidadCarga}
                                    /{pesoCarga}Kg /
                                    {volumenCarga === "" ? "-" : volumenCarga}
                                  </Typography>
                                </td>
                                {/* <td className={className}>
                            <Typography
                              variant="small"
                              className="text-center text-xs font-medium text-blue-gray-600"
                            >
                              {tipoCarga === "Contenedor20" ||
                              tipoCarga === "Contenedor40" ||
                              tipoCarga === "Contenedor40HC"
                                ? "-"
                                : cantidadCarga}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {pesoCarga} Kg
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-center text-xs font-medium text-blue-gray-600"
                            >
                              {volumenCarga === "" ? "-" : volumenCarga}
                            </Typography>
                          </td> */}
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-bold uppercase text-red-600"
                                  >
                                    {observacionesServicio === ""
                                      ? "-"
                                      : observacionesServicio}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="word-wrap break-word w-40 overflow-hidden text-xs font-medium text-blue-gray-600 hover:cursor-pointer"
                                    onClick={(e) =>
                                      handleClickGoogleMaps(
                                        tipoServicio === "importacion"
                                          ? fantasiaOrigen +
                                              " " +
                                              nombreDomicilioOrigenTerminal
                                          : tipoServicio === "nacional"
                                          ? fantasiaOrigen +
                                            " " +
                                            nombreDomicilioOrigenCliente
                                          : tipoServicio === "one-way"
                                          ? fantasiaOrigen +
                                            " " +
                                            nombreDomicilioOrigenCliente
                                          : tipoServicio === "transito-aduanero"
                                          ? fantasiaOrigen +
                                            " " +
                                            nombreDomicilioOrigenCliente
                                          : tipoServicio === "vacios"
                                          ? fantasiaOrigen +
                                            " " +
                                            nombreDomicilioOrigenCliente
                                          : tipoServicio === "round-trip"
                                          ? fantasiaOrigen +
                                            " " +
                                            nombreDomicilioOrigenCliente
                                          : ""
                                      )
                                    }
                                    title={
                                      tipoServicio === "importacion"
                                        ? nombreDomicilioOrigenTerminal
                                        : tipoServicio === "nacional"
                                        ? nombreDomicilioOrigenCliente
                                        : tipoServicio === "one-way"
                                        ? nombreDomicilioOrigenCliente
                                        : tipoServicio === "transito-aduanero"
                                        ? nombreDomicilioOrigenCliente
                                        : tipoServicio === "vacios"
                                        ? nombreDomicilioOrigenCliente
                                        : tipoServicio === "round-trip"
                                        ? nombreDomicilioOrigenCliente
                                        : ""
                                    }
                                  >
                                    {tipoServicio === "importacion"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenTerminal
                                      : tipoServicio === "nacional"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenCliente
                                      : tipoServicio === "one-way"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenCliente
                                      : tipoServicio === "transito-aduanero"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenCliente
                                      : tipoServicio === "vacios"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenCliente
                                      : tipoServicio === "importacion"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenTerminal
                                      : tipoServicio === "round-trip"
                                      ? fantasiaOrigen ??
                                        nombreDomicilioOrigenTerminal
                                      : ""}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="word-wrap break-word w-40 overflow-hidden text-xs font-medium text-blue-gray-600 hover:cursor-pointer"
                                    onClick={(e) =>
                                      handleClickGoogleMaps(
                                        tipoServicio === "importacion"
                                          ? fantasiaDestino +
                                              " " +
                                              nombreDomicilioDestinoCliente
                                          : tipoServicio === "nacional"
                                          ? fantasiaDestino +
                                            " " +
                                            nombreDomicilioDestinoCliente
                                          : tipoServicio === "one-way"
                                          ? fantasiaDestino +
                                            " " +
                                            nombreDomicilioDestinoTerminal
                                          : tipoServicio === "transito-aduanero"
                                          ? fantasiaDestino +
                                            " " +
                                            nombreDomicilioDestinoTerminal
                                          : tipoServicio === "vacios"
                                          ? fantasiaDestino +
                                            " " +
                                            nombreDomicilioDestinoTerminal
                                          : tipoServicio === "round-trip"
                                          ? fantasiaDestino +
                                            " " +
                                            nombreDomicilioDestinoTerminal
                                          : ""
                                      )
                                    }
                                    title={
                                      tipoServicio === "importacion"
                                        ? nombreDomicilioDestinoCliente
                                        : tipoServicio === "nacional"
                                        ? nombreDomicilioDestinoCliente
                                        : tipoServicio === "one-way"
                                        ? nombreDomicilioDestinoTerminal
                                        : tipoServicio === "transito-aduanero"
                                        ? nombreDomicilioDestinoTerminal
                                        : tipoServicio === "vacios"
                                        ? nombreDomicilioDestinoTerminal
                                        : tipoServicio === "round-trip"
                                        ? nombreDomicilioDestinoTerminal
                                        : ""
                                    }
                                  >
                                    {tipoServicio === "importacion"
                                      ? fantasiaDestino ??
                                        nombreDomicilioDestinoCliente
                                      : tipoServicio === "nacional"
                                      ? fantasiaDestino ??
                                        nombreDomicilioDestinoCliente
                                      : tipoServicio === "one-way"
                                      ? fantasiaDestino ??
                                        nombreDomicilioDestinoTerminal
                                      : tipoServicio === "transito-aduanero"
                                      ? fantasiaDestino ??
                                        nombreDomicilioDestinoTerminal
                                      : tipoServicio === "vacios"
                                      ? fantasiaDestino ??
                                        nombreDomicilioDestinoTerminal
                                      : tipoServicio === "round-trip"
                                      ? fantasiaDestino ??
                                        nombreDomicilioDestinoTerminal
                                      : ""}
                                  </Typography>
                                  {/* </Button> */}
                                </td>
                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1`}
                                      onClick={(e) =>
                                        handleReasignar(e, proveedor, _id)
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize text-black"
                                      >
                                        <span className="mr-1">
                                          {nombreProveedor
                                            ? nombreProveedor
                                            : "Asignar Proveedor"}
                                        </span>
                                        <div className="h-4 w-4">
                                          <ChevronDownIcon />
                                        </div>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>
                                <td className={className}>
                                  {proveedor != "" ? (
                                    <div className="rounded-xl p-1 text-center">
                                      <Button
                                        className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1`}
                                        onClick={(e) =>
                                          handleEquipos(
                                            e,
                                            _id,
                                            proveedor,
                                            idEquipo,
                                            chofer,
                                            camion,
                                            semi
                                          )
                                        }
                                      >
                                        <Typography
                                          variant="small"
                                          className="flex items-center justify-between text-sm font-medium capitalize text-black"
                                        >
                                          <span className="mr-1">
                                            {nombreChofer
                                              ? `${nombreChofer} / ${patenteCamion.toUpperCase()} ${
                                                  patenteSemi
                                                    ? "/" +
                                                      patenteSemi.toUpperCase()
                                                    : ""
                                                }`
                                              : "Asignar Equipo"}
                                          </span>
                                          <div className="h-4 w-4">
                                            <ChevronDownIcon />
                                          </div>
                                        </Typography>
                                      </Button>
                                    </div>
                                  ) : (
                                    "-"
                                  )}
                                </td>

                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap ${
                                        estadoServicio == "Aceptado"
                                          ? "bg-deep-orange-300"
                                          : ""
                                      } ${
                                        estadoServicio == "Coordinado"
                                          ? "bg-green-400 text-black"
                                          : ""
                                      } ${
                                        estadoServicio == "Por Facturar"
                                          ? "bg-blue-300"
                                          : ""
                                      } ${
                                        estadoServicio == "Terminado"
                                          ? "bg-blue-gray-500 text-black"
                                          : ""
                                      } px-4 py-1`}
                                      fullWidth
                                      onClick={(e) =>
                                        handleCambiarEstadoServicio(
                                          servicio,
                                          estadoServicio,
                                          proveedor,
                                          adicionales,
                                          fechaTerminacion,
                                          horaTerminacion,
                                          observacionesViaje,
                                          _id
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize"
                                      >
                                        <span className="mr-1">
                                          {estadoServicio}
                                        </span>
                                        <div className="h-4 w-4">
                                          <ChevronDownIcon />
                                        </div>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap ${
                                        estado == "Por Asignar"
                                          ? "bg-red-300"
                                          : ""
                                      } ${
                                        estado == "Asignado"
                                          ? "bg-yellow-300 text-black"
                                          : ""
                                      } ${
                                        estado == "Cargando"
                                          ? "bg-blue-100 text-black"
                                          : ""
                                      }
                                  ${estado == "Transito" ? "bg-blue-300" : ""}
                                  ${
                                    estado == "Descargando" ? "bg-blue-500" : ""
                                  }
                                  ${
                                    estado == "Devolviendo Vacio"
                                      ? "bg-orange-300"
                                      : ""
                                  } ${
                                        estado == "Terminado"
                                          ? "bg-green-300 "
                                          : ""
                                      } px-4 py-1`}
                                      fullWidth
                                      onClick={(e) =>
                                        handleCambiarEstado(_id, estado, chofer)
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize"
                                      >
                                        <span className="mr-1">{estado}</span>
                                        <div className="h-4 w-4">
                                          <ChevronDownIcon />
                                        </div>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1`}
                                      onClick={(e) =>
                                        handleCompletarData(
                                          _id,
                                          adicionales,
                                          fechaTerminacion,
                                          horaTerminacion,
                                          diasDemora,
                                          observacionesViaje
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize text-black"
                                      >
                                        <span className="mr-1 uppercase">
                                          {adicionales ? (
                                            adicionales === "Vacio" ? (
                                              "Vacio al dia siguiente"
                                            ) : (
                                              adicionales
                                            )
                                          ) : (
                                            <ArrowsPointingOutIcon className="h-4 w-4" />
                                          )}
                                        </span>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1`}
                                      onClick={(e) =>
                                        handleCompletarData(
                                          _id,
                                          adicionales,
                                          fechaTerminacion,
                                          horaTerminacion,
                                          diasDemora,
                                          observacionesViaje
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize text-black"
                                      >
                                        <span className="mr-1">
                                          {fechaTerminacion ? (
                                            fechaTerminacion
                                          ) : (
                                            <ArrowsPointingOutIcon className="h-4 w-4" />
                                          )}
                                        </span>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1`}
                                      onClick={(e) =>
                                        handleCompletarData(
                                          _id,
                                          adicionales,
                                          fechaTerminacion,
                                          horaTerminacion,
                                          diasDemora,
                                          observacionesViaje
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize text-black"
                                      >
                                        <span className="mr-1">
                                          {horaTerminacion ? (
                                            horaTerminacion
                                          ) : (
                                            <ArrowsPointingOutIcon className="h-4 w-4" />
                                          )}
                                        </span>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="rounded-xl p-1 text-center">
                                    <Button
                                      className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1`}
                                      onClick={(e) =>
                                        handleCompletarData(
                                          _id,
                                          adicionales,
                                          fechaTerminacion,
                                          horaTerminacion,
                                          diasDemora,
                                          observacionesViaje
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="small"
                                        className="flex items-center justify-between text-sm font-medium capitalize text-black"
                                      >
                                        <span className="mr-1">
                                          {observacionesViaje ? (
                                            observacionesViaje
                                          ) : (
                                            <ArrowsPointingOutIcon className="h-4 w-4" />
                                          )}
                                        </span>
                                      </Typography>
                                    </Button>
                                  </div>
                                </td>

                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="mx-2 flex text-xs font-medium text-blue-gray-600"
                                  >
                                    <Button
                                      color="blue"
                                      className="mx-1 items-center gap-4 px-6 capitalize"
                                      fullWidth
                                      onClick={(e) =>
                                        handleEditarViaje(
                                          _id,
                                          numeroContenedor,
                                          nombreDomicilioOrigenTerminal,
                                          nombreDomicilioOrigenCliente,
                                          nombreDomicilioDestinoCliente,
                                          nombreDomicilioDestinoTerminal,
                                          fechaOrigen,
                                          estado,
                                          proveedor,
                                          horaOrigen,
                                          nombreProveedor,
                                          nombreChofer,
                                          patenteCamion,
                                          patenteSemi,
                                          tipoServicio,
                                          observacionesViaje,
                                          pesoCarga,
                                          volumenCarga,
                                          cantidadCarga,
                                          tipoCarga,
                                          cliente,
                                          direccionRetorno,
                                          domicilioOrigenTerminal,
                                          domicilioOrigenCliente,
                                          domicilioDestinoTerminal,
                                          domicilioDestinoCliente,
                                          fechaDevolucion,
                                          horaDevolucion,
                                          fechaVencimientoDevolucion,
                                          lugarDevolucion
                                        )
                                      }
                                    >
                                      <Typography
                                        color="inherit"
                                        className="font-medium capitalize"
                                      >
                                        Editar
                                      </Typography>
                                    </Button>
                                  </Typography>
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="text-center">No tiene viajes coordinados</div>
        )}

        {cargando ? <Cargando /> : ""}
        {modalFiltrarViajes ? <ModalFiltrarViajes /> : ""}
        {modalNuevoProveedor ? <ModalNuevoProveedor /> : ""}
        {modalNuevoChoferP ? <ModalNuevoChoferProveedor /> : ""}
        {modalNuevoCamionP ? <ModalNuevoCamionProveedor /> : ""}
        {modalFiltrarServicios ? <ModalFiltrarServicios /> : ""}
        {modalDomicilio ? <ModalNuevoDomicilio /> : ""}
        {modalAsignarProveedor ? <ModalAsignarProveedor /> : ""}
        {modalContenedores ? <ModalCargarNumeroContenedores /> : ""}
        {modalEstadoViaje ? <ModalModificarEstadoViaje /> : ""}
        {modalModificarEstadoServicio ? <ModalModificarEstadoServicio /> : ""}
        {modalTerminarViaje ? <ModalTerminarViaje /> : ""}
        {modalEditarDomicilio ? <ModalEditarDomicilio /> : ""}
        {modalEditarViaje ? <ModalEditarViaje /> : ""}
        {modalCargarDevolucion ? <ModalDevolucion /> : ""}
        {modalReAsignarEquipos ? <ModalAsignarEquipoEditarViaje /> : ""}
        {modalCargarDevolucionEditar ? <ModalDevolucionMasDeUnContendor /> : ""}
        {modalNuevoServicio ? <ModalNuevoServicio /> : ""}
        {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
        {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
        {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
        {modalResumen ? <ModalResumenNuevo /> : ""}
        {modalEditarContenedorDesdeListados ? (
          <ModalEditarContenedorListado />
        ) : (
          ""
        )}
        {modalReAsignarProveedor ? <ModalReasignarProveedor /> : ""}
      </div>
    </>
  );
};

export default ListadoOperacionesCoordinadasManana;

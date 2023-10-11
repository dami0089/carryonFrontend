import React, { useEffect } from "react";
import { useState, createContext } from "react";
import clienteAxios from "@/configs/clinteAxios";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ServiciosContext = createContext();

const ServiciosProvider = ({ children }) => {
  const [modalResumen, setModalResumen] = useState(false);
  const [modalAsignarProveedor, setModalAsignarProveedor] = useState(false);
  const [seActualizaConceptos, setSeActualizaConceptos] = useState(false);
  const [modalAsignarChoferes, setModalAsignarChoferes] = useState(false);
  //Variables viejas
  const [ordenClienteServicio, setOrdenClienteServicio] = useState("");
  const [domicilioEntregaServicio, setDomicilioEntregaServicio] = useState("");
  const [cantidadCamionesServicio, setCantidadCamionesServicio] = useState("");
  const [terminalServicio, setTerminalServicio] = useState("");
  const [proveedorServicio, setProveedorServicio] = useState("");
  const [nroOrden, setNroOrden] = useState("");
  const [clienteNombreResumen, setClienteNombreResumen] = useState("");
  const [proveedorNombreResumen, setNombreProveedorResumen] = useState("");

  //Variables Nuevas
  const [
    actualizoListadosDespuesDeAsignar,
    setActualizoListadosDespuesDeAsignar,
  ] = useState(false);
  const [numeroContenedor, setNumeroContenedor] = useState("");

  const [idClienteServicio, setIdClienteServicio] = useState("");
  const [fechaDeCarga, setFechadeCarga] = useState("");
  const [horaDeCarga, setHoraDeCarga] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [tipoDeCarga, setTipoDeCarga] = useState("");
  const [cantidadCarga, setCantidadCarga] = useState("");
  const [pesoCarga, setPesoCarga] = useState("");
  const [volumenCarga, setVolumenCarga] = useState("");
  const [tipoCargaEditar, setTipoCargaEditar] = useState("");
  const [playaOrigen, setPlayaOrigen] = useState("");
  const [origenCarga, setOrigenCarga] = useState("");
  const [destinoCarga, setDestinoCarga] = useState("");
  const [observacionesCarga, setObservacionesCarga] = useState("");
  const [nroInternoCliente, setNroInternoCliente] = useState("");
  const [despachoDeAduana, setDespachoDeAduana] = useState("");
  const [numeroDeContenedores, setNumeroDeContenedores] = useState([]);
  const [otrosServicio, setOtrosServicio] = useState("");
  const [serviciosCliente, setServiciosCliente] = useState([]);
  const [idServicio, setIdServicio] = useState("");
  const [servicioCliente, setServicioCliente] = useState([]);
  const [camionesObtenerServicio, setCamionesObtenerServicio] = useState("");
  const [clienteObtenerServicio, setClienteObtenerServicio] = useState("");
  const [despachoDeAduanaObtenerServicio, setDespachoDeAduanaObtenerServicio] =
    useState("");
  const [destinoCargaObtenerServicio, setDestinoDeCargaObtenerServicio] =
    useState("");
  const [fechaCargaObtenerServicio, setFechaCargaObtenerServicio] =
    useState("");
  const [horaCargaObtenerServicio, setHoraCargaObtenerServicio] = useState("");
  const [nombreChoferObtenerServicio, setNombreChoferObtenerServicio] =
    useState("");
  const [nombreClienteObtenerServicio, setNombreClienteObtenerServicio] =
    useState("");
  const [
    numeroContenedoresObtenerServicio,
    setNumeroDeContenedoresObtenerServicio,
  ] = useState([]);
  const [numeroPedidoObtenerServicio, setNumeroPedidoObtenerServicio] =
    useState("");
  const [observacionesObtenerServicio, setObservacionesObtenerServicio] =
    useState("");
  const [origenCargaObtenerServicio, setOrigenCargaObtenerServicio] =
    useState("");
  const [pesoObtenerServicio, setPesoObtenerServicio] = useState("");
  const [proveedorObtenerServicio, setProveedorObtenerServicio] = useState("");
  const [tipoCargaObtenerServicio, setTipoCargaObtenerServicio] = useState("");
  const [tipoOperacionObtenerServicio, setTipoOperacionObtenerServicio] =
    useState("");
  const [volumenObtenerServicio, setVolumenObtenerServicio] = useState("");
  const [idObtenerServicio, setIdObtenerServicio] = useState("");
  const [idAsignarProveedor, setIdAsignarProveedor] = useState("");
  const [estadoObtenerServicio, setEstadoObtenerServicio] = useState("");
  const [nombreProveedorObtenerServicio, setnombreProveedorObtenerServicio] =
    useState("");

  const [cantidadModales, setCantidadModales] = useState(0);
  const [modalEstadosServicio, setModalEstadosServicio] = useState(false);
  const [modalEstadosViajes, setModalEstadosViajes] = useState(false);

  const [serviciosSinCerrar, setServiciosSinCerrar] = useState([]);

  const [conteoServicios, setConteoServicios] = useState(0);

  const [serviciosHoy, setServiciosHoy] = useState([]);
  const [cargasHoy, setCargasHoy] = useState(0);
  const [idProvisorioServicio, setIdProvisorioServicio] = useState("");

  const [paginaLogisticaSelector, setPaginaLogisticaSelector] = useState(100);
  const [modalFiltrarServicios, setModalFiltrarServicios] = useState(false);

  const [modalTerminales, setModalTerminales] = useState(false);
  const [modalContenedores, setModalContenedores] = useState(false);

  const [tipoTerminal, setTipoTerminal] = useState("");
  const [nombreTerminal, setNombreTerminal] = useState("");
  const [domicilioTerminal, setDomicilioTerminal] = useState("");
  const [localidadTerminal, setLocalidadTerminal] = useState("");
  const [provinciaTerminal, setProvinciaTerminal] = useState("");
  const [comprobarContenedores, setComprobarContenedores] = useState(false);
  const [terminales, setTerminales] = useState([]);
  const [idViajeAsignarProveedor, setIdViajeAsignarProveedor] = useState("");
  const [idEquipoAsignarViaje, setIdEquipoAsignarViaje] = useState();
  const [cambiarEstado, setCambiarEstado] = useState("");
  const [viajesServicio, setViajesServicio] = useState([]);
  const [estadoCambiado, setEstadoCambiado] = useState("");

  const [modalModificarEstadoServicio, setModalModificarEstadoServicio] =
    useState(false);

  const [modalEditarViaje, setModalEditarViaje] = useState(false);

  const [numeroContenedorEditar, setNumeroContenedorEditar] = useState("");
  const [fechaCArgaEditar, setFechaCargaEditar] = useState("");
  const [cantidadEditar, setCantidadEditar] = useState("");
  const [pesoEditar, setPesoEditar] = useState("");
  const [volumenEditar, setVolumenEditar] = useState("");
  const [horaCargaEditar, setHoraCargaEditar] = useState("");
  const [estadoEditar, setEstadoEditar] = useState("");
  const [origenEditar, setOrigenEditar] = useState("");
  const [destinoEditar, setDestinoEDitar] = useState("");
  const [proveedorEditar, setProveedorEditar] = useState("");
  const [choferEditar, setChoferEditar] = useState("");
  const [camionEditar, setCamionEditar] = useState("");
  const [semiEditar, setSemiEditar] = useState("");
  const [nombreProveedorEditar, setNombreProveedorEditar] = useState("");

  const [clienteEditarViaje, setClienteEditarViaje] = useState("");

  const [tipoServicioViajeEditar, setTipoServicioViajeEditar] = useState("");

  const [modalReAsignarProveedor, setModalReAsignarProveedor] = useState(false);

  const [idEditarViaje, setIdEditarViaje] = useState("");
  const [idProveedorEditarViaje, setIdProveedorEditarViaje] = useState("");
  const [modalDevolucion, setModalDevolucion] = useState(false);
  const [direccionDevolucion, setDireccionDevolucion] = useState("");
  const [modalEstadoViaje, setModalEstadoViaje] = useState(false);
  const [modalReAsignarEquipos, setModalReAsignarEquipos] = useState(false);
  const [direccionRetornoEditarViaje, setDireccionRetornoEditarViaje] =
    useState("");

  const [volver, setVolver] = useState(0);

  const [resultOK, setResultOk] = useState(false);
  const [buscoDomi, setBuscoDomi] = useState(false);

  const [buscoActualizaciones, setBuscoActualizaciones] = useState(false);

  const [buscoEnEditarViaje, setBuscoEnEDitarViaje] = useState(false);

  const [chofer, setChofer] = useState("");

  const [coincidoEstado, setCoincidoEstado] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const [comprobarCierre, setComprobarCierre] = useState(false);

  const [recargoProximosViajes, setRecargoProximosViajes] = useState(false);

  const [seAsignoProveedor, setSeAsignoProveedor] = useState(false);

  const [cargando, setCargando] = useState(false);

  const [direccionesEntrega, setDireccionesEntrega] = useState([]);
  const [numeroContenedoresCargados, setNumeroContenedoresCargados] = useState(
    []
  );

  const [busquedaCliente, setBusquedaCliente] = useState([]);
  const [busquedaViaje, setBusquedaViaje] = useState([]);
  const [busquedaServicio, setBusquedaServicio] = useState([]);
  const [busquedaProveedores, setBusquedaProveedores] = useState([]);

  const [actualizoListadoViajes, setActualizoListadoViajes] = useState(false);

  const [modalTerminarViaje, setModalTerminarViaje] = useState(false);

  const [editeViaje, setEditeViaje] = useState(false);

  const [observacionesViaje, setObservacionesViaje] = useState("");
  const [adicionales, setAdicionales] = useState("");
  const [fechaTerminacion, setFechaTerminacion] = useState("");
  const [horaTerminacion, setHoraTerminacion] = useState("");
  const [diasDemora, setDiasDemora] = useState("");

  const [modalAgregarObservaciones, setModalAgregarObservaciones] =
    useState(false);

  const [modalFiltrarViajes, setModalFiltrarViajes] = useState(false);

  const [todosLosViajes, setTodosLosViajes] = useState([]);

  const [documentacionViaje, setDocumentacionViaje] = useState([]);

  const [modalEditarDocumento, setModalEditarDocumento] = useState(false);

  const [estadoDocu, setEstadoDocu] = useState("");
  const [numeroContenedorDocu, setNumeroContenedorDocu] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [linkDocumento, setLinkDocumento] = useState("");
  const [idDocumento, setIdDocumento] = useState("");
  const [actualizoListadoDocu, setActualizoListadoDocu] = useState(false);

  const [actualizoConceptos, setActualizoConceptos] = useState(false);
  const [openSide, setOpenSide] = useState(true);

  const [modalEditarDevolucion, setModalEditarDevolucion] = useState(false);

  const [modalCargarDevolucion, setModalCargarDevolucion] = useState(false);

  const [modalValorizar, setModalValorizar] = useState(false);

  const [modalCargarDevolucionEditar, setModalCargarDevolucionEditar] =
    useState(false);

  const [fechaDevolucionContenedor, setFechaDevolucionContenedor] =
    useState("");
  const [horaDevolucionContenedor, setHoraDevolucionContenedor] = useState("");
  const [
    fechaVencimientoDevolucionContenedor,
    setFechaVencimientoDevolucionContenedor,
  ] = useState("");
  const [lugarDevolucionContenedorVacio, setLugarDevolucionContenedorVacio] =
    useState("");

  const [fechaFactura, setFechaFactura] = useState("");
  const [conceptoFactura, setConceptoFactura] = useState("");
  const [descripcionFactura, setDescripcionFactura] = useState("");
  const [referenciaClienteFactura, setReferenciaClienteFactura] = useState("");
  const [despachoFactura, setDespachoFactura] = useState("");
  const [remitoFactura, setRemitoFactura] = useState("");
  const [contenedorFactura, setContenedorFactura] = useState("");
  const [logicsarFactura, setLogicsarFactura] = useState("");
  const [precioFactura, setPrecioFactura] = useState("");
  const [idConceptoFactura, setIdConceptoFactura] = useState("");

  const [filtroCliente, setFiltroCliente] = useState("");
  const [fechaFiltrada, setFechaFiltrada] = useState("");
  const [estadoFiltrado, setEstadoFiltrado] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [idProveedorEditarEstadoServicio, setIdProveedorEditarEstadoServicio] =
    useState("");

  const [modalAgragarCampo, setModalAgregarCampo] = useState(false);

  const [modalCamposFactura, setModalCamposFactura] = useState(false);

  const [actualizarEstadoServicio, setActualizarEstadoServicio] =
    useState(false);

  const [recargarListadoTodosViajes, setRecargarListadoTodosViajes] =
    useState(false);

  const [enBusqueda, setEnbusqueda] = useState(0);

  const [volverCoordinacion, setVolverCoordinacion] = useState(false);

  const [idChoferEquipo, setIdCHoferEquipo] = useState("");
  const [idCamionEquipo, setIdCamionEquipo] = useState("");
  const [idSemiEquipo, setIdSemiEquipo] = useState("");
  const [idEquipoProveedor, setIdEquipoProveedor] = useState("");
  const [linkVacio, setLinkVacio] = useState("");
  const [modalCambiarEstadoDocumentacion, setCambiarEstadoDocumentacion] =
    useState(false);

  const [autenticado, setAutenticado] = useState("");
  const [numeroCliente, setNumeroCliente] = useState("");
  const [horaDevolucionDesde, setHoraDevolucionDesde] = useState("");
  const [horaDevolucionHasta, setHoraDevolucionHasta] = useState("");

  const [modalQr, setModalQr] = useState(false);

  const handleModalQr = () => {
    setModalQr(!modalQr);
  };

  const handleCambiarEstado = () => {
    setCambiarEstadoDocumentacion(!modalCambiarEstadoDocumentacion);
  };

  const [
    modalEditarContenedorDesdeListados,
    setModalEditarContenedorDesdeListados,
  ] = useState(false);

  const handleModalEditarContenedorDesdeListados = () => {
    setModalEditarContenedorDesdeListados(!modalEditarContenedorDesdeListados);
  };

  const handleModalFactura = () => {
    setModalCamposFactura(!modalCamposFactura);
  };

  const handleModalAgregarCampo = () => {
    setModalAgregarCampo(!modalAgragarCampo);
  };

  const handleModalValorizar = () => {
    setModalValorizar(!modalValorizar);
  };

  const handleModalCargarDevolucionEditar = () => {
    setModalCargarDevolucionEditar(!modalCargarDevolucionEditar);
  };

  const handleModalDevoluciones = () => {
    setModalCargarDevolucion(!modalCargarDevolucion);
  };

  const handleModalEditarDocumento = () => {
    setModalEditarDocumento(!modalEditarDocumento);
  };

  const handleModalEditarDevolucion = () => {
    setModalEditarDevolucion(!modalEditarDevolucion);
  };

  const handleCargando = () => {
    setCargando((prevCargando) => !prevCargando);
  };

  const handleModalFiltrarViajes = () => {
    setModalFiltrarViajes(!modalFiltrarViajes);
  };

  const handleTerminarViaje = () => {
    setModalTerminarViaje(!modalTerminarViaje);
  };

  const handleModalAgregarObservaciones = () => {
    setModalAgregarObservaciones(!modalAgregarObservaciones);
  };

  const handleModalReasignarEquipos = () => {
    setModalReAsignarEquipos(!modalReAsignarEquipos);
  };

  const handleModalEstadoViaje = () => {
    setModalEstadoViaje(!modalEstadoViaje);
  };

  const handleModalTerminales = () => {
    setModalTerminales(!modalTerminales);
  };

  const handleModalDevolucion = () => {
    setModalDevolucion(!modalDevolucion);
  };

  const handleModalReasignarProveedor = () => {
    setModalReAsignarProveedor(!modalReAsignarProveedor);
  };

  const handleModalEditarViaje = () => {
    setModalEditarViaje(!modalEditarViaje);
  };

  const handleModalModificarEstadoServicio = () => {
    setModalModificarEstadoServicio(!modalModificarEstadoServicio);
  };

  const handleModalEstadosViajes = () => {
    setModalEstadosViajes(!modalEstadosViajes);
  };

  const handleModalContenedores = () => {
    setModalContenedores(!modalContenedores);
  };

  const obtenerCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/clientes/obtener/${id}`, config);

      setClienteNombreResumen(data.cliente.nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProveedor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/proveedores/obtener/${id}`, config);

      setNombreProveedorResumen(data.proveedor.nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const obternerServiciosCliente = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/servicio/servicios-cliente/${id}`,
        config
      );

      setServiciosCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [notificado, setNotificado] = useState("");

  const obtenerServicio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/servicio/${id}`, config);

      setCamionesObtenerServicio(data.cantidad);
      setClienteObtenerServicio(data.cliente);
      setDespachoDeAduanaObtenerServicio(data.despachoAduana);
      setNumeroCliente(data.numeroCliente);
      setDestinoDeCargaObtenerServicio(data.destinoCarga);
      setFechaCargaObtenerServicio(data.fechaCarga);
      setHoraCargaObtenerServicio(data.horaCarga);
      setNombreChoferObtenerServicio(data.nombreChofer);
      setNombreClienteObtenerServicio(data.nombreCliente);
      setNumeroDeContenedoresObtenerServicio(data.numeroContenedores);
      setNumeroPedidoObtenerServicio(data.numeroPedido);
      setObservacionesObtenerServicio(data.observaciones);
      setOrigenCargaObtenerServicio(data.origenCarga);
      setPesoObtenerServicio(data.peso);
      setNotificado(data.notificar);
      setProveedorObtenerServicio(data.proveedor);
      setTipoCargaObtenerServicio(data.tipoCarga);
      setTipoOperacionObtenerServicio(data.tipoOperacion);
      setVolumenObtenerServicio(data.volumen);
      setEstadoObtenerServicio(data.estado);
      setIdObtenerServicio(data._id);
      setnombreProveedorObtenerServicio(data.nombreProveedor);
    } catch (error) {
      console.log(error);
    }
  };

  const [viajeObtenido, setViajeObtenido] = useState([]);

  const obtenerViaje = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/servicio/obtener-viaje/${id}`,
        config
      );

      setViajeObtenido(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleModalAsignarProveedor = () => {
  //   setModalAsignarProveedor(!modalAsignarProveedor);
  // };

  const handleModalAsignarProveedor = () => {
    setModalAsignarProveedor((prevModal) => !prevModal);
  };

  const handleModalNuevoEstadoservicio = () => {
    setModalEstadosServicio(!modalEstadosServicio);
  };

  const handleModalFiltrarServicios = () => {
    setModalFiltrarServicios(!modalFiltrarServicios);
  };
  const handleModalAsignarChoferes = () => {
    setModalAsignarChoferes(!modalAsignarChoferes);
  };

  const asignarProveedor = async (id, idProveedor, idViaje) => {
    const info = {
      idProveedor: idProveedor,
      idViaje: idViaje,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/asignar-proveedor/${id}`,
        info,
        config
      );
      toast.success("Proveedor asignado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const reAsignarProveedor = async (id, idProveedor) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/reasignar-proveedor/${id}`,
        { idProveedor },
        config
      );
      toast.success("Proveedor reasignado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const asignarEquipo = async (id, idChofer, idCamion, idSemi) => {
    const info = {
      idChofer,
      idCamion,
      idSemi,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/asignar-equipo/${id}`,
        info,
        config
      );
      toast.success("Equipo asignado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const asignarEquipoPreArmado = async (id, idEquipo) => {
    const info = {
      idEquipo,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/asignar-equipo-prearmado/${id}`,
        info,
        config
      );
      toast.success("Equipo asignado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const aceptarServicioProveedor = async (id, nombreUsuario, idUsuario) => {
    const info = {
      nombreUsuario,
      idUsuario,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/servicio/aceptar-servicio/${id}`, info, config);

      toast.success("Viaje Aceptado", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerServicios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/servicio/obtener-viajes-ayer",
        config
      );

      setServiciosSinCerrar(data);
      setConteoServicios(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const [todosLosServicios, setTodosLosServicios] = useState([]);

  const obtenerTodosServicios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/servicio/todos-servicios", config);
      setTodosLosServicios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [todosServiciosActivos, setTodosServiciosActivos] = useState([]);

  const obtenerTodosServiciosenCurso = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/servicio/todos-servicios-en-curso",
        config
      );
      setTodosServiciosActivos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerServiciosHoy = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/servicio/obtener-viajes-hoy",
        config
      );

      // guarda los datos de los clientes
      setServiciosHoy(data);
      setCargasHoy(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const [serviciosManana, setServiciosManana] = useState([]);
  const [conteoManana, setConteoManana] = useState(0);

  const obtenerServiciosManana = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/servicio/obtener-viajes-futuro",
        config
      );

      // guarda los datos de los clientes
      setServiciosManana(data);
      setConteoManana(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const [serviciosdespuesdehoy, setServiciosDespuesDeHoy] = useState([]);
  const [countTomorrow, setCountTomorrow] = useState(0);
  const obtenerServiciosdespuesdehoy = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/servicio/obtener-viajes-manana",
        config
      );

      // guarda los datos de los clientes
      setServiciosDespuesDeHoy(data);
      setCountTomorrow(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaTerminal = async (
    tipo,
    nombre,
    direccionEntrega,
    localidadEntrega,
    provincia
  ) => {
    const domicilio = {
      tipo: tipo,
      nombre: nombre,
      direccion: direccionEntrega,
      localidad: localidadEntrega,
      provincia: provincia,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/nueva-terminal`,
        domicilio,
        config
      );

      console.log(data);

      toast.success("Terminal Guardada Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoLugarDevolucion = async (
    nombre,
    direccionEntrega,
    localidadEntrega,
    provincia
  ) => {
    const domicilio = {
      nombre: nombre,
      direccion: direccionEntrega,
      localidad: localidadEntrega,
      provincia: provincia,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/nueva-direccion-devolucion`,
        domicilio,
        config
      );

      console.log(data);

      toast.success("Playa de devolucion Guardada Correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoEstadoServicio = async (nombre) => {
    const estado = {
      estado: nombre,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/estado-servicio`,
        estado,
        config
      );

      toast.success("Estado del servicio guardadado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoEstadoViaje = async (nombre) => {
    const estado = {
      estado: nombre,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/estado-viajes`,
        estado,
        config
      );

      toast.success("Estado del viaje guardadado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerTerminales = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        "/clientes/obtener-terminales",
        config
      );

      setTerminales(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [playas, setPlayas] = useState([]);
  const obtenerPlayas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(
        "/clientes/direccion-devoluciones/",
        config
      );

      setPlayas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [estadosServicioObtenidos, setEstadoServicioObtenidos] = useState([]);

  const obtenerEstadosServicios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        "/servicio/obtener-estados-servicio",
        config
      );

      setEstadoServicioObtenidos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [estadosViaje, setEstadosViaje] = useState([]);

  const obtenerEstadosViaje = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        "/servicio/obtener-estados-viaje",
        config
      );

      setEstadosViaje(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [
    actualizarListadoViajesFiltradosLogistica,
    setActualizarEstadoViajesFiltradosLogistica,
  ] = useState(false);
  const obtenerViajesFiltrados = async (cliente, fecha, estado) => {
    const consulta = {
      cliente,
      fecha,
      estado,
    };
    console.log(consulta);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/obtener-viajes-filtrados/",
        consulta,
        config
      );

      setTodosLosViajes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [viajesSinNotificar, setViajesSinNotificar] = useState([]);

  const obtenerViajesSinNotificar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        "/servicio/obtener-viajes-sin-notificar",
        config
      );

      setViajesSinNotificar(data);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaImportacion = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,
      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/importacion",
        servicio,
        config
      );

      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevaExportacion = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,

      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
    };

    console.log(servicio);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/exportacion",
        servicio,
        config
      );
      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevaRoundTripExpo = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro,
    playa
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,
      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
      playa: playa,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/round-trip",
        servicio,
        config
      );
      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevaDevolucionVacios = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,

      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
    };

    console.log(servicio);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/vacios",
        servicio,
        config
      );
      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoEmptyPick = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,
      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/empty-pick",
        servicio,
        config
      );
      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoTransito = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,

      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/transito",
        servicio,
        config
      );
      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoNacional = async (
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    origenCarga,
    destinoCarga,
    observaciones,
    numeroCliente,
    despachoAduana,
    numeroContenedores,
    otro
  ) => {
    const servicio = {
      idCliente: idClienteServicio,
      fechaCarga: fechaDeCarga,
      horaCarga: horaDeCarga,
      tipoOperacion: tipoServicio,
      tipoCarga: tipoDeCarga,
      cantidad: cantidadCarga,
      peso: pesoCarga,
      volumen: volumenCarga,
      origenCarga: origenCarga,
      destinoCarga: destinoCarga,
      observaciones: observaciones,

      numeroCliente: numeroCliente,
      despachoAduana: despachoAduana,
      numeroContenedores: numeroContenedores,
      otro: otro,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/servicio/nacional",
        servicio,
        config
      );
      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerViajesServicio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/servicio/obtener-viajes/${id}`,
        config
      );
      console.log(data);
      setViajesServicio(data);
    } catch (error) {
      console.log(error);
    }
  };

  const aprobarViaje = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/aprobar/${id}`,
        {},
        config
      );
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const cambiarEstadoServicio = async (id, estado) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/cambiar-estado-servicio/${id}`,
        { estado },
        config
      );
      toast.success("Estado Cambiado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const cambiarEstadoViaje = async (id, estado) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/cambiar-estado-viaje/${id}`,
        { estado },
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editarViaje = async (
    idViaje,
    numeroContenedor,
    fechaOrigen,
    horaOrigen,
    direccionRetorno,
    tipoServicio,
    estado,
    domicilioOrigen,
    domicilioDestino,
    observaciones,
    cantidadCarga,
    pesoCarga,
    volumenCarga,
    tipoCarga
  ) => {
    const servicio = {
      numeroContenedor,
      fechaOrigen,
      horaOrigen,
      direccionRetorno,
      tipoServicio,
      estado,
      cantidadCarga,
      pesoCarga,
      volumenCarga,
      tipoCarga,
      domicilioOrigen,
      domicilioDestino,
      observaciones,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/editar-viaje/${idViaje}`,
        servicio,
        config
      );
      toast.success("Viaje editado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notificarViajes = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/notificar-viajes/${id}`,
        {},
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notificarAlChofer = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/notificar-chofer/${id}`,
        {},
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notificarAlChoferPorMail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/notificar-chofer-mail/${id}`,
        {},
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notificarAceptacion = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/notificar-aceptacion/${id}`,
        {},
        config
      );
      console.log(data);
      toast.success("Servicio Aceptado notificado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [actualizaciones, setActualizaciones] = useState([]);

  const obtenerActualizaciones = async () => {
    console.log("obtenerActualiszaciones");
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/servicio/obtener-actualizaciones`,
        config
      );

      setActualizaciones(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalServicio = () => {
    Swal.fire({
      title: "Queres cerrar esta ventana?",
      text: "Todos los datos ingresados se borraran",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        setIdClienteServicio("");
        setTipoServicio("");
        setFechadeCarga("");
        setHoraDeCarga("");
        setTipoDeCarga("");
        setCantidadCarga("");
        setPesoCarga("");
        setVolumenCarga("");
        setOrigenCarga("");
        setDestinoCarga("");
        setObservacionesCarga("");
        setNroInternoCliente("");
        setDespachoDeAduana("");
        setNumeroDeContenedores([]);
        setOtrosServicio("");
        setComprobarContenedores(false);
        setComprobarCierre(true);
      }
    });
  };

  const busqueda = async (terminoBusqueda) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/buscar`,
        { terminoBusqueda },
        config
      );

      setBusquedaCliente(data.clientes);
      setBusquedaProveedores(data.proveedores);
      setBusquedaServicio(data.servicios);
      setBusquedaViaje(data.viajes);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarObsServicio = async (id, observaciones) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/editar-observacion/${id}`,
        { observaciones },
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarViaje = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/eliminar-viaje/${id}`,
        {},
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarServicio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/eliminar-servicio/${id}`,
        {},
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const terminarViaje = async (
    ids,
    adicionales,
    fechaTerminacion,
    horaTerminacion,
    diasDemora,
    observaciones
  ) => {
    const info = {
      adicionales,
      fechaTerminacion,
      horaTerminacion,
      diasDemora,
      observaciones,
    };

    const id = ids;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/servicio/terminar-viaje/${id}`,
        info,
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerViajes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        "/servicio/obtener-todos-viajes",
        config
      );

      setTodosLosViajes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDocumentacion = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/servicio/obtener-documentacion/${id}`,
        config
      );

      setDocumentacionViaje(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [conceptosAFacturar, setConceptosAFacturar] = useState([]);

  const obtenerConceptos = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/servicio/conceptos-a-facturar/${id}`,
        config
      );
      // console.log(data);
      setConceptosAFacturar(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarDocumento = async (idDocu, formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await clienteAxios.post(
      //   `/servicio/editar-documento/${idDocu}`,
      //   docu,
      //   config
      // );
      const { data } = await clienteAxios.post(
        `/servicio/cargar-documento/${idDocu}`,
        formData,
        config
      );

      toast.success("Documento editado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const completarDevolucion = async (
    id,
    fechaDevolucion,
    horaDevolucion,
    fechaVencimiento,
    lugar
  ) => {
    const servicio = {
      fechaDevolucion: fechaDevolucion,
      horaDevolucion: horaDevolucion,
      fechaVencimientoDevolucion: fechaVencimiento,
      lugarDevolucion: lugar,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/completar-devolucion/${id}`,
        servicio,
        config
      );
      toast.success("Datos Devolucion Guardados", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [fantasiaDevolucionEditar, setFantasiaDevolucionEditar] = useState("");
  const [localidadDevolucionEditar, setLocalidadDevolucionEditar] =
    useState("");
  const completarDevolucionListado = async (
    id,
    fechaDevolucion,
    fechaVencimiento,
    lugar,
    numeroContenedor,
    horaDesde,
    horaHasta,
    fantasiaDevolucionEditar,
    localidadDevolucion
  ) => {
    const servicio = {
      fechaDevolucion: fechaDevolucion,
      fechaVencimientoDevolucion: fechaVencimiento,
      lugarDevolucion: lugar,
      numeroContenedor: numeroContenedor,
      horaDevolucionDesde: horaDesde,
      horaDevolucionHasta: horaHasta,
      nombrePlaya: fantasiaDevolucionEditar,
      localidadDevolucion: localidadDevolucion,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/completar-devolucion-listado/${id}`,
        servicio,
        config
      );
      toast.success("Datos Devolucion Guardados", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editarConcepto = async (
    id,
    fecha,
    descripcion0,
    descripcion1,
    descripcion2,
    descripcion3,
    descripcion4,
    descripcion5,
    precioBruto
  ) => {
    const docu = {
      fecha,
      descripcion0,
      descripcion1,
      descripcion2,
      descripcion3,
      descripcion4,
      descripcion5,
      precioBruto,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/editar-concepto/${id}`,
        docu,
        config
      );
      toast.success("Concepto editado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const agregarConcepto = async (
    id,
    fecha,
    descripcion0,
    descripcion1,
    descripcion2,
    descripcion3,
    descripcion4,
    descripcion5,
    precioBruto
  ) => {
    const docu = {
      fecha,
      descripcion0,
      descripcion1,
      descripcion2,
      descripcion3,
      descripcion4,
      descripcion5,
      precioBruto,
      servicio: id,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/agregar-concepto`,
        docu,
        config
      );
      toast.success("Concepto agregado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const agregarViajes = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/agregar-viaje/${id}`,
        {},
        config
      );

      toast.success("Viaje creado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const [viajesLiquidarClientes, setViajesLiquidarClientes] = useState([]);

  const [actualizarListadoLiqClientes, setActualizarListadoLiqClientes] =
    useState(false);
  const obtenerViajesLiquidarClientes = async (id, fecha) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        `/servicio/obtener-viajes-liquidacion-clientes/${id}?fecha=${encodeURIComponent(
          fecha
        )}`,
        config
      );

      setViajesLiquidarClientes(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerViajesValorizarClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        "/servicio/obtener-todos-los-viajes-por-valorizar-por-clientes",
        config
      );
      setViajesLiquidarClientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fijarPrecioViajeCliente = async (id, precio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/cambiar-precio-viaje-cliente/${id}`,
        { precio },
        config
      );
      console.log(data);
      toast.success("Precio Viaje agregado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fijarPrecioAdicional = async (id, precio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/cambiar-precio-adicional-cliente/${id}`,
        { precio },
        config
      );
      console.log(data);
      toast.success("Precio Adicional agregado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fijarNumeroFactura = async (id, numero) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/cambiar-numero-factura-viaje/${id}`,
        { numero },
        config
      );
      console.log(data);
      toast.success("Numero Factura agregado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarEquipo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/eliminar-equipo/${id}`,
        {},
        config
      );

      toast.success("Equipo eliminado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarProveedor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/eliminar-proveedor/${id}`,
        {},
        config
      );

      toast.success("Proveedor eliminado con exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notificarLogicsarWhatsapp = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/notificar-logicsar/${id}`,
        {},
        config
      );

      toast.success("Whatsapp Enviado Con Exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notificarChoferWhatsapp = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/servicio/notificar-chofer/${id}`,
        {},
        config
      );

      toast.success("Whatsapp Enviado Con Exito", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [documentacionPendiente, setDocumentacionPendiente] = useState([]);

  const obtenerDocumentacionPendiente = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        `/servicio/obtener-documentacion-pendiente`,
        config
      );
      setDocumentacionPendiente(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [autenti, setAutenti] = useState([]);

  const consultarAutenticacion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        `/servicio/consultar-autenticacion`,
        config
      );
      console.log(data.autenticacion);
      if (data.autenticacion == 1) {
        setAutenticado("1");
      }
      if (data.autenticacion == 2) {
        setAutenticado("2");
      }
      if (data.autenticacion == 0) {
        setAutenticado("0");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ServiciosContext.Provider
      value={{
        ordenClienteServicio,
        setOrdenClienteServicio,
        idClienteServicio,
        setIdClienteServicio,
        domicilioEntregaServicio,
        setDomicilioEntregaServicio,
        tipoServicio,
        setTipoServicio,
        cantidadCamionesServicio,
        setCantidadCamionesServicio,
        modalResumen,
        terminalServicio,
        setTerminalServicio,
        proveedorServicio,
        setProveedorServicio,
        nroOrden,
        setNroOrden,
        obtenerCliente,
        clienteNombreResumen,
        proveedorNombreResumen,
        obtenerProveedor,
        fechaDeCarga,
        setFechadeCarga,
        horaDeCarga,
        setHoraDeCarga,
        tipoDeCarga,
        setTipoDeCarga,
        cantidadCarga,
        setCantidadCarga,
        pesoCarga,
        setPesoCarga,
        volumenCarga,
        setVolumenCarga,
        origenCarga,
        setOrigenCarga,
        destinoCarga,
        setDestinoCarga,
        observacionesCarga,
        setObservacionesCarga,
        nroInternoCliente,
        setNroInternoCliente,
        despachoDeAduana,
        setDespachoDeAduana,
        numeroDeContenedores,
        setNumeroDeContenedores,
        otrosServicio,
        setOtrosServicio,
        obternerServiciosCliente,
        serviciosCliente,
        idServicio,
        setIdServicio,
        obtenerServicio,
        servicioCliente,
        setServicioCliente,
        camionesObtenerServicio,
        setCamionesObtenerServicio,
        clienteObtenerServicio,
        setClienteObtenerServicio,
        despachoDeAduanaObtenerServicio,
        setDespachoDeAduanaObtenerServicio,
        destinoCargaObtenerServicio,
        setDestinoDeCargaObtenerServicio,
        fechaCargaObtenerServicio,
        setFechaCargaObtenerServicio,
        horaCargaObtenerServicio,
        setHoraCargaObtenerServicio,
        nombreChoferObtenerServicio,
        setNombreChoferObtenerServicio,
        nombreClienteObtenerServicio,
        setNombreClienteObtenerServicio,
        numeroPedidoObtenerServicio,
        setNumeroPedidoObtenerServicio,
        observacionesObtenerServicio,
        setObservacionesObtenerServicio,
        origenCargaObtenerServicio,
        setOrigenCargaObtenerServicio,
        pesoObtenerServicio,
        setPesoObtenerServicio,
        proveedorObtenerServicio,
        setProveedorObtenerServicio,
        tipoCargaObtenerServicio,
        setTipoCargaObtenerServicio,
        tipoOperacionObtenerServicio,
        setTipoOperacionObtenerServicio,
        volumenObtenerServicio,
        setVolumenObtenerServicio,
        idObtenerServicio,
        setIdObtenerServicio,
        handleModalAsignarProveedor,
        modalAsignarProveedor,
        idAsignarProveedor,
        setIdAsignarProveedor,
        asignarProveedor,
        estadoObtenerServicio,
        nombreProveedorObtenerServicio,
        handleModalAsignarChoferes,
        modalAsignarChoferes,
        cantidadModales,
        setCantidadModales,
        aceptarServicioProveedor,
        serviciosSinCerrar,
        conteoServicios,
        serviciosHoy,
        cargasHoy,
        serviciosManana,
        conteoManana,
        setServiciosCliente,
        idProvisorioServicio,
        setIdProvisorioServicio,
        paginaLogisticaSelector,
        setPaginaLogisticaSelector,
        handleModalFiltrarServicios,
        modalFiltrarServicios,
        todosLosServicios,
        setTodosLosServicios,
        handleModalTerminales,
        modalTerminales,
        tipoTerminal,
        setTipoTerminal,
        nombreTerminal,
        setNombreTerminal,
        domicilioTerminal,
        setDomicilioTerminal,
        localidadTerminal,
        setLocalidadTerminal,
        provinciaTerminal,
        setProvinciaTerminal,
        nuevaTerminal,
        obtenerTerminales,
        terminales,
        handleModalContenedores,
        modalContenedores,
        numeroContenedoresObtenerServicio,
        nuevaImportacion,
        nuevaExportacion,
        nuevoTransito,
        nuevoNacional,
        comprobarContenedores,
        setComprobarContenedores,
        obtenerViajesServicio,
        viajesServicio,
        idViajeAsignarProveedor,
        setIdViajeAsignarProveedor,
        obtenerViaje,
        viajeObtenido,
        asignarEquipo,
        aprobarViaje,
        nuevoEstadoServicio,
        handleModalNuevoEstadoservicio,
        modalEstadosServicio,
        modalEstadosViajes,
        handleModalEstadosViajes,
        nuevoEstadoViaje,
        obtenerEstadosServicios,
        estadosServicioObtenidos,
        handleModalModificarEstadoServicio,
        modalModificarEstadoServicio,
        cambiarEstadoServicio,
        cambiarEstado,
        setCambiarEstado,
        handleModalEditarViaje,
        modalEditarViaje,
        numeroContenedorEditar,
        setNumeroContenedorEditar,
        fechaCArgaEditar,
        setFechaCargaEditar,
        horaCargaEditar,
        setHoraCargaEditar,
        estadoEditar,
        setEstadoEditar,
        origenEditar,
        setOrigenEditar,
        destinoEditar,
        setDestinoEDitar,
        proveedorEditar,
        setProveedorEditar,
        choferEditar,
        setChoferEditar,
        camionEditar,
        setCamionEditar,
        semiEditar,
        setSemiEditar,
        nombreProveedorEditar,
        setNombreProveedorEditar,
        obtenerEstadosViaje,
        estadosViaje,
        clienteEditarViaje,
        setClienteEditarViaje,
        tipoServicioViajeEditar,
        setTipoServicioViajeEditar,
        reAsignarProveedor,
        modalReAsignarProveedor,
        handleModalReasignarProveedor,
        idEditarViaje,
        setIdEditarViaje,
        idProveedorEditarViaje,
        setIdProveedorEditarViaje,
        handleModalDevolucion,
        modalDevolucion,
        nuevoLugarDevolucion,
        obtenerPlayas,
        playas,
        direccionDevolucion,
        setDireccionDevolucion,
        handleModalEstadoViaje,
        modalEstadoViaje,
        cambiarEstadoViaje,
        estadoCambiado,
        setEstadoCambiado,
        handleModalReasignarEquipos,
        modalReAsignarEquipos,
        direccionRetornoEditarViaje,
        setDireccionRetornoEditarViaje,
        editarViaje,
        viajesSinNotificar,
        obtenerViajesSinNotificar,
        notificarViajes,
        notificarAceptacion,
        resultOK,
        setResultOk,
        buscoDomi,
        setBuscoDomi,
        obtenerActualizaciones,
        actualizaciones,
        buscoActualizaciones,
        setBuscoActualizaciones,
        buscoEnEditarViaje,
        setBuscoEnEDitarViaje,
        volver,
        setVolver,
        chofer,
        setChofer,
        coincidoEstado,
        setCoincidoEstado,
        openNav,
        setOpenNav,
        handleCloseModalServicio,
        comprobarCierre,
        setComprobarCierre,
        obtenerServicios,
        recargoProximosViajes,
        setRecargoProximosViajes,
        obtenerServiciosManana,
        obtenerServiciosHoy,
        obtenerTodosServicios,
        seAsignoProveedor,
        setSeAsignoProveedor,
        handleCargando,
        cargando,
        direccionesEntrega,
        setDireccionesEntrega,
        numeroContenedoresCargados,
        setNumeroContenedoresCargados,
        busqueda,
        busquedaCliente,
        busquedaViaje,
        busquedaServicio,
        busquedaProveedores,
        actualizoListadoViajes,
        setActualizoListadoViajes,
        notificado,
        setNotificado,
        handleTerminarViaje,
        modalTerminarViaje,
        editeViaje,
        setEditeViaje,
        modalAgregarObservaciones,
        handleModalAgregarObservaciones,
        actualizarObsServicio,
        observacionesViaje,
        setObservacionesViaje,
        eliminarViaje,
        eliminarServicio,
        terminarViaje,
        adicionales,
        setAdicionales,
        fechaTerminacion,
        setFechaTerminacion,
        horaTerminacion,
        setHoraTerminacion,
        diasDemora,
        setDiasDemora,
        obtenerViajes,
        todosLosViajes,
        modalFiltrarViajes,
        handleModalFiltrarViajes,
        obtenerViajesFiltrados,
        notificarAlChofer,
        obtenerDocumentacion,
        documentacionViaje,
        editarDocumento,
        modalEditarDocumento,
        handleModalEditarDocumento,
        estadoDocu,
        setEstadoDocu,
        numeroContenedorDocu,
        setNumeroContenedorDocu,
        numeroDocumento,
        setNumeroDocumento,
        linkDocumento,
        setLinkDocumento,
        idDocumento,
        setIdDocumento,
        actualizoListadoDocu,
        setActualizoListadoDocu,
        cantidadEditar,
        setCantidadEditar,
        pesoEditar,
        setPesoEditar,
        volumenEditar,
        setVolumenEditar,
        tipoCargaEditar,
        setTipoCargaEditar,
        conceptosAFacturar,
        obtenerConceptos,
        actualizoConceptos,
        setActualizoConceptos,
        openSide,
        setOpenSide,
        handleModalEditarDevolucion,
        modalEditarDevolucion,
        nuevaDevolucionVacios,
        modalCargarDevolucion,
        handleModalDevoluciones,
        fechaDevolucionContenedor,
        setFechaDevolucionContenedor,
        horaDevolucionContenedor,
        setHoraDevolucionContenedor,
        fechaVencimientoDevolucionContenedor,
        setFechaVencimientoDevolucionContenedor,
        lugarDevolucionContenedorVacio,
        setLugarDevolucionContenedorVacio,
        completarDevolucion,
        handleModalCargarDevolucionEditar,
        modalCargarDevolucionEditar,
        handleModalValorizar,
        modalValorizar,
        fechaFactura,
        setFechaFactura,
        conceptoFactura,
        setConceptoFactura,
        descripcionFactura,
        setDescripcionFactura,
        referenciaClienteFactura,
        setReferenciaClienteFactura,
        despachoFactura,
        setDespachoFactura,
        remitoFactura,
        setRemitoFactura,
        contenedorFactura,
        setContenedorFactura,
        logicsarFactura,
        setLogicsarFactura,
        precioFactura,
        setPrecioFactura,
        idConceptoFactura,
        setIdConceptoFactura,
        editarConcepto,
        seActualizaConceptos,
        setSeActualizaConceptos,
        modalAgragarCampo,
        handleModalAgregarCampo,
        agregarConcepto,
        recargarListadoTodosViajes,
        setRecargarListadoTodosViajes,
        agregarViajes,
        actualizarEstadoServicio,
        setActualizarEstadoServicio,
        viajesLiquidarClientes,
        obtenerViajesLiquidarClientes,
        playaOrigen,
        setPlayaOrigen,
        nuevaRoundTripExpo,
        nuevoEmptyPick,

        obtenerViajesValorizarClientes,
        actualizarListadoLiqClientes,
        setActualizarListadoLiqClientes,
        fijarPrecioViajeCliente,
        fijarPrecioAdicional,
        actualizoListadosDespuesDeAsignar,
        setActualizoListadosDespuesDeAsignar,
        obtenerTodosServiciosenCurso,
        todosServiciosActivos,
        setTodosServiciosActivos,
        fijarNumeroFactura,
        actualizarListadoViajesFiltradosLogistica,
        setActualizarEstadoViajesFiltradosLogistica,
        filtroCliente,
        setFiltroCliente,
        fechaFiltrada,
        setFechaFiltrada,
        estadoFiltrado,
        setEstadoFiltrado,
        clientesFiltrados,
        setClientesFiltrados,
        idProveedorEditarEstadoServicio,
        setIdProveedorEditarEstadoServicio,
        handleModalFactura,
        modalCamposFactura,
        handleModalEditarContenedorDesdeListados,
        modalEditarContenedorDesdeListados,
        completarDevolucionListado,
        numeroContenedor,
        setNumeroContenedor,
        enBusqueda,
        setEnbusqueda,
        volverCoordinacion,
        setVolverCoordinacion,
        idEquipoAsignarViaje,
        setIdEquipoAsignarViaje,
        idChoferEquipo,
        setIdCHoferEquipo,
        idCamionEquipo,
        setIdCamionEquipo,
        idSemiEquipo,
        setIdSemiEquipo,
        idEquipoProveedor,
        setIdEquipoProveedor,
        eliminarEquipo,
        eliminarProveedor,
        notificarLogicsarWhatsapp,
        notificarChoferWhatsapp,
        notificarAlChoferPorMail,
        linkVacio,
        setLinkVacio,
        documentacionPendiente,
        obtenerDocumentacionPendiente,
        modalCambiarEstadoDocumentacion,
        handleCambiarEstado,
        handleModalQr,
        modalQr,
        autenticado,
        setAutenticado,
        autenti,
        consultarAutenticacion,
        serviciosdespuesdehoy,
        obtenerServiciosdespuesdehoy,
        countTomorrow,
        numeroCliente,
        horaDevolucionDesde,
        setHoraDevolucionDesde,
        horaDevolucionHasta,
        setHoraDevolucionHasta,
        fantasiaDevolucionEditar,
        setFantasiaDevolucionEditar,
        localidadDevolucionEditar,
        setLocalidadDevolucionEditar,
        asignarEquipoPreArmado,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};

export { ServiciosProvider };

export default ServiciosContext;

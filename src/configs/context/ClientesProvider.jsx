import React from "react";
import { useState, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setSidenavColor } from ".";

const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const [idAdicionalmodificar, setIdAdicionalModificar] = useState("");
  const [descripcionAd, setDescripcionAd] = useState("");
  const [importeAd, setImporteAd] = useState("");
  const [notasAd, setNotasAd] = useState("");
  const [tipo, setTipo] = useState("");

  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [emailFactura, setEmailFactura] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [modalNuevoCliente, setModalNuevoCliente] = useState(false);
  const [modalNuevoUsuario, setModalNuevoUsuario] = useState(false);

  const [modalNuevoCliente2, setModalNuevoCliente2] = useState(false);

  const [modalEditarUsuario, setModalEditarUsuario] = useState(false);
  const [modalEditarUsuarioCliente, setModalEditarUsuarioCliente] =
    useState(false);

  const [modalEditarAdicional, setModalEditarAdicional] = useState(false);

  const [modalEditarCliente, setModaleEditarCliente] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [valueProfile, setValueProfile] = useState(1);
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [dniUsuario, setDniUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [celuUsuario, setCeluUsuario] = useState("");
  const [modalResumen, setModalResumen] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [seleccion, setSeleccion] = useState(1);

  const [horasSalas, setHorasSalas] = useState("");

  const [editarCliente, setEditarCliente] = useState({});
  const [formaDePago, setFormaDePago] = useState(2);
  const [cuitEditar, setCuitEditar] = useState("");
  const [obtenerUsuario, setObtenerUsuario] = useState([]);
  const [obtenerUs, setObtenerUs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [efectivo, setEfectivo] = useState(false);
  const [conteo, setConteo] = useState("");
  const [clientesRecientes, setClientesRecientes] = useState("");
  const [fechaEditar, setFechaEditar] = useState("");

  const [modificarHorasSalas, setModificarHorasSalas] = useState("");

  const [isActivo, setIsActivo] = useState("");
  const [modalAgregarUsuario, setModalAgregarUsuario] = useState(false);
  const [idAsistencias, setIdAsistencias] = useState("");
  const [asistencias, setAsistencias] = useState([]);
  const [adicional, setAdicional] = useState([]);

  const [nombreProfileAsistencia, setNombreProfileAsistencia] = useState("");

  const [asistioHoyProfileAsistencias, setAsistioHoyProfileAsistencias] =
    useState("");

  const [dataAsistencia, setDataAsistencia] = useState([]);
  const [fechaAsistenciaModificar, setFechaAsistenciaModificar] = useState("");
  const [idModificarAsistencia, setIdModificarAsistencia] = useState("");
  const [configuracionDelCliente, setConfiguracionDelCliente] = useState("");
  const [idUsuarioModificar, setIdUsuarioModificar] = useState("");
  const [modalEliminarUsuario, setModalEliminarUsuario] = useState(false);
  const [modalAdicional, setModalAdicional] = useState(false);
  const [modalNuevoServicio, setModalNuevoServicio] = useState(false);
  const [modalNuevoServicio2, setModalNuevoServicio2] = useState(false);
  const [modalNuevoServicio3, setModalNuevoServicio3] = useState(false);
  const [modalNuevoServicio4, setModalNuevoServicio4] = useState(false);
  const [newService, setNewService] = useState(false);

  // Aqui comimenzan las nuevas variables para Logicsar
  const [direccionEntrega, setDireccionEntrega] = useState("");
  const [localidadEntrega, setLocalidadEntrega] = useState("");
  const [cp, setCp] = useState("");
  const [nombreContacto, setNombreContacto] = useState("");
  const [emailContacto, setEmailContacto] = useState("");
  const [celuContacto, setCeluContacto] = useState("");
  const [telefonoCorporativo, setTelefonoCorporativo] = useState("");
  const [modalEditarUsuarioPrueba, setModalEditarUsuarioPrueba] =
    useState(false);

  const [nombrePrueba, setNombrePrueba] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [rol, setRol] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idProveedor, setIdProveedor] = useState("");
  const { auth } = useAuth();

  const [idUsuarioPrueba, setIdUsuarioPrueba] = useState("");
  const [selectInicio, setSelectInicio] = useState(1);
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");

  const [modalDomicilio, setModalDomicilio] = useState(false);

  const [domicilioEntrega, setDomicilioEntrega] = useState("");
  const [localidadEntre, setLocalidadEntre] = useState("");
  const [provinciaEntrega, setProvinciaEntrega] = useState("");

  const [domiciliosCliente, setDomiciliosCliente] = useState([]);

  const [modalNuevoUsuarioProveedor, setModalNuevoUsuarioProveedor] =
    useState(false);

  const [graboUsuario, setGraboUsuario] = useState(false);

  const [refrescoListado, setRefrescoListado] = useState(false);

  const [idClienteEditar, setIdClienteEditar] = useState("");

  const [actualizoCliente, setActualizoCliente] = useState(false);

  const [cierroModalDomis, setCierroModalDomis] = useState(false);
  const [actualizoListadoDomis, setActualizoListadoDOmis] = useState(false);
  const [recardoDomis, setRecargoDomis] = useState(false);
  const [modalNuevoServicioDesdeFicha, setModalNuevoServicioDesdeFicha] =
    useState(false);

  const [modalFiltrarClientesLiquidacion, setModalFiltrarClientesLiquidacion] =
    useState(false);

  const [modalEditarDomicilio, setModalEditarDomicilio] = useState(false);

  const [idDomicilioEditar, setIdDomicilioEDitar] = useState("");

  const [actualizarListadoDomis, setActualizarListadoDomis] = useState(false);

  const [seleccionComercial, setSeleccionComercial] = useState(1);

  const [sector, setSector] = useState("");

  const [actualizarListadoUsuario, setActualizarListadoUsuario] =
    useState(false);

  const [nuevoPedidoNotifMail, setNuevoPedidoNotifMail] = useState(false);
  const [infoViajeNotifMail, setInfoViajeNotifMail] = useState(false);
  const [infoViajeWhatsapp, setInfoViajeWhatsapp] = useState(false);
  const [telefonoUsuario, setTelefonoUsuario] = useState("");

  // const [modalEditarCliente, setModalEditarCliente] = useState(false)

  const handleModalNuevoFiltroLiquidacionClientes = () => {
    setModalFiltrarClientesLiquidacion(!modalFiltrarClientesLiquidacion);
  };

  const handleModalEditarDomicilio = () => {
    setModalEditarDomicilio(!modalEditarDomicilio);
  };

  const handleNuevoUsuarioProveedor = () => {
    setModalNuevoUsuarioProveedor(!modalNuevoUsuarioProveedor);
  };

  const handleModalDomicilio = () => {
    setModalDomicilio(!modalDomicilio);
  };

  // Este effect esta para buscar ej la base el listado de clientes al abrir la seccion clientes

  const obtenerClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/clientes", config);

      // guarda los datos de los clientes
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Este effect busca en la base los usuarios registrados, al abrir esa pantalla

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/usuarios/listado", config);
      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [usuariosEmpresa, setUsuariosEmpresa] = useState([]);

  const obtenerUsuariosPorEmpresa = async (id) => {
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
        `usuarios/listado-por-empresa/${id}`,
        config
      );
      setUsuariosEmpresa(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  //abre o cierra el modal nuevo cliente
  const handleModalNuevoCliente = () => {
    setModalNuevoCliente(!modalNuevoCliente);
  };

  const handleNewService = () => {
    setNewService(!newService);
  };

  const handleEliminarUsuario = () => {
    setModalEliminarUsuario(!modalEliminarUsuario);
  };

  const handleModalAgregarUsuario = () => {
    setModalAgregarUsuario(!modalAgregarUsuario);
  };

  const handleModalEditarAdicional = () => {
    setModalEditarAdicional(!modalEditarAdicional);
  };

  const handleModalNuevoServicio = () => {
    setModalNuevoServicio(!modalNuevoServicio);
  };
  const handleModalNuevoServicioDesdeFicha = () => {
    setModalNuevoServicioDesdeFicha(!modalNuevoServicioDesdeFicha);
  };
  const handleModalNuevoServicio2 = () => {
    setModalNuevoServicio2(!modalNuevoServicio2);
  };

  const handleModalNuevoServicio3 = () => {
    setModalNuevoServicio3(!modalNuevoServicio3);
  };
  const handleModalNuevoServicio4 = () => {
    setModalNuevoServicio4(!modalNuevoServicio4);
  };

  const handleModalEditarUsuarioPrueba = () => {
    setModalEditarUsuarioPrueba(!modalEditarUsuarioPrueba);
  };
  //abre o cierra el modal nuevo cliente 2
  const handleModalNuevoCliente2 = () => {
    setModalNuevoCliente2(!modalNuevoCliente2);
  };

  const handleModalEditarUsuario = () => {
    setModalEditarUsuario(!modalEditarUsuario);
  };

  const handleModalEditarUsuarioCliente = () => {
    setModalEditarUsuarioCliente(!modalEditarUsuarioCliente);
  };

  const handleModalEditarCliente = () => {
    setModaleEditarCliente(!modalEditarCliente);
  };
  //abre o cierra el modal nuevo plan

  const handleModalAdicional = () => {
    setModalAdicional(!modalAdicional);
  };

  //vuelve para atras el modal cliente 2
  const handleBack = () => {
    setModalNuevoCliente2(!modalNuevoCliente2);
    setModalNuevoCliente(!modalNuevoCliente);
  };
  //vuelve para atras el modal resumen
  const handleBack2 = () => {
    setModalResumen(!modalResumen);
    setModalNuevoCliente2(!modalNuevoCliente2);
  };
  //cierra el modal cliente 2
  const handleClose = () => {
    Swal.fire({
      title: "Seguro queres cerrar?",
      text: "Toda la info se borrara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        setTipo("");

        setNombre("");
        setCuit("");
        setEmailFactura("");
        setCantidad("");
        setNombreUsuario("");
        setApellidoUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
        setCeluUsuario("");
        handleModalNuevoCliente2();
      }
    });
  };

  //cierra el modal clientes1
  const handleClose1 = () => {
    if (
      tipo == "" &&
      nombre == "" &&
      cuit == "" &&
      domicilio == "" &&
      cantidad == ""
    ) {
      handleModalNuevoCliente();
    } else {
      Swal.fire({
        title: "Seguro queres cerrar?",
        text: "Toda la info se borrara!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Salir",
      }).then((result) => {
        if (result.isConfirmed) {
          setTipo("");
          setLocalidad("");
          setProvincia("");
          setNombre("");
          setCuit("");
          setEmailFactura("");
          setDomicilio("");
          setCantidad("");
          setNombreUsuario("");
          setApellidoUsuario("");
          setDniUsuario("");
          setEmailUsuario("");
          setCeluUsuario("");
          handleModalNuevoCliente();
        }
      });
    }
  };

  const onCloseEditar = () => {
    Swal.fire({
      title: "Seguro queres cerrar?",
      text: "Toda la info se borrara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        setTipo("");

        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
        setNombreUsuario("");
        setApellidoUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
        setCeluUsuario("");
        handleModalEditarCliente();
      }
    });
  };

  //cierra el modal resumen
  const handleClose3 = () => {
    Swal.fire({
      title: "Seguro queres cerrar?",
      text: "Toda la info se borrara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        setTipo("");

        setNombre("");
        setCuit("");
        setFechaVencimiento("");
        setDomicilio("");
        setEmailFactura("");
        setCantidad("");
        setNombreUsuario("");
        setApellidoUsuario("");
        setDniUsuario("");
        setEmailUsuario("");
        setCeluUsuario("");
        handleModalResumen();
      }
    });
  };
  //Envia a la base de datos la informacion para un nuevo plan

  const editarC = async (cliente) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/clientes/${cliente.id}`,
        cliente,
        config
      );

      //Mostrar la alerta
      toast.success("Cliente actualizado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //redireccionar
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const nuevoCliente = async (cliente) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/clientes", cliente, config);
      setCuitEditar(data._id);
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

  const editoCliente = async (cliente) => {
    const { id } = cliente;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/clientes/${id}`,
        cliente,
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

  const [domiFantasia, setDomiFantasia] = useState("");

  const guardarDomicilios = async (
    id,
    direccionEntrega,
    localidadEntrega,
    provincia,
    fantasia
  ) => {
    const domicilio = {
      direccion: direccionEntrega,
      localidad: localidadEntrega,
      provincia: provincia,
      fantasia: fantasia,
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
        `/clientes/nuevoDomicilio/${id}`,
        domicilio,
        config
      );
      toast.success("Domicilio Guardado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setDireccionEntrega("");
        setLocalidadEntrega("");
        setCp("");
        setEmailContacto("");
        setNombreContacto("");
        setCeluContacto("");
        setCuit("");
      }, 800);
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

  const obtenerDomicilios = async (id) => {
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
        `/clientes/obtener-domicilios/${id}`,

        config
      );
      setDomiciliosCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Envia a la base de datos la informacion para un nuevo cliente
  const adicionales = async (adicional) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/clientes/adicional", adicional, config);

      toast.success("Adicional agregado al cliente", {
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

  //Guarda los usuarios en la base de datos
  const guardarUsuarios = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/usuarios`, usuario, config);

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

  const editarUsuarios = async (
    id,
    nombrePrueba,
    apellido,
    email,
    sector,
    nuevoPedidoNotifMail,
    infoViajeNotifMail,
    infoViajeWhatsapp,
    telefono
  ) => {
    const usuario = {
      nombre: nombrePrueba,
      apellido: apellido,
      email: email,
      sector: sector,
      nuevoPedidoNotifMail: nuevoPedidoNotifMail,
      infoViajeNotifMail: infoViajeNotifMail,
      infoViajeWhatsapp: infoViajeWhatsapp,
      celu: telefono,
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
      const { data } = await clienteAxios.put(
        `/usuarios/editar-usuarios/${id}`,
        usuario,
        config
      );
      toast.success("Editado Correctamente", {
        position: "top-right",
        autoClose: 500,
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

  const editarAdicional = async (_id, detalle, importe, notas) => {
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
        `/clientes/editar-adicional/${_id}`,
        {
          detalle,
          importe,
          notas,
        },
        config
      );
      toast.success("Editado Correctamente", {
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

      setEditarCliente(data.cliente);
      setTipo(data.cliente.tipo);
      setNombre(data.cliente.nombre);
      setCuit(data.cliente.cuit);
      setDomicilio(data.cliente.domicilio);
      setLocalidad(data.cliente.localidad);
      setProvincia(data.cliente.provincia);
      setEmailFactura(data.cliente.mailFactura);
      setFechaVencimiento(data.cliente.fechaVencimiento);
      setIsActivo(data.cliente.isActivo);
      setIdClienteEditar(data.cliente._id);
      setTelefonoCorporativo(data.cliente.telefono);
    } catch (error) {
      console.log(error);
    }
  };

  const resetAsistencias = async () => {
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
        `/clientes/reset-asistencias`,
        config
      );

      toast.success("Todas las asistencias se han reiniciado", {
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

  const obtenerAsistencias = async (id) => {
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
        `/clientes/obtener-asistencias/${id}`,

        config
      );

      setAsistencias(data.asistencias);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerAdicionales = async (id) => {
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
        `/clientes/obtener-adicionales/${id}`,
        config
      );

      setAdicional(data.adicionales);
    } catch (error) {
      console.log(error);
    }
  };

  const almacenarAsistencia = async (id) => {
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
        `/clientes/asistencias/${id}`,
        {},
        config
      );

      setDataAsistencia(data);
      console.log(data.mensaje);
      console.log(data.tipo);

      if (data.tipo === 0) {
        toast.success(data.mensaje, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (data.tipo === 2) {
        toast.warning(data.mensaje, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (data.tipo === 1) {
        toast.error(data.mensaje, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      //Mostrar la alerta
    } catch (error) {
      toast.error(error.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const desactivarCliente = async (cliente) => {
    console.log(cliente);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/clientes/desactivar-activar/${cliente.id}`,
        cliente,
        config
      );

      setIsActivo(data.isActivo);

      toast.success("Estado del cliente actualizado correctamente", {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerUsuarioProfile2 = async (id) => {
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
        `/clientes/buscar-prueba2/${id}`,
        config
      );
      setObtenerUsuario(data);
      setNombrePrueba(data.nombre);
      setApellido(data.apellido);
      setDni(data.dni);
      setEmail(data.email);
      setRol(data.rol);
      setTelefono(data.celu);
      setIdCliente(data.cliente);
      setIdProveedor(data.proveedor);
      setTelefono(data.telefono);
      // setDataUserProvider(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarAsistencia = async (id, fecha) => {
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
        `/clientes/editar-asistencia/${id}`,
        { fecha },
        config
      );

      //Mostrar la alerta
      toast.success("Asistencia actualizado correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        setIdModificarAsistencia("");
        setFechaAsistenciaModificar("");
      }, 1000);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarAsistencia = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/clientes/eliminar-asistencia/${id}`,
        config
      );

      //Mostrar la alerta
      toast.success("Asistencia Eliminada correctamente", {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(
        `/usuarios//eliminar-usuario/${id}`,
        config
      );

      //Mostrar la alerta
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleBackModal2 = () => {
    setModalNuevoServicio2(!modalNuevoServicio2);
    setModalNuevoServicio(!modalNuevoServicio);
  };
  const handleBackModal3 = () => {
    setModalNuevoServicio3(!modalNuevoServicio3);
    setModalNuevoServicio2(!modalNuevoServicio2);
  };
  const handleBackModal4 = () => {
    setModalNuevoServicio4(!modalNuevoServicio4);
    setModalNuevoServicio3(!modalNuevoServicio3);
  };

  const handleModalResumen = () => {
    setModalResumen(!modalResumen);
  };
  const handleModalResumenBack = () => {
    setModalResumen(!modalResumen);
    setModalNuevoServicio4(!modalNuevoServicio4);
  };

  const handleModalNuevoUsuario = () => {
    setModalNuevoUsuario(!modalNuevoUsuario);
  };

  const editarDomicilio = async (
    id,
    direccionEntrega,
    localidadEntrega,
    provincia,
    fantasia
  ) => {
    const domicilio = {
      direccion: direccionEntrega,
      localidad: localidadEntrega,
      provincia: provincia,
      fantasia: fantasia,
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
        `/clientes/editar-domicilio/${id}`,
        domicilio,
        config
      );
      toast.success("Domicilio Editado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setDireccionEntrega("");
        setLocalidadEntrega("");
        setCp("");
        setEmailContacto("");
        setNombreContacto("");
        setCeluContacto("");
        setCuit("");
      }, 800);
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

  const [cuitObtenido, setCuitObtenido] = useState([]);
  const consultarCuit = async (cuit) => {
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
        `/contable/consultar-cuit/${cuit}`,
        {},
        config
      );
      if (data.errorGetData) {
        setCuitObtenido(data);
      } else {
        setCuitObtenido(data.Contribuyente);
      }
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

  return (
    <ClientesContext.Provider
      value={{
        consultarCuit,
        cuitObtenido,
        editarAsistencia,
        modalNuevoCliente,

        handleModalNuevoCliente,
        nuevoCliente,
        tipo,

        nombre,
        cuit,
        emailFactura,
        cantidad,
        setTipo,

        setNombre,
        setCuit,
        setEmailFactura,
        setCantidad,
        handleModalNuevoCliente2,
        modalNuevoCliente2,
        handleBack,
        nombreUsuario,
        setNombreUsuario,
        apellidoUsuario,
        setApellidoUsuario,
        dniUsuario,
        setDniUsuario,
        emailUsuario,
        setEmailUsuario,
        celuUsuario,
        setCeluUsuario,
        handleClose,
        handleClose1,

        fechaVencimiento,
        setFechaVencimiento,
        handleClose3,
        handleBack2,
        guardarUsuarios,
        domicilio,
        setDomicilio,
        clientes,
        //Este usuarios se usa para mostrar en la lista de usuarios general
        usuarios,
        seleccion,
        setSeleccion,

        horasSalas,
        setHorasSalas,

        modalEditarCliente,
        handleModalEditarCliente,
        onCloseEditar,
        cuitEditar,
        setCuitEditar,
        obtenerCliente,
        editarCliente,
        setEditarCliente,
        valueProfile,
        setValueProfile,
        setFormaDePago,
        formaDePago,
        //Es lo que usaremos para grabar el usuario clieado en editar o ver
        setObtenerUs,
        //es la que usaremos para mandarle a la funcion
        obtenerUs,
        //funcion para traer el listado de usuarios en profile
        // obtenerUser,
        //Esta variable mostrara al  o los usuarios en el perfil
        obtenerUsuario,
        setObtenerUsuario,
        cargando,
        efectivo,
        setEfectivo,
        setConfiguracionDelCliente,
        configuracionDelCliente,
        conteo,
        fechaEditar,
        setFechaEditar,
        clientesRecientes,
        editarC,

        modificarHorasSalas,

        setModificarHorasSalas,

        isActivo,
        desactivarCliente,
        handleModalAgregarUsuario,
        modalAgregarUsuario,
        almacenarAsistencia,
        idAsistencias,
        setIdAsistencias,
        obtenerAsistencias,
        asistencias,
        nombreProfileAsistencia,
        setNombreProfileAsistencia,

        asistioHoyProfileAsistencias,
        setAsistioHoyProfileAsistencias,
        dataAsistencia,
        resetAsistencias,

        fechaAsistenciaModificar,
        setFechaAsistenciaModificar,
        idModificarAsistencia,
        setIdModificarAsistencia,
        eliminarAsistencia,
        modalEditarUsuario,
        handleModalEditarUsuario,

        idUsuarioModificar,
        setIdUsuarioModificar,
        handleEliminarUsuario,
        modalEliminarUsuario,
        eliminarUser,
        modalAdicional,
        handleModalAdicional,
        adicionales,
        obtenerAdicionales,
        adicional,
        handleModalEditarAdicional,
        modalEditarAdicional,
        descripcionAd,
        setDescripcionAd,
        importeAd,
        setImporteAd,
        notasAd,
        setNotasAd,
        idAdicionalmodificar,
        setIdAdicionalModificar,
        editarAdicional,

        //Aqui comienzan las variables para Logicsar

        direccionEntrega,
        setDireccionEntrega,
        localidadEntrega,
        setLocalidadEntrega,
        cp,
        setCp,
        nombreContacto,
        setNombreContacto,
        emailContacto,
        setEmailContacto,
        celuContacto,
        setCeluContacto,
        guardarDomicilios,
        telefonoCorporativo,
        setTelefonoCorporativo,
        handleModalEditarUsuarioPrueba,
        modalEditarUsuarioPrueba,
        idUsuarioPrueba,
        setIdUsuarioPrueba,
        nombrePrueba,
        setNombrePrueba,
        apellido,
        setApellido,
        email,
        setEmail,
        telefono,
        setTelefono,
        dni,
        setDni,
        rol,
        setRol,
        idCliente,
        setIdCliente,
        idProveedor,
        setIdProveedor,
        editarUsuarios,
        obtenerUsuarioProfile2,
        handleModalNuevoServicio,
        modalNuevoServicio,
        handleModalNuevoServicio2,
        modalNuevoServicio2,
        handleModalNuevoServicio3,
        modalNuevoServicio3,
        modalNuevoServicio4,
        handleModalNuevoServicio4,
        handleBackModal2,
        handleBackModal3,
        handleBackModal4,
        handleModalResumenBack,
        handleModalResumen,
        modalResumen,
        modalNuevoUsuario,
        handleModalNuevoUsuario,
        selectInicio,
        handleNewService,
        newService,
        setSelectInicio,
        localidad,
        setLocalidad,
        provincia,
        setProvincia,
        handleModalDomicilio,
        modalDomicilio,
        domicilioEntrega,
        setDomicilioEntrega,
        localidadEntre,
        setLocalidadEntre,
        provinciaEntrega,
        setProvinciaEntrega,
        domiciliosCliente,
        obtenerDomicilios,
        modalNuevoUsuarioProveedor,
        handleNuevoUsuarioProveedor,
        obtenerUsuarios,
        graboUsuario,
        setGraboUsuario,
        obtenerClientes,
        refrescoListado,
        setRefrescoListado,
        editoCliente,
        idClienteEditar,
        setIdClienteEditar,
        actualizoCliente,
        setActualizoCliente,
        actualizoListadoDomis,
        setActualizoListadoDOmis,
        cierroModalDomis,
        setCierroModalDomis,
        domiFantasia,
        setDomiFantasia,
        recardoDomis,
        setRecargoDomis,
        handleModalNuevoServicioDesdeFicha,
        modalNuevoServicioDesdeFicha,
        handleModalNuevoFiltroLiquidacionClientes,
        modalFiltrarClientesLiquidacion,
        handleModalEditarDomicilio,
        modalEditarDomicilio,
        idDomicilioEditar,
        setIdDomicilioEDitar,
        editarDomicilio,
        actualizarListadoDomis,
        setActualizarListadoDomis,
        seleccionComercial,
        setSeleccionComercial,
        usuariosEmpresa,
        obtenerUsuariosPorEmpresa,
        handleModalEditarUsuarioCliente,
        modalEditarUsuarioCliente,
        sector,
        setSector,
        actualizarListadoUsuario,
        setActualizarListadoUsuario,
        nuevoPedidoNotifMail,
        setNuevoPedidoNotifMail,
        infoViajeNotifMail,
        setInfoViajeNotifMail,
        infoViajeWhatsapp,
        setInfoViajeWhatsapp,
        telefonoUsuario,
        setTelefonoUsuario,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
export { ClientesProvider };

export default ClientesContext;

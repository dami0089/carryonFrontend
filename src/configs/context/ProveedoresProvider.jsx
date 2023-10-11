import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProveedoresContext = createContext();

const ProveedoresProvider = ({ children }) => {
  const [tipoProveedor, setTipoProveedor] = useState("");

  const [nombreProveedor, setNombreProveedor] = useState("");
  const [cuitProveedor, setCuitProveedor] = useState("");
  const [emailProveedor, setEmailProveedor] = useState("");
  //   const [cantidad, setCantidad] = useState("");
  const [modalNuevoProveedor, setModalNuevoProveedor] = useState(false);
  const [modalCargarFactura, setModalCargarFactura] = useState(false);

  const [domicilioProveedor, setDomicilioProveedor] = useState("");

  const [seleccionProveedor, setSeleccionProveedor] = useState(1);

  const [modalNuevoPago, setModalNuevoPago] = useState(false);
  const [modalNuevoCamion, setModalNuevoCamion] = useState(false);
  const [modalNuevoCamionP, setModalNuevoCamionP] = useState(false);
  const [modalNuevoChofer, setModalNuevoChofer] = useState(false);
  const [modalNuevoChoferP, setModalNuevoChoferP] = useState(false);

  const [modalNuevoSemi, setModalNuevoSemi] = useState(false);

  const [proveedores, setProveedores] = useState([]);
  const [facturasPendientesProveedores, setFacturasPendientesProveedores] =
    useState([]);

  const [idProveedorP, setIdProveedorP] = useState("");

  const [proveedorPago, setProveedorPago] = useState("");
  const [numeroFacturaPago, setNumeroFacturaPago] = useState("");
  const [descripcionPago, setDescripcionPago] = useState("");
  const [precioBrutoPago, setPrecioBrutoPago] = useState("");
  const [ivaPago, setIvaPago] = useState("");
  const [precioNetoPago, setPrecioNetoPago] = useState("");
  const [tipoComprobantePago, setTipoComprobantePago] = useState("");
  const [idProveedorPago, setIdProveedorPago] = useState("");
  const [idFacturaAPagar, setIdFacturaAPagar] = useState("");
  const [cuitEditarProveedor, setCuitEditarProveedor] = useState("");
  const [editarProveedor, setEditarProveedor] = useState("");
  const [valueProfile, setValueProfile] = useState(1);
  const { auth } = useAuth();
  const [modelo, setModelo] = useState("");
  const [patente, setPatente] = useState("");
  const [year, setYear] = useState("");
  const [nombreChofer, setNombreChofer] = useState("");
  const [apellidoChofer, setApellidoChofer] = useState("");
  const [dniChofer, setDniChofer] = useState("");
  const [emailChofer, setEmailChofer] = useState("");
  const [telefonoChofer, setTelefonoChofer] = useState("");
  const [idCamionChofer, setIdCamionChofer] = useState("");

  const [camionesProveedor, setCamionesProveedor] = useState([]);
  const [choferesProveedor, setChoferesProveedor] = useState([]);
  const [serviciosProveedor, setServiciosProveedor] = useState([]);

  const [localidadProveedor, setLocalidadProveedor] = useState("");
  const [provinciaProveedor, setProvinciaProveedor] = useState("");
  const [semisProveedor, setSemisProveedor] = useState([]);
  const [modalNuevoEquipo, setModalNuevoEquipo] = useState(false);
  const [modalAsignarEquipo, setModalAsignarEquipo] = useState(false);
  const [consultarListadoProveedores, setConsultarListadoProveedores] =
    useState(false);
  //Variables para la seccion de pagina del proveedor//
  const [seleccionVistaProveedor, setSeleccionVistaProveedor] = useState(1);

  const [idChoferEditar, setIdChoferEditar] = useState("");

  const [modalEditarChofer, setModalEditarChofer] = useState(false);
  const [modalEditarCamion, setModalEditarCamion] = useState(false);
  const [modalEditarSemi, setModalEditarSemi] = useState(false);

  const [actualizoListadoChoferes, setActualizoListadoChoferes] =
    useState(false);

  const [idCamionEditar, setIdCamionEditar] = useState("");

  const [actualizoListadoCamiones, setActualizoListadoCamiones] =
    useState(false);

  const [actualizoListadoSemis, setActualizoListadoSemis] = useState(false);

  const [idEditarSemi, setIdEditarSemi] = useState("");
  const [
    actualizarListadoUsuariosProveedor,
    setActualizarListadoUsuariosProveedor,
  ] = useState(false);
  const [nuevoEquipoActualizoListado, setNuevoEquipoActualizoListado] =
    useState(false);
  //Fin de variables seccion pagina del proveedor

  // Este effect esta para buscar ej la base el listado de clientes al abrir la seccion clientes

  const obtenerProveedores = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/proveedores", config);
      setProveedores(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const obtenerFacturasProveedores = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) return;
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };

  //       const { data } = await clienteAxios(
  //         "/proveedores/obtener-facturas",
  //         config
  //       );
  //       setFacturasPendientesProveedores(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   obtenerFacturasProveedores();
  // }, [facturasPendientesProveedores]);

  //abre o cierra el modal nuevo Proveedor
  const handleModalNuevoProveedor = () => {
    setModalNuevoProveedor(!modalNuevoProveedor);
  };

  const handleAsignarEquipo = () => {
    setModalAsignarEquipo(!modalAsignarEquipo);
  };

  const handleModalNuevoChofer = () => {
    setModalNuevoChofer(!modalNuevoChofer);
  };

  const handleModalEditarChofer = () => {
    setModalEditarChofer(!modalEditarChofer);
  };

  const handleModalEditarCamion = () => {
    setModalEditarCamion(!modalEditarCamion);
  };

  const handleModalEditarSemi = () => {
    setModalEditarSemi(!modalEditarSemi);
  };

  const handleModalNuevoSemi = () => {
    setModalNuevoSemi(!modalNuevoSemi);
  };

  const handleModalNuevoChoferP = () => {
    setModalNuevoChoferP(!modalNuevoChoferP);
  };

  const handleModalNuevoPago = () => {
    setModalNuevoPago(!modalNuevoPago);
  };

  const handleModalNuevoCamion = () => {
    setModalNuevoCamion(!modalNuevoCamion);
  };
  const handleModalNuevoCamionP = () => {
    setModalNuevoCamionP(!modalNuevoCamionP);
  };
  //abre o cierra el modal cargar factura
  const handleModalCargarFactura = () => {
    setModalCargarFactura(!modalCargarFactura);
  };

  const handleModalNuevoEquipo = () => {
    setModalNuevoEquipo(!modalNuevoEquipo);
  };

  const obtenerServiciosProveedor = async (id) => {
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
        `/servicio/obtener-servicios-proveedor/${id}`,
        config
      );
      setServiciosProveedor(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   //cierra el modal cliente 2
  const onClose = () => {
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
        handleModalNuevoProveedor();
        setCuitProveedor("");
        setTipoProveedor("");
        setNombreProveedor("");
        setDomicilioProveedor("");
        setLocalidadProveedor("");
        setProvinciaProveedor("");
        setEmailProveedor("");
      }
    });
  };

  const onCloseCargarFactura = () => {
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
        handleModalCargarFactura();
      }
    });
  };

  //   //Envia a la base de datos la informacion para un nuevo cliente
  const guardarProveedor = async (proveedor) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/proveedores", proveedor, config);

      toast.success("Proveedor creado correctamente", {
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
        setTipoProveedor("");
        setNombreProveedor("");
        setCuitProveedor("");
        setDomicilioProveedor("");
        setEmailProveedor("");
        handleModalNuevoProveedor();
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

  const cargarFactura = async (factura) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/proveedores/cargar-factura", factura, config);

      toast.success("Factura cargada correctamente", {
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

  const nuevoCamion = async (cuit, modelo, patente, year) => {
    const camion = { modelo: modelo, patente: patente, year: year };
    const id = cuit;

    console.log(camion);
    console.log(cuit);
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
        `/proveedores/nuevo-camion/${id}`,
        camion,
        config
      );

      console.log(data);

      toast.success("Camion creado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setModelo("");
      setPatente("");
      setYear("");
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

  const [modeloSemi, setModeloSemi] = useState("");
  const [patenteSemi, setPatenteSemi] = useState("");
  const [yearSemi, setYearSemi] = useState("");

  const nuevoSemi = async (cuit, modelo, patente, year) => {
    const semi = { modelo: modelo, patente: patente, year: year };
    const id = cuit;

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
        `/proveedores/nuevo-semi/${id}`,
        semi,
        config
      );

      console.log(data);

      toast.success("Camion creado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setModeloSemi("");
      setPatenteSemi("");
      setYearSemi("");
      handleModalNuevoSemi();
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

      setEditarProveedor(data.proveedor);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCamiones = async (id) => {
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
        `proveedores/obtener-camiones/${id}`,
        config
      );

      setCamionesProveedor(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerSemis = async (id) => {
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
        `proveedores/obtener-semis/${id}`,
        config
      );

      setSemisProveedor(data);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoChofer = async (id, nombre, apellido, dni, email, telefono) => {
    const chofer = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      email: email,
      telefono: telefono,
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
        `/proveedores/nuevo-chofer/${id}`,
        chofer,
        config
      );

      console.log(data);

      toast.success("Chofer creado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setNombreChofer("");
      setApellidoChofer("");
      setDniChofer("");
      setTelefonoChofer("");
      setEmailChofer("");
      setIdCamionChofer("");
      handleModalNuevoChofer();
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

  const obtenerChoferes = async (id) => {
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
        `proveedores/obtener-choferes/${id}`,
        config
      );

      setChoferesProveedor(data);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoEquipo = async (id, idChofer, idCamion, idSemi) => {
    const equipo = {
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
        `/proveedores/nuevo-equipo/${id}`,
        equipo,
        config
      );

      toast.success("Equipo creado correctamente", {
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

  const [equiposData, setEquiposData] = useState([]);

  const obtenerEquipos = async (id) => {
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
        `proveedores/obtener-equipos/${id}`,
        config
      );

      setEquiposData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarChofer = async (id, nombre, apellido, dni, email, telefono) => {
    const info = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      telefono: telefono,
      email,
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
        `/proveedores/editar-chofer/${id}`,
        info,
        config
      );

      //Mostrar la alerta
      toast.success("Chofer Editado Correctamente", {
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

  const editarCamion = async (id, modelo, patente, year) => {
    const info = {
      modelo: modelo,
      patente: patente,
      year: year,
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
        `/proveedores/editar-camion/${id}`,
        info,
        config
      );

      //Mostrar la alerta
      toast.success("Camion Editado Correctamente", {
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

  const editarSemi = async (id, modelo, patente, year) => {
    const info = {
      modelo: modelo,
      patente: patente,
      year: year,
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
        `/proveedores/editar-semi/${id}`,
        info,
        config
      );

      //Mostrar la alerta
      toast.success("Semi Editado Correctamente", {
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

  const [usuariosEmpresaProveedor, setUsuariosEmpresaProveedor] = useState([]);

  const obtenerUsuariosPorEmpresaProveedor = async (id) => {
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
        `usuarios/listado-por-empresa-proveedor/${id}`,
        config
      );
      setUsuariosEmpresaProveedor(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProveedoresContext.Provider
      value={{
        obtenerChoferes,
        nuevoChofer,
        camionesProveedor,
        obtenerCamiones,
        obtenerProveedor,
        modalNuevoProveedor,
        handleModalNuevoProveedor,
        modalCargarFactura,
        handleModalCargarFactura,

        onClose,
        onCloseCargarFactura,
        seleccionProveedor,
        setSeleccionProveedor,
        tipoProveedor,
        setTipoProveedor,
        nombreProveedor,
        setNombreProveedor,
        domicilioProveedor,
        setDomicilioProveedor,
        emailProveedor,
        setEmailProveedor,
        cuitProveedor,
        setCuitProveedor,

        guardarProveedor,
        proveedores,
        setProveedores,
        cargarFactura,
        facturasPendientesProveedores,
        handleModalNuevoPago,
        modalNuevoPago,
        proveedorPago,
        setProveedorPago,
        numeroFacturaPago,
        setNumeroFacturaPago,
        descripcionPago,
        setDescripcionPago,
        precioBrutoPago,
        setPrecioBrutoPago,
        ivaPago,
        setIvaPago,
        precioNetoPago,
        setPrecioNetoPago,
        tipoComprobantePago,
        setTipoComprobantePago,
        idProveedorPago,
        setIdProveedorPago,
        idFacturaAPagar,
        setIdFacturaAPagar,
        cuitEditarProveedor,
        setCuitEditarProveedor,
        editarProveedor,
        setEditarProveedor,
        valueProfile,
        setValueProfile,
        handleModalNuevoCamion,
        modalNuevoCamion,
        nuevoCamion,
        modelo,
        setModelo,
        patente,
        setPatente,
        year,
        setYear,
        handleModalNuevoChofer,
        modalNuevoChofer,
        nombreChofer,
        setNombreChofer,
        apellidoChofer,
        setApellidoChofer,
        dniChofer,
        setDniChofer,
        emailChofer,
        setEmailChofer,
        telefonoChofer,
        setTelefonoChofer,
        idCamionChofer,
        setIdCamionChofer,
        choferesProveedor,
        seleccionVistaProveedor,
        setSeleccionVistaProveedor,
        obtenerServiciosProveedor,
        serviciosProveedor,
        modalNuevoChoferP,
        handleModalNuevoChoferP,
        handleModalNuevoCamionP,
        modalNuevoCamionP,
        localidadProveedor,
        setLocalidadProveedor,
        provinciaProveedor,
        setProvinciaProveedor,
        handleModalNuevoSemi,
        modalNuevoSemi,
        modeloSemi,
        setModeloSemi,
        patenteSemi,
        setPatenteSemi,
        yearSemi,
        setYearSemi,
        nuevoSemi,
        obtenerSemis,
        semisProveedor,
        handleModalNuevoEquipo,
        modalNuevoEquipo,
        nuevoEquipo,
        obtenerEquipos,
        equiposData,
        handleAsignarEquipo,
        modalAsignarEquipo,
        obtenerProveedores,
        consultarListadoProveedores,
        setConsultarListadoProveedores,
        handleModalEditarChofer,
        modalEditarChofer,
        idChoferEditar,
        setIdChoferEditar,
        editarChofer,
        actualizoListadoChoferes,
        setActualizoListadoChoferes,
        handleModalEditarCamion,
        modalEditarCamion,
        idCamionEditar,
        setIdCamionEditar,
        editarCamion,
        actualizoListadoCamiones,
        setActualizoListadoCamiones,
        handleModalEditarSemi,
        modalEditarSemi,
        idEditarSemi,
        setIdEditarSemi,
        editarSemi,
        actualizoListadoSemis,
        setActualizoListadoSemis,
        nuevoEquipoActualizoListado,
        setNuevoEquipoActualizoListado,
        usuariosEmpresaProveedor,
        obtenerUsuariosPorEmpresaProveedor,
        actualizarListadoUsuariosProveedor,
        setActualizarListadoUsuariosProveedor,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};

export { ProveedoresProvider };

export default ProveedoresContext;

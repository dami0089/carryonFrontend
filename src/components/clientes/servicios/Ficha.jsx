import { Button, Card, Typography } from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import useMinutas from "@/hooks/useMinutas";

import useMensajeria from "@/hooks/useMensajeria";
import ListadoViajesProveedores from "./ListadoViajesProveedores";
import Swal from "sweetalert2";
import Cargando from "@/components/deTodos/Cargando";
import { useNavigate } from "react-router-dom";

const Ficha = () => {
  const { setCuitEditar } = useClientes();

  const navigate = useNavigate();

  const { handleModalMinutas } = useMinutas();

  const { handleModalMensajeria } = useMensajeria();

  const {
    camionesObtenerServicio,
    destinoCargaObtenerServicio,
    nombreClienteObtenerServicio,
    origenCargaObtenerServicio,
    estadoObtenerServicio,
    handleModalModificarEstadoServicio,
    obtenerServicio,
    idObtenerServicio,
    cambiarEstado,
    tipoOperacionObtenerServicio,
    setCoincidoEstado,
    handleCargando,
    observacionesObtenerServicio,
    notificarViajes,
    editeViaje,
    setEditeViaje,
    obtenerViajesServicio,
    handleModalAgregarObservaciones,
    eliminarServicio,
    tipoCargaObtenerServicio,
    agregarViajes,
    setSeAsignoProveedor,
    actualizarEstadoServicio,
    setActualizarEstadoServicio,
    clienteObtenerServicio,
    despachoDeAduanaObtenerServicio,
    numeroCliente,
  } = useServicios();

  const handleNuevoServicio = () => {
    handleModalMinutas();
  };

  const handleMensajeria = () => {
    handleModalMensajeria();
  };

  const handleEstadoServicio = () => {
    setCoincidoEstado(true);
    handleModalModificarEstadoServicio();
  };

  useEffect(() => {
    const obtenerViajes = async () => {
      if (actualizarEstadoServicio) {
        handleCargando();
        await obtenerViajesServicio(idObtenerServicio);
        setActualizarEstadoServicio(false);
        handleCargando();
      }
    };
    obtenerViajes();
  }, [actualizarEstadoServicio]);

  const [actualizarListas, setActualizarListas] = useState(false);

  useEffect(() => {
    const actualizar = async () => {
      handleCargando();
      await obtenerServicio(idObtenerServicio);
      handleCargando();
    };
    actualizar();
  }, []);

  useEffect(() => {
    const actualizar = async () => {
      handleCargando();
      await obtenerServicio(idObtenerServicio);
      handleCargando();
    };
    actualizar();
  }, [cambiarEstado]);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (editeViaje) {
        handleCargando();
        await obtenerViajesServicio(idObtenerServicio);
        setEditeViaje(false);
        handleCargando();
      }
    };
    obtenerViajes();
  }, [editeViaje]);

  useEffect(() => {
    const actualizar = async () => {
      if (actualizarListas) {
        await obtenerServicio(idObtenerServicio);
        setActualizarListas(false);
        handleCargando();
      }
    };
    actualizar();
  }, [actualizarListas]);

  const handleReturnProfile = (e) => {
    setCuitEditar(clienteObtenerServicio);
    navigate("/clientes/ficha-cliente");
  };

  const handleNotificar = async () => {
    Swal.fire({
      title: "Queres notificar al cliente?",
      text: "Si tiene usuario cargado se enviara un mail con la informacion de los viajes",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await notificarViajes(idObtenerServicio);
        setActualizarListas(true);
      }
    });
  };

  const handleEliminarServicio = () => {
    Swal.fire({
      title: "Queres eliminar el servicio?",
      text: "Esto eliminara tambien los viajes",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.href = "/inicio"; // Redirección utilizando window.location.href
        handleCargando();
        await eliminarServicio(idObtenerServicio);

        handleCargando();
      }
    });
  };

  const handleAgregarObservaciones = () => {
    handleModalAgregarObservaciones();
  };

  const handleAgregarViaje = async () => {
    Swal.fire({
      title: "Seguro queres agregar un nuevo viaje?",
      text: "Esto agregara uno nuevo al listado",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await agregarViajes(idObtenerServicio);
        handleCargando();
        setSeAsignoProveedor(true);
      }
    });
  };

  return (
    <>
      <div className="mb-12 grid grid-cols-2 gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2 ">
        <div>
          <div className="mb-5">
            <Card
              className={`text-blue h-10 bg-yellow-700 pb-2 pt-2 text-center font-bold uppercase`}
              fullWidth
            >
              Estado: {estadoObtenerServicio}
            </Card>
          </div>
          <Card className="mt-2 p-4">
            <Typography variant="small" className="mb-2 text-2xl font-bold">
              Información
            </Typography>
            <Typography variant="small" className="mb-1">
              <span className="text-l font-bold">Nombre Cliente: </span>
              <spane
                onClick={(e) => handleReturnProfile(e)}
                className="cursor-pointer text-blue-500"
              >
                {nombreClienteObtenerServicio}
              </spane>
            </Typography>
            <Typography variant="small" className="mb-1">
              <span className="font-bold">Origen: </span>{" "}
              {origenCargaObtenerServicio}
            </Typography>
            <Typography variant="small" className="mb-1">
              <span className="font-bold">Destino: </span>{" "}
              {destinoCargaObtenerServicio}
            </Typography>
            <Typography variant="small" className="mb-1">
              <span className="font-bold">Cantidad: </span>{" "}
              {camionesObtenerServicio}
            </Typography>
            <Typography variant="small" className="mb-1">
              <span className="font-bold">Despacho: </span>{" "}
              {despachoDeAduanaObtenerServicio}
            </Typography>
            <Typography variant="small" className="mb-1">
              <span className="font-bold">NumeroCliente: </span> {numeroCliente}
            </Typography>
          </Card>
        </div>

        <div className=" flex flex-col justify-start">
          <div className="mb-2">
            <Button
              className={`bg-red-500`}
              fullWidth
              onClick={(e) => handleEliminarServicio()}
            >
              Eliminar Servicio
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-700`}
              fullWidth
              onClick={(e) => handleNuevoServicio()}
            >
              Agregar Minuta
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-600`}
              fullWidth
              onClick={(e) => handleMensajeria()}
            >
              Mensajeria
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-500`}
              fullWidth
              onClick={(e) => handleEstadoServicio()}
            >
              Cambiar Estado
            </Button>
          </div>

          <div className="mb-2">
            <Button
              className={`bg-blue-gray-400`}
              fullWidth
              onClick={(e) => handleNotificar()}
            >
              Notificar Servicio
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-300`}
              fullWidth
              onClick={(e) => handleAgregarObservaciones()}
            >
              Editar Observaciones del servicio
            </Button>
          </div>
          {tipoCargaObtenerServicio === "cajas" ||
          tipoCargaObtenerServicio === "pallets" ||
          tipoCargaObtenerServicio === "bultos" ||
          tipoOperacionObtenerServicio === "vacios" ? (
            <div className="mb-2">
              <Button
                className={`bg-blue-gray-300`}
                fullWidth
                onClick={(e) => handleAgregarViaje()}
              >
                Agregar Viaje
              </Button>
            </div>
          ) : (
            ""
          )}

          <div className=" mb-2">
            <Typography className="font-bold text-black">
              Observaciones:
            </Typography>

            <Typography className="font-bold text-red-300">
              {observacionesObtenerServicio}
            </Typography>
          </div>
        </div>
      </div>
      <ListadoViajesProveedores />
      <Cargando />
    </>
  );
};

export default Ficha;

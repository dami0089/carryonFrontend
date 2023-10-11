import { Typography, Button } from "@material-tailwind/react";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { SpinnerCircular } from "spinners-react";
import { ProfileInfoCard } from "@/widgets/cards";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";

import { formatearFecha } from "@/data/helpers/formatearFecha";

import useMinutas from "@/hooks/useMinutas";
import ListadoMinutasServicio from "../clientes/servicios/ListadoMinutasServicio";
import useAuth from "@/hooks/useAuth";
import useProveedores from "@/hooks/useProveedores";
// import AnimacionEspera from "./animacionEspera";
import ListadoHistorialServicio from "./ListadoHistorialServicio";
import AnimacionEspera from "./animacionEspera";
import AnimacionEquipos from "../pagina-proveedores/AnimacionEquipos";
import AnimacionEquiposAsignados from "./animacionEquiposAsignados";
// import AnimacionEquiposAsignados from "./animacionEquiposAsignados";

export function ProfileServicioVistaCliente() {
  const {
    cuitEditar,
    setSeleccion,
    obtenerCliente,
    valueProfile,
    formaDePago,

    cargando,
    setConfiguracionDelCliente,
  } = useClientes();

  const { handleModalMinutas } = useMinutas();

  const { auth } = useAuth();

  const {
    camionesObtenerServicio,
    destinoCargaObtenerServicio,
    fechaCargaObtenerServicio,
    horaCargaObtenerServicio,
    nombreClienteObtenerServicio,
    numeroPedidoObtenerServicio,
    origenCargaObtenerServicio,
    idObtenerServicio,
    handleModalAsignarProveedor,
    estadoObtenerServicio,
    handleModalAsignarChoferes,
    cantidadModales,
    aceptarServicioProveedor,
    handleCargando,
  } = useServicios();

  const { setSeleccionVistaProveedor } = useProveedores();

  const [renderizo, setRenderizo] = useState(false);

  useEffect(() => {
    const traerData = async () => {
      if (cuitEditar) {
        handleCargando();
        await obtenerCliente(cuitEditar);
        handleCargando();
      }
    };
    traerData();
    setConfiguracionDelCliente("Configuracion del Cliente");
  }, [renderizo]);

  useEffect(() => {
    formaDePago;
  }, [formaDePago]);

  const handleBack = (e) => {
    e.preventDefault();
    setSeleccion(1);
  };

  const handleNuevoServicio = () => {
    handleModalMinutas();
  };

  const handleAsignarProveedor = () => {
    handleModalAsignarProveedor();
  };

  const handleAsignarChoferes = () => {
    if (cantidadModales <= parseInt(camionesObtenerServicio)) {
      handleModalAsignarChoferes();
    }
  };

  const handleAceptarServicio = async () => {
    await aceptarServicioProveedor(idObtenerServicio, auth.nombre, auth._id);
  };

  return (
    <>
      {cargando ? (
        <div className="flex h-screen items-center justify-center">
          <SpinnerCircular />
        </div>
      ) : (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 h-10 animate-bounce bg-green-500 pt-4 pb-4 text-center font-bold text-white">
            {estadoObtenerServicio}
          </div>

          <div className="container mx-auto px-4 pt-8">
            <div className="mb-10 flex items-center justify-between">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-gray-500 hover:text-blue-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleBack}
              >
                <ArrowLeftCircleIcon className="h-6 w-6" />
              </button>
              <Typography variant="h5" color="blue-gray" className="mb-1">
                Ficha Servicio: {numeroPedidoObtenerServicio}
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Typography className="mb-4 font-bold uppercase">
                Informacion
              </Typography>
              <div className="flex">
                <div className="grid grid-cols-1 gap-6 border-r md:grid-cols-2">
                  <ProfileInfoCard
                    details={{
                      "Nombre Cliente": `${nombreClienteObtenerServicio}`,
                      "Fecha de Carga": `${formatearFecha(
                        fechaCargaObtenerServicio
                      )}`,
                      "Hora de Carga": `${horaCargaObtenerServicio} hs`,
                      Origen: `${origenCargaObtenerServicio}`,
                      Destino: `${destinoCargaObtenerServicio}`,
                      "Cantidad Camiones": `${camionesObtenerServicio}`,
                    }}
                  />
                </div>
                <div>
                  {estadoObtenerServicio === "Aceptado" ? (
                    <AnimacionEspera />
                  ) : estadoObtenerServicio === "Coordinado" ? (
                    <AnimacionEquiposAsignados />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Typography className="mt-5 font-bold">
                Historial de Servicio
              </Typography>
              <div className="mt-8">
                <ListadoHistorialServicio />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileServicioVistaCliente;

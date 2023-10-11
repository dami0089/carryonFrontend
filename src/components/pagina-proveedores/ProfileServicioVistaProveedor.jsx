import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import { ArrowLeftCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

import { SpinnerCircular } from "spinners-react";
import { ProfileInfoCard } from "@/widgets/cards";

import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import ModalAgregarUsuario from "../usuarios/ModalAgregarUsuario";

import ModalEditarUsuario from "../usuarios/ModalEditarUsuario";

import { formatearFecha } from "@/data/helpers/formatearFecha";

import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

import ModalAsignarProveedor from "../proveedores/ModalAsignarProveedor";

import ModalAsignarChoferes from "../proveedores/ModalAsignarChoferes";

import ModalNuevaMinuta from "../clientes/servicios/ModalNuevaMinuta";
import useMinutas from "@/hooks/useMinutas";

import useAuth from "@/hooks/useAuth";
import useProveedores from "@/hooks/useProveedores";
import ListadoEquipoAsignado from "../clientes/servicios/ListadoEquipoAsignado";
import ModalAsignarEquipo from "./ModalAsignarEquipo";

export function ProfileServicioVistaProveedor() {
  const {
    cuitEditar,

    obtenerCliente,

    valueProfile,
    setValueProfile,

    formaDePago,

    cargando,

    setConfiguracionDelCliente,
  } = useClientes();

  const { handleModalMinutas } = useMinutas();

  const { auth } = useAuth();

  const { obtenerServicio, viajeObtenido } = useServicios();

  const {
    camionesObtenerServicio,

    idObtenerServicio,

    handleModalAsignarProveedor,
    estadoObtenerServicio,

    handleModalAsignarChoferes,
    cantidadModales,

    aceptarServicioProveedor,
    idProvisorioServicio,
    obtenerViaje,
  } = useServicios();

  const [aceptarServicio, setAceptarServicio] = useState(false);

  const { setSeleccionVistaProveedor, handleAsignarEquipo } = useProveedores();

  const [renderizo, setRenderizo] = useState(false);

  useEffect(() => {
    const traerData = async () => {
      if (cuitEditar) {
        await obtenerCliente(cuitEditar);
      }
    };
    traerData();

    // obtenerUs(obtenerUs);
    setConfiguracionDelCliente("Configuracion del Cliente");
  }, []);

  useEffect(() => {
    const obtenerServicioActualizado = async () => {
      await obtenerServicio(idProvisorioServicio);
    };
    obtenerServicioActualizado;
  }, [aceptarServicio]);

  useEffect(() => {
    formaDePago;
  }, [formaDePago]);

  const handleBack = (e) => {
    e.preventDefault();

    setSeleccionVistaProveedor(1);
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
    setAceptarServicio(true);
  };

  const handleAsignar = () => {
    handleAsignarEquipo();
  };

  return (
    <>
      {cargando ? (
        <div className="text-center align-middle">
          <SpinnerCircular />
        </div>
      ) : (
        <>
          <ToastContainer pauseOnFocusLoss={false} />

          <button
            type="button"
            className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={(e) => handleBack(e)}
          >
            <ArrowLeftCircleIcon />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </button>
          <div className="relative h-10 w-full overflow-hidden rounded-xl bg-center">
            <div className=" absolute inset-0 h-full w-full " />
          </div>

          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      Numero de Viaje: {viajeObtenido.numeroDeViaje}
                    </Typography>
                  </div>
                </div>
                <div className="block w-96">
                  <Tabs value="app">
                    <TabsHeader>
                      <Tab value="app" onClick={(e) => setValueProfile(1)}>
                        <BuildingOfficeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Cliente
                      </Tab>

                      <Tab value="settings" onClick={(e) => setValueProfile(3)}>
                        <ClockIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Historial
                      </Tab>
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>
              {valueProfile == 1 ? (
                <>
                  <div className="mb-12 grid grid-cols-2 gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2 ">
                    <div>
                      <ProfileInfoCard
                        title="Informacion"
                        details={{
                          "Nombre Cliente": `${viajeObtenido.nombreCliente}`,
                          "Fecha de Carga": `${formatearFecha(
                            viajeObtenido.fechaOrigen
                          )}`,
                          "Hora de Carga": `${
                            viajeObtenido.horaCaraga
                              ? viajeObtenido.horaCaraga + " hs"
                              : "-"
                          }`,
                          Origen: `${
                            viajeObtenido.nombreDomicilioOrigenCliente
                              ? viajeObtenido.nombreDomicilioOrigenCliente
                              : viajeObtenido.nombreDomicilioOrigenTerminal
                          }`,
                          Destino: `${
                            viajeObtenido.nombreDomicilioDestinoCliente
                              ? viajeObtenido.nombreDomicilioDestinoCliente
                              : nombreDomicilioDestinoTerminal
                          }`,
                          "Numero de Contenedor": `${
                            viajeObtenido.numeroContenedor
                              ? viajeObtenido.numeroContenedor
                              : "No informado aun"
                          }`,

                          // "Fecha de Vencimiento": `${formatearFecha(
                          //   editarCliente.fechaVencimiento
                          // )}`,
                        }}
                      />
                    </div>
                    <div className=" flex flex-col justify-start">
                      <div className="mb-2 text-center">
                        <Button className="bg-deep-orange-400" disabled={true}>
                          Estado: {viajeObtenido.estado}
                        </Button>
                      </div>
                      <Button
                        onClick={(e) => handleAsignar()}
                        className="bg-gray-700"
                      >
                        Asignar Equipos
                      </Button>
                      <Button className="mt-2 bg-gray-600">Mensaje</Button>

                      <div className="mb-2">
                        {estadoObtenerServicio ===
                        "Esperando confirmacion del proveedor" ? (
                          <>
                            <Button
                              className={`mr-4 bg-green-500
                           text-white`}
                              onClick={(e) => handleAceptarServicio()}
                            >
                              Aceptar Servicio
                            </Button>
                            <Button
                              className={`}
                          bg-red-300`}
                              onClick={(e) => handleNuevoServicio()}
                            >
                              Rechazar Servicio
                            </Button>
                          </>
                        ) : estadoObtenerServicio ===
                          "Aceptado, esperando equipos" ? (
                          <>
                            <Button
                              className={`mr-4 bg-green-500
                           text-white`}
                              onClick={(e) => handleAceptarServicio()}
                            >
                              Asignar Equipo
                            </Button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <ListadoEquipoAsignado />
                </>
              ) : valueProfile == 3 ? (
                <>
                  <Typography className="mb-5 font-bold">
                    Historial Servicio
                  </Typography>
                  <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {[
                            "Fecha",
                            "Concepto",
                            "Importe",
                            "Notas",
                            "Accion",
                          ].map((el) => (
                            <th
                              key={el}
                              className="border-b border-blue-gray-50 py-3 px-6 text-left"
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
                    </table>
                  </CardBody>
                </>
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </>
      )}
      <ModalAgregarUsuario />

      <ModalEditarUsuario />

      <ModalAsignarProveedor />
      <ModalAsignarChoferes />
      <ModalNuevaMinuta />
      <ModalAsignarEquipo />
    </>
  );
}

export default ProfileServicioVistaProveedor;

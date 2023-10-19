import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { ordersOverviewData, statisticsChartsData } from "@/data";

import useClientes from "@/hooks/useClientes";
import {
  ArrowPathIcon,
  BanknotesIcon,
  BellIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  RocketLaunchIcon,
  TruckIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import useServicios from "@/hooks/useServicios";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import ModalNuevoServicio from "@/components/clientes/servicios/ModalNuevoServicio";
import ModalNuevoServicio2 from "@/components/clientes/servicios/ModalNuevoServicio2";
import ModalNuevoServicio3 from "@/components/clientes/servicios/ModalNuevoServicio3";
import ModalNuevoServicio4 from "@/components/clientes/servicios/ModalNuevoServicio4";
import ModalAsignarProveedor from "@/components/proveedores/ModalAsignarProveedor";
import ModalCargarNumeroContenedores from "@/components/clientes/servicios/ModalCargarNumeroContenedores";
import { ToastContainer } from "react-toastify";

import ModalModificarEstadoViaje from "@/components/clientes/servicios/ModalModificarEstadoViaje";
import ListadoViajesSinNotificar from "@/components/inicio/ListadoViajesSinNotificar";

import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";
import Cargando from "@/components/deTodos/Cargando";
import ModalReasignarProveedor from "@/components/clientes/servicios/ModalReasignarProveedor";
import ModalAsignarEquipoEditarViaje from "@/components/clientes/servicios/ModalAsignarEquipoEditarViaje";
import ResultadoBusqueda from "@/components/inicio/ResultadoBusqueda";
import ModalNuevoDomicilio from "@/components/clientes/profileCliente/ModalNuevoDomicilio";
import ModalEditarViaje from "@/components/clientes/servicios/ModalEditarViaje";
import ModalTerminarViaje from "@/components/clientes/servicios/ModalTerminarViaje";
import ModalDevolucion from "@/components/clientes/servicios/ModalDevolucion";
import ModalEditarDomicilio from "@/components/clientes/profileCliente/ModalEditarDomicilio";
import ModalDevolucionMasDeUnContendor from "@/components/clientes/servicios/ModalDevolucionMasDeUnContendor";
import ModalModificarEstadoServicio from "@/components/clientes/servicios/ModalModificarEstadoServicio";
import ModalEditarContenedorListado from "@/components/clientes/servicios/ModalEditarContenedorDesdeListados";
import ProfileProveedor from "@/components/proveedores/ProfileProveedor";
import ModalResumenNuevo from "@/components/clientes/servicios/ModalResumenNuevo";
import Qr from "@/components/pruebas/Qr";

export function Home() {
  const navigate = useNavigate();
  const {
    selectInicio,
    setSelectInicio,
    handleModalNuevoServicio,
    modalNuevoServicio,
    modalNuevoServicio2,
    modalNuevoServicio3,
    modalResumen,
    modalNuevoServicio4,
    modalDomicilio,
    setSeleccion,
    modalEditarDomicilio,
    seleccionComercial,
    setSeleccionComercial,
  } = useClientes();

  const {
    conteoServicios,
    cargasHoy,
    conteoManana,
    actualizaciones,
    obtenerActualizaciones,
    buscoActualizaciones,
    setBuscoActualizaciones,
    obtenerServicios,
    obtenerServiciosHoy,
    obtenerServiciosManana,
    recargoProximosViajes,
    setRecargoProximosViajes,
    modalAsignarProveedor,
    modalContenedores,
    modalEstadoViaje,
    modalTerminarViaje,
    modalCargarDevolucion,
    setPaginaLogisticaSelector,
    modalEditarViaje,
    modalReAsignarEquipos,
    modalCargarDevolucionEditar,
    modalReAsignarProveedor,
    modalModificarEstadoServicio,
    modalEditarContenedorDesdeListados,
    handleModalQr,
    modalQr,
    countTomorrow,
    obtenerServiciosdespuesdehoy,
  } = useServicios();

  const handleSeleccion = (e) => {
    e.preventDefault();
    // setSelectInicio(2);
    navigate("/coordinacion/listado-viajes-anteriores");
  };

  const handleSeleccion2 = (e) => {
    e.preventDefault();
    // setSelectInicio(3);
    navigate("/coordinacion/listado-viajes-hoy");
  };

  const handleSeleccion3 = (e) => {
    e.preventDefault();
    // setSelectInicio(4);
    navigate("/coordinacion/listado-viajes-proximos-dias");
  };

  const handleSeleccion4 = (e) => {
    e.preventDefault();
    // setSelectInicio(10);
    navigate("/coordinacion/listado-viajes-manana");
  };

  const handleNuevoServicio = () => {
    handleModalNuevoServicio();
  };

  useEffect(() => {
    const obtenerActus = async () => {
      await obtenerActualizaciones();
    };
    obtenerActus();
  }, []);

  useEffect(() => {
    setSeleccion(1);
    setSeleccionComercial(1);
  }, []);

  useEffect(() => {
    setSeleccionComercial(1);
  }, []);

  useEffect(() => {
    setPaginaLogisticaSelector(100);
  }, []);

  useEffect(() => {
    const obtenerActus = async () => {
      if (buscoActualizaciones) {
        await obtenerActualizaciones();
        setBuscoActualizaciones(false);
      }
    };
    obtenerActus();
  }, [buscoActualizaciones]);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServicios();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServiciosManana();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServiciosdespuesdehoy();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerServiciosHoy();
    };
    obtenerServ();
  }, []);

  useEffect(() => {
    const actualizoNumeros = async () => {
      if (recargoProximosViajes) {
        await obtenerServicios();
        await obtenerServiciosManana();
        await obtenerServiciosdespuesdehoy();
        await obtenerServiciosHoy();
        setRecargoProximosViajes(false);
      }
    };
    actualizoNumeros();
  }, [recargoProximosViajes]);

  return (
    <>
      {selectInicio === 1 ? (
        <>
          <div className="mt-12">
            <ToastContainer pauseOnFocusLoss={false} />

            <div className="mb-8 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
              <Card
                className="cursor-pointer"
                onClick={(e) => handleSeleccion(e)}
              >
                <StatisticsCard
                  key="1"
                  title="Sin cerrar dias anteriores"
                  icon={<ChevronDoubleLeftIcon className=" h-8 w-8 " />}
                  color="white"
                  footer={
                    <Typography className="text-center text-xl font-normal text-blue-gray-600">
                      <strong className="text-green-500">
                        {conteoServicios}
                      </strong>
                    </Typography>
                  }
                />
              </Card>
              <Card
                className="cursor-pointer"
                onClick={(e) => handleSeleccion2(e)}
              >
                <StatisticsCard
                  key="2"
                  title="Coordinados para hoy"
                  icon={<CalendarDaysIcon className=" h-8 w-8" />}
                  color="white"
                  footer={
                    <Typography className="text-center text-xl font-normal text-blue-gray-600">
                      <strong className="text-green-500">{cargasHoy}</strong>
                    </Typography>
                  }
                />
              </Card>
              <Card
                className="cursor-pointer"
                onClick={(e) => handleSeleccion4(e)}
              >
                <StatisticsCard
                  key="3"
                  title="Cordinados Mañana"
                  icon={<ChevronDoubleRightIcon className="h-8 w-8 " />}
                  color="white"
                  footer={
                    <Typography className="text-center text-xl font-normal text-blue-gray-600">
                      <strong className="text-green-500">
                        {countTomorrow}
                      </strong>
                    </Typography>
                  }
                />
              </Card>
              <Card
                className="cursor-pointer"
                onClick={(e) => handleSeleccion3(e)}
              >
                <StatisticsCard
                  key="3"
                  title="Proximos dias"
                  icon={<ChevronDoubleRightIcon className="h-8 w-8 " />}
                  color="white"
                  footer={
                    <Typography className="text-center text-xl font-normal text-blue-gray-600">
                      <strong className="text-green-500">{conteoManana}</strong>
                    </Typography>
                  }
                />
              </Card>
            </div>
            <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-2">
              <Card
                onClick={(e) => handleNuevoServicio()}
                className="cursor-pointer"
              >
                <Card
                  variant="gradient"
                  color="white"
                  className="absolute -mt-4 grid h-10 w-10 place-items-center"
                >
                  <PlusIcon className="h-8 w-8" />
                </Card>
                <CardBody className="p-4 text-right">
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Crear Nuevo Servicio
                  </Typography>
                </CardBody>
              </Card>
              <Card
                onClick={(e) => setSelectInicio(6)}
                className="cursor-pointer"
              >
                <Card
                  variant="gradient"
                  color="white"
                  className="absolute -mt-4 grid h-10 w-10 place-items-center"
                >
                  <BellAlertIcon className="h-8 w-8" />
                </Card>
                <CardBody className="p-4 text-right">
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Pedidos por notificar
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <div className="mb-3 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {statisticsChartsData.map((props) => (
                <StatisticsChart key={props.title} {...props} />
              ))}
              <Card>
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Ultimos Actualizaciones
                  </Typography>
                </CardHeader>
                <CardBody className="pt-0">
                  {actualizaciones.map(
                    ({ icon, color, title, description, _id }, key) => (
                      <div key={_id} className="flex items-start gap-4 py-3">
                        <div
                          className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                            key === ordersOverviewData.length - 1
                              ? "after:h-0"
                              : "after:h-4/6"
                          }`}
                        >
                          {icon === "PlusCircleIcon" ? (
                            <PlusCircleIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "BellIcon" ? (
                            <BellIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "BanknotesIcon" ? (
                            <BanknotesIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "TruckIcon" ? (
                            <TruckIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "EnvelopeIcon" ? (
                            <EnvelopeIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "InformationCircleIcon" ? (
                            <InformationCircleIcon
                              className={`h-5 w-5 ${color} `}
                            />
                          ) : (
                            ""
                          )}

                          {icon === "CheckIcon" ? (
                            <CheckIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "RocketLaunchIcon" ? (
                            <RocketLaunchIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "BuildingLibraryIcon" ? (
                            <BuildingLibraryIcon
                              className={`h-5 w-5 ${color} `}
                            />
                          ) : (
                            ""
                          )}

                          {icon === "ArrowPathIcon" ? (
                            <ArrowPathIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "PencilSquareIcon" ? (
                            <PencilSquareIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "UserGroupIcon" ? (
                            <UserGroupIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "UsersIcon" ? (
                            <UsersIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}

                          {icon === "UserPlusIcon" ? (
                            <UserPlusIcon className={`h-5 w-5 ${color} `} />
                          ) : (
                            ""
                          )}
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="block font-medium"
                          >
                            {title}
                          </Typography>
                          <Typography
                            as="span"
                            variant="small"
                            className="text-xs font-medium text-blue-gray-500"
                          >
                            {formatearFechaNuevo(description)}
                          </Typography>
                        </div>
                      </div>
                    )
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      ) : selectInicio === 6 ? (
        <ListadoViajesSinNotificar />
      ) : selectInicio === 7 ? (
        <ResultadoBusqueda />
      ) : selectInicio === 9 ? (
        <ProfileProveedor />
      ) : (
        ""
      )}
      {modalNuevoServicio ? <ModalNuevoServicio /> : ""}
      {modalNuevoServicio2 ? <ModalNuevoServicio2 /> : ""}
      {modalNuevoServicio3 ? <ModalNuevoServicio3 /> : ""}
      {modalNuevoServicio4 ? <ModalNuevoServicio4 /> : ""}
      {/* {modalResumen ? <ModalResumenServicio /> : ""} */}
      {modalResumen ? <ModalResumenNuevo /> : ""}
      {modalDomicilio ? <ModalNuevoDomicilio /> : ""}
      {modalAsignarProveedor ? <ModalAsignarProveedor /> : ""}
      {modalContenedores ? <ModalCargarNumeroContenedores /> : ""}
      {modalEstadoViaje ? <ModalModificarEstadoViaje /> : ""}
      {modalModificarEstadoServicio ? <ModalModificarEstadoServicio /> : ""}
      {modalTerminarViaje ? <ModalTerminarViaje /> : ""}
      {modalEditarDomicilio ? <ModalEditarDomicilio /> : ""}
      {modalEditarViaje ? <ModalEditarViaje /> : ""}
      {modalCargarDevolucion ? <ModalDevolucion /> : ""}
      {modalQr ? <Qr /> : ""}
      {modalReAsignarEquipos ? <ModalAsignarEquipoEditarViaje /> : ""}
      {modalCargarDevolucionEditar ? <ModalDevolucionMasDeUnContendor /> : ""}
      {modalEditarContenedorDesdeListados ? (
        <ModalEditarContenedorListado />
      ) : (
        ""
      )}
      {modalReAsignarProveedor ? <ModalReasignarProveedor /> : ""}

      <Cargando />
    </>
  );
}

export default Home;

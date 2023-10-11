import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import {
  ArrowLeftCircleIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalculatorIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
  ScaleIcon,
  TruckIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/solid";
import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";
import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";

const ModalResumenServicio = () => {
  const {
    obtenerCliente,
    clienteNombreResumen,

    //Variables Nuevas
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
    observacionesCarga,
    otrosServicio,
    nroInternoCliente,
    despachoDeAduana,
    numeroDeContenedores,

    nuevaImportacion,
    nuevaExportacion,
    nuevoTransito,
    nuevoNacional,
    buscoDomi,
    setBuscoDomi,
    terminales,
    setIdClienteServicio,
    setTipoServicio,
    setFechadeCarga,
    setHoraDeCarga,
    setTipoDeCarga,
    setCantidadCarga,
    setPesoCarga,
    setVolumenCarga,
    setOrigenCarga,
    setDestinoCarga,
    setObservacionesCarga,
    setNroInternoCliente,
    setDespachoDeAduana,
    setNumeroDeContenedores,
    setOtrosServicio,
    setComprobarContenedores,
    handleCloseModalServicio,
    comprobarCierre,
    setComprobarCierre,

    setRecargoProximosViajes,
    handleCargando,
    handleModalReasignarEquipos,
    setDireccionesEntrega,
    setNumeroContenedoresCargados,
    playas,
    obtenerPlayas,
    nuevaDevolucionVacios,

    nuevaRoundTripExpo,
    playaOrigen,
    setPlayaOrigen,
    nuevoEmptyPick,
  } = useServicios();
  const {
    handleModalResumenBack,
    handleModalResumen,
    modalResumen,
    domiciliosCliente,
  } = useClientes();

  const [textoDomicilio, setTextoDomicilio] = useState("");
  const [textoDomicilioDestino, setTextoDomicilioDEstino] = useState("");
  const [modalR, setModalR] = useState(false);
  const [carga, setCarga] = useState(false);

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerPlayas();
    };
    obtenerData();
  }, []);

  useEffect(() => {
    //si importacion o transito aduanero, DOMICILIO ORIGEN
    if (
      tipoServicio === "importacion" ||
      tipoServicio === "transito-aduanero"
    ) {
      const domicilioOrigen = terminales.find(
        (item) => item._id === origenCarga
      );

      domicilioOrigen
        ? setTextoDomicilio(domicilioOrigen.direccion)
        : setTextoDomicilio("");
    }
    //SI ES IMPORTACION, DOMICILIO DESTINO
    if (tipoServicio === "importacion" || tipoServicio === "nacional") {
      const domicilioDestino = domiciliosCliente.find(
        (item) => item._id === destinoCarga
      );
      domicilioDestino
        ? setTextoDomicilioDEstino(domicilioDestino.direccion)
        : setTextoDomicilioDEstino("");
    }
    //SI ES EXPORTACION O NACIONAL, DOMICILIO ORIGEN
    if (
      tipoServicio === "one-way" ||
      tipoServicio === "nacional" ||
      tipoServicio === "vacios"
    ) {
      const domicilio = domiciliosCliente.find(
        (item) => item._id === origenCarga
      );
      domicilio ? setTextoDomicilio(domicilio.fantasia) : setTextoDomicilio("");
    }

    if (tipoServicio === "one-way" || tipoServicio === "transito-aduanero") {
      const domicilio = terminales.find((item) => item._id === destinoCarga);

      domicilio
        ? setTextoDomicilioDEstino(domicilio.direccion)
        : setTextoDomicilioDEstino("");
    }

    if (tipoServicio === "vacios") {
      const domicilio = playas.find((item) => item._id === destinoCarga);

      domicilio
        ? setTextoDomicilioDEstino(domicilio.nombre)
        : setTextoDomicilioDEstino("");
    }

    if (tipoServicio === "round-trip") {
      const domicilioOrigen = domiciliosCliente.find(
        (item) => item._id === origenCarga
      );
      domicilioOrigen
        ? setTextoDomicilio(domicilioOrigen.fantasia)
        : setTextoDomicilio("");

      const domicilio = terminales.find((item) => item._id === destinoCarga);

      domicilio
        ? setTextoDomicilioDEstino(domicilio.direccion)
        : setTextoDomicilioDEstino("");
    }

    if (tipoServicio === "empty-pick") {
      const domicilio = playas.find((item) => item._id === origenCarga);

      domicilio ? setTextoDomicilio(domicilio.nombre) : setTextoDomicilio("");

      const domicilioDestino = domiciliosCliente.find(
        (item) => item._id === destinoCarga
      );
      domicilioDestino
        ? setTextoDomicilioDEstino(domicilioDestino.fantasia)
        : setTextoDomicilioDEstino("");
    }

    setBuscoDomi(false);
  }, [buscoDomi]);

  useEffect(() => {
    const traerData = async () => {
      if (idClienteServicio) {
        await obtenerCliente(idClienteServicio);
      }
    };
    traerData();
  }, [fechaDeCarga]);

  useEffect(() => {
    if (comprobarCierre && modalR) {
      handleModalResumen();
      setComprobarCierre(false);
      setModalR(false);
    }
  }, [comprobarCierre]);

  const handleClose = async () => {
    await handleCloseModalServicio();
    setModalR(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Esto es el numro de contenedores en el submit del resumen: " +
        numeroDeContenedores
    );
    handleCargando();
    try {
      await enviarDatosServicio();
    } catch (error) {
      console.log(error);
    } finally {
      setRecargoProximosViajes(true);
      handleCargando();
    }
  };

  const enviarDatosServicio = async () => {
    if (tipoServicio === "importacion") {
      await nuevaImportacion(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio
      );

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
      setDireccionesEntrega([]);
      setNumeroContenedoresCargados([]);
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
    if (tipoServicio === "one-way") {
      await nuevaExportacion(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio
      );
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
      setNumeroContenedoresCargados([]);
      setDireccionesEntrega([]);
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
    if (tipoServicio === "round-trip") {
      await nuevaExportacion(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio,
        playaOrigen
      );
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
      setNumeroContenedoresCargados([]);
      setDireccionesEntrega([]);
      setPlayaOrigen("");
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
    if (tipoServicio === "vacios") {
      await nuevaDevolucionVacios(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio
      );
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
      setNumeroContenedoresCargados([]);
      setDireccionesEntrega([]);
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
    if (tipoServicio === "empty-pick") {
      await nuevoEmptyPick(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio
      );
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
      setNumeroContenedoresCargados([]);
      setDireccionesEntrega([]);
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
    if (tipoServicio === "transito-aduanero") {
      await nuevoTransito(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio
      );
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
      setNumeroContenedoresCargados([]);
      setDireccionesEntrega([]);
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
    if (tipoServicio === "nacional") {
      await nuevoNacional(
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
        observacionesCarga,
        nroInternoCliente,
        despachoDeAduana,
        numeroDeContenedores,
        otrosServicio
      );
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
      setNumeroContenedoresCargados([]);
      setDireccionesEntrega([]);
      setOtrosServicio("");
      setComprobarContenedores(false);
      handleModalResumen();
    }
  };

  return (
    <Transition.Root show={modalResumen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto "
        onClose={handleModalResumen}
      >
        <div className="flex  min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <ToastContainer pauseOnFocusLoss={false} />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute  top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleClose}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start ">
                <div className="absolute top-0 right-8 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleModalResumenBack}
                  >
                    <ArrowLeftCircleIcon />
                    <span className="sr-only">Cerrar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </button>
                </div>
                <div className="mt-3  w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6  text-gray-700"
                  >
                    Resumen
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <>
                      <div className="flex items-center justify-center">
                        <div className=" mt-4 flex max-w-md grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                          <div className=" relative my-4 w-96 rounded-3xl bg-white py-6 px-6 text-start shadow-xl">
                            <div className=" absolute left-4 -top-6 flex items-center rounded-full bg-pink-500 py-4 px-4 text-white shadow-xl">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <TruckIcon />
                              </svg>
                            </div>
                            <div className="mt-8">
                              <p className="my-2 text-xl font-semibold">
                                LOGISTICA
                              </p>
                              <div className="flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <BuildingOffice2Icon />
                                </svg>
                                Cliente:
                                <p>{clienteNombreResumen}</p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <ClockIcon />
                                </svg>
                                Fecha y hora:
                                <p>
                                  {fechaDeCarga} - {horaDeCarga} hs
                                </p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <MapIcon />
                                </svg>
                                Origen:
                                <p>{textoDomicilio}</p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <MapPinIcon />
                                </svg>
                                Destino:
                                <p>{textoDomicilioDestino}</p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <BriefcaseIcon />
                                </svg>
                                Servicio:
                                <p>{tipoServicio}</p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <TruckIcon />
                                </svg>
                                Tipo de Carga:
                                <p>{tipoDeCarga}</p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <CalculatorIcon />
                                </svg>
                                Cantidad:
                                <p>{cantidadCarga}</p>
                              </div>
                              <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <ScaleIcon />
                                </svg>
                                Peso:
                                <p>{pesoCarga}</p>
                              </div>
                              {volumenCarga ? (
                                <div className="my-3 flex space-x-2 text-sm text-gray-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <ViewColumnsIcon />
                                  </svg>
                                  Volumen:
                                  <p>{volumenCarga}</p>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                        value={"Guardar"}
                      />
                    </>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalResumenServicio;

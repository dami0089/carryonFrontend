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
import { Button, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import moment from "moment";

moment.locale("es");

const ModalResumenNuevo = () => {
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

  const handleCancel = () => {
    Swal.fire({
      title: "Seguro queres cancelar esta coordinacion?",
      text: "Esta accion borra todo lo cargado",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
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
        setNumeroContenedoresCargados([]);
        setDireccionesEntrega([]);
        setOtrosServicio("");
        setComprobarContenedores(false);
        handleModalResumen();
      }
    });
  };

  return (
    <Transition.Root show={modalResumen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle">
              <div className="sm:flex sm:items-start ">
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  {/* Título */}
                  <div className="w-full rounded-t-md bg-blue-500 p-4 text-center text-white">
                    <h3 className="text-xl font-bold">Resumen Coordinación</h3>
                  </div>
                  <div className="mt-3 text-center">
                    <Typography className="my-2 mr-2 text-xl font-semibold">
                      {clienteNombreResumen}
                    </Typography>

                    <Typography className="my-2 mr-2 text-xl font-semibold">
                      Fecha y Hora:{" "}
                      {moment(fechaDeCarga)
                        .local("es")
                        .format("dddd")
                        .toUpperCase()}{" "}
                      {fechaDeCarga} - {horaDeCarga} hs
                    </Typography>
                  </div>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <>
                      <div className="mt-6 flex items-center justify-center">
                        {/* Columnas */}
                        <div className="grid w-full max-w-screen-md grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Columna 1 */}
                          <div className="rounded-lg bg-white p-6 shadow">
                            {/* Aquí van los items de la primera columna */}
                            {/* Por ejemplo: */}

                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Origen:
                              </Typography>
                              <p>{textoDomicilio}</p>
                            </div>
                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Destino:
                              </Typography>
                              <p>{textoDomicilioDestino}</p>
                            </div>
                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Servicio:
                              </Typography>
                              <p>{tipoServicio}</p>
                            </div>
                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Nro Interno Cliente:
                              </Typography>
                              <p>
                                {nroInternoCliente ? nroInternoCliente : "-"}
                              </p>
                            </div>
                          </div>

                          {/* Columna 2 */}
                          <div className="rounded-lg bg-white p-6 shadow">
                            {/* Aquí van los items de la segunda columna */}

                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Tipo de Carga:
                              </Typography>
                              <p>{tipoDeCarga}</p>
                            </div>
                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Cantidad de Carga:
                              </Typography>
                              <p>{cantidadCarga}</p>
                            </div>
                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Peso de Carga:
                              </Typography>
                              <p>{pesoCarga}</p>
                            </div>
                            <div className="flex items-center justify-start">
                              <Typography className="text-l my-2 mr-2 font-semibold">
                                Volumen de Carga:
                              </Typography>
                              <p>{volumenCarga}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Botones */}
                      <div className="mt-6 flex justify-between">
                        <Button
                          onClick={handleCancel}
                          className="rounded bg-red-500 px-6 py-3 text-white hover:bg-red-400"
                        >
                          CANCELAR
                        </Button>
                        <Button
                          onClick={handleModalResumenBack}
                          className="rounded bg-gray-500 px-6 py-3 text-white hover:bg-gray-400"
                        >
                          VOLVER
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-gray-400"
                        >
                          Guardar
                        </Button>
                      </div>
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

export default ModalResumenNuevo;

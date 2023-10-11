import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useClientes from "@/hooks/useClientes";

import useServicios from "@/hooks/useServicios";
import { Button, Typography } from "@material-tailwind/react";

const ModalNuevoServicio4 = () => {
  const {
    nroInternoCliente,
    despachoDeAduana,
    numeroDeContenedores,
    otrosServicio,
    setNroInternoCliente,
    setDespachoDeAduana,
    setNumeroDeContenedores,
    setOtrosServicio,
    tipoDeCarga,
    cantidadCarga,
    handleModalContenedores,
    comprobarContenedores,
    setComprobarContenedores,
    obtenerPlayas,
    playas,
    setBuscoDomi,
    handleCloseModalServicio,
    comprobarCierre,
    setComprobarCierre,
    tipoServicio,
    handleModalDevoluciones,
    fechaDevolucionContenedor,
    setFechaDevolucionContenedor,
    horaDevolucionContenedor,
    setHoraDevolucionContenedor,
    fechaVencimientoDevolucionContenedor,
    setFechaVencimientoDevolucionContenedor,
    lugarDevolucionContenedorVacio,
    setLugarDevolucionContenedorVacio,
  } = useServicios();

  const {
    modalNuevoServicio4,
    handleModalResumen,
    handleModalNuevoServicio4,
    handleBackModal4,
  } = useClientes();

  const [modal4, setModal4] = useState(false);

  useEffect(() => {
    const obtenerDataPlayas = async () => {
      await obtenerPlayas();
    };
    obtenerDataPlayas();
  }, []);

  useEffect(() => {
    if (comprobarCierre && modal4) {
      handleModalNuevoServicio4();
      setComprobarCierre(false);
      setModal4(false);
    }
  }, [comprobarCierre]);

  const handleClose = async () => {
    await handleCloseModalServicio();
    setModal4(true);
  };

  const [numeroContenedorCantidadUno, setNumeroContenedorCantidadUno] =
    useState("");
  const [direccionDevolucionCantidadUno, setDireccionDevolucionCantidadUno] =
    useState("");

  useEffect(() => {
    if (comprobarContenedores) {
      console.log("Entro a comprobar contenedores");

      const cantidadCargaNum = parseInt(cantidadCarga, 10);
      const contenedoresCompletos = [];

      for (let i = 0; i < cantidadCargaNum; i++) {
        const contenedor = {
          numeroContenedor: numeroDeContenedores[i]?.numeroContenedor || 0,
          direccionRetorno: numeroDeContenedores[i]?.direccionRetorno || 0,
          viaje: numeroDeContenedores[i]?.viaje || null,
        };
        contenedoresCompletos.push(contenedor);
      }

      setNumeroDeContenedores(contenedoresCompletos);
    }
    console.log(numeroDeContenedores);
  }, [comprobarContenedores]);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("cantidadCarga:", cantidadCarga);
    console.log("tipoDeCarga:", tipoDeCarga);
    if (parseInt(cantidadCarga) == 1 && tipoDeCarga === "Contenedor20") {
      const numeroConte = [
        {
          numeroContenedor: numeroContenedorCantidadUno,
          direccionRetorno: lugarDevolucionContenedorVacio,
          fechaDevolucion: fechaDevolucionContenedor,
          horaDevolucionContenedor: horaDevolucionContenedor,
          fechaVencimientoDevolucionContenedor:
            fechaVencimientoDevolucionContenedor,
          viaje: null,
        },
      ];
      setNumeroDeContenedores(numeroConte);
      setNumeroContenedorCantidadUno(numeroConte[0]?.numeroContenedor || "");
      setDireccionDevolucionCantidadUno(numeroConte[0]?.direccionRetorno || "");
      setLugarDevolucionContenedorVacio("");
      setFechaDevolucionContenedor("");
      setHoraDevolucionContenedor("");
      setFechaVencimientoDevolucionContenedor("");
      handleModalNuevoServicio4();
      setBuscoDomi(true);
      handleModalResumen();
      console.log(
        "Esto es el numero de contenedores desde modal4 handleSubmit contenedor20: " +
          numeroDeContenedores
      );
    }
    if (parseInt(cantidadCarga) == 1 && tipoDeCarga === "Contenedor40") {
      const numeroConte = [
        {
          numeroContenedor: numeroContenedorCantidadUno,
          direccionRetorno: lugarDevolucionContenedorVacio,
          fechaDevolucion: fechaDevolucionContenedor,
          horaDevolucionContenedor: horaDevolucionContenedor,
          fechaVencimientoDevolucionContenedor:
            fechaVencimientoDevolucionContenedor,
          viaje: null,
        },
      ];
      setNumeroDeContenedores(numeroConte);
      setNumeroContenedorCantidadUno(numeroConte[0]?.numeroContenedor || "");
      setDireccionDevolucionCantidadUno(numeroConte[0]?.direccionRetorno || "");
      setLugarDevolucionContenedorVacio("");
      setFechaDevolucionContenedor("");
      setHoraDevolucionContenedor("");
      setFechaVencimientoDevolucionContenedor("");
      handleModalNuevoServicio4();
      setBuscoDomi(true);
      handleModalResumen();
      console.log(
        "Esto es el numero de contenedores desde modal4 handleSubmit Contenedor40: " +
          numeroDeContenedores
      );
    }
    if (parseInt(cantidadCarga) == 1 && tipoDeCarga === "Contenedor40HC") {
      const numeroConte = [
        {
          numeroContenedor: numeroContenedorCantidadUno,
          direccionRetorno: lugarDevolucionContenedorVacio,
          fechaDevolucion: fechaDevolucionContenedor,
          horaDevolucionContenedor: horaDevolucionContenedor,
          fechaVencimientoDevolucionContenedor:
            fechaVencimientoDevolucionContenedor,
          viaje: null,
        },
      ];
      setNumeroDeContenedores(numeroConte);
      setNumeroContenedorCantidadUno(numeroConte[0]?.numeroContenedor || "");
      setDireccionDevolucionCantidadUno(numeroConte[0]?.direccionRetorno || "");
      setLugarDevolucionContenedorVacio("");
      setFechaDevolucionContenedor("");
      setHoraDevolucionContenedor("");
      setFechaVencimientoDevolucionContenedor("");
      handleModalNuevoServicio4();
      setBuscoDomi(true);
      handleModalResumen();
      console.log(
        "Esto es el numero de contenedores desde modal4 handleSubmit Contenedor40HC: " +
          numeroDeContenedores
      );
    } else {
      await setComprobarContenedores(true);
      handleModalNuevoServicio4();
      setBuscoDomi(true);
      handleModalResumen();
    }
  };

  const handleClic = () => {
    handleModalNuevoServicio4();
    handleModalContenedores();
  };

  return (
    <Transition.Root show={modalNuevoServicio4} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalNuevoServicio4}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
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

              <div className="sm:flex sm:items-start">
                <div className="absolute top-0 right-8 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleBackModal4}
                  >
                    <ArrowLeftCircleIcon />
                    <span className="sr-only">Volver</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </button>
                </div>
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Detalles
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="nroint"
                      >
                        Numero Interno Cliente
                      </label>
                      <input
                        id="nroint"
                        type="text"
                        placeholder="Nro Interno Cliente"
                        className="mt-2 w-full rounded-md border-2 p-2 uppercase placeholder-gray-400"
                        value={nroInternoCliente}
                        onChange={(e) => setNroInternoCliente(e.target.value)}
                      />
                    </div>
                    {tipoServicio !== "vacios" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="despacho"
                        >
                          Despacho de Aduana
                        </label>
                        <input
                          id="despacho"
                          type="text"
                          placeholder="Despacho de aduana"
                          className="mt-2 w-full rounded-md border-2 p-2 uppercase placeholder-gray-400"
                          value={despachoDeAduana}
                          onChange={(e) => setDespachoDeAduana(e.target.value)}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    {tipoServicio !== "vacios" ? (
                      <>
                        {tipoDeCarga === "Contenedor20" ||
                        tipoDeCarga === "Contenedor40" ||
                        tipoDeCarga === "Contenedor40HC" ? (
                          parseInt(cantidadCarga) === 1 ? (
                            <div className="mb-1">
                              <label
                                className="text-sm font-bold uppercase text-gray-700"
                                htmlFor="contenedores"
                              >
                                Numero de Contenedores
                              </label>
                              <input
                                id="contenedores"
                                type="text"
                                placeholder="Numero de contenedores"
                                className="mt-2 w-full rounded-md border-2 p-2 uppercase placeholder-gray-400"
                                value={numeroContenedorCantidadUno}
                                onChange={(e) =>
                                  setNumeroContenedorCantidadUno(e.target.value)
                                }
                              />

                              <div className="mt-5 mb-3 flex items-center justify-center">
                                <Button
                                  className="text-center"
                                  onClick={(e) => handleModalDevoluciones()}
                                >
                                  Devolucion contenedor
                                </Button>
                                {/* <Typography>
                            Debes agregar {numeroDeContenedores.length}/
                            {cantidadCarga}
                          </Typography> */}
                              </div>

                              {/* <label
                                className="text-sm font-bold uppercase text-gray-700"
                                htmlFor={"direccionEntrega"}
                              >
                                Direccion Entrega Vacio
                              </label>
                              <select
                                id={"direccionEntrega"}
                                className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                                value={direccionDevolucionCantidadUno}
                                onChange={(e) => {
                                  setDireccionDevolucionCantidadUno(
                                    e.target.value
                                  );
                                }}
                              >
                                <option value="">--Seleccionar--</option>

                                {playas.map((domicilio) => (
                                  <option
                                    key={domicilio._id}
                                    value={domicilio.direccion}
                                  >
                                    {domicilio.nombre}
                                    {" - "}
                                    {domicilio.direccion}
                                  </option>
                                ))}
                              </select> */}
                            </div>
                          ) : (
                            <div className="mt-5 mb-3 flex items-center justify-center">
                              <Button
                                className="text-center"
                                onClick={(e) => handleClic()}
                              >
                                Agregar Contenedores
                              </Button>
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="otros"
                      >
                        Otro:
                      </label>
                      <input
                        id="otros"
                        type="text"
                        placeholder="Otro"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={otrosServicio}
                        onChange={(e) => setOtrosServicio(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      className="mt-3 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Siguiente"}
                    />
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

export default ModalNuevoServicio4;

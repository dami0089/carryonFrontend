import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useClientes from "@/hooks/useClientes";

import useServicios from "@/hooks/useServicios";
import { Button } from "@material-tailwind/react";

const ModalNuevoServicio3 = () => {
  const {
    origenCarga,
    destinoCarga,
    observacionesCarga,
    tipoServicio,
    setOrigenCarga,
    setDestinoCarga,
    setObservacionesCarga,
    obtenerTerminales,
    terminales,
    idClienteServicio,
    handleCloseModalServicio,
    comprobarCierre,
    setComprobarCierre,
    playas,
    obtenerPlayas,
    playaOrigen,
    setPlayaOrigen,
  } = useServicios();

  const {
    handleModalNuevoServicio4,
    handleModalNuevoServicio3,
    modalNuevoServicio3,
    handleBackModal3,
    domiciliosCliente,
    obtenerDomicilios,
    cuitEditar,
    setCuitEditar,
    handleModalDomicilio,
    actualizoListadoDomis,
    setActualizoListadoDOmis,
    cierroModalDomis,
    setCierroModalDomis,
  } = useClientes();

  const [modal3, setModal3] = useState(false);

  useEffect(() => {
    console.log("Cuit Editar: " + cuitEditar);
    console.log("IdClienteServicio: " + idClienteServicio);

    if (cuitEditar) {
      const obtenerDomis = async () => {
        console.log(
          "quiero obtener domicilios del cliente en modalnuevoservicio3 si tiene cuit"
        );
        await obtenerDomicilios(cuitEditar);
      };
      obtenerDomis();
    }
    if (idClienteServicio) {
      const obtenerDomis = async () => {
        console.log(
          "quiero obtener domicilios del cliente en modalnuevoservicio3 si tiene Idclienteservicio"
        );

        await obtenerDomicilios(idClienteServicio);
      };
      obtenerDomis();
    }
  }, []);

  // useEffect(() => {
  //   const obtenerTermis = async () => {
  //     await obtenerDomicilios(cuitEditar);
  //   };
  //   obtenerTermis();
  // }, []);

  useEffect(() => {
    const obtenerTermis = async () => {
      await obtenerTerminales();
    };
    obtenerTermis();
  }, []);

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerPlayas();
    };
    obtenerData();
  }, []);

  useEffect(() => {
    const actualizoListado = async () => {
      if (actualizoListadoDomis) {
        await obtenerDomicilios(idClienteServicio);
        setActualizoListadoDOmis(false);
      }
    };
    actualizoListado();
  }, [actualizoListadoDomis]);

  const handleAgregarDomicilio = () => {
    setCuitEditar(idClienteServicio);
    handleModalNuevoServicio3();
    handleModalDomicilio();
    setCierroModalDomis(true);
  };

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([origenCarga, destinoCarga].includes("")) {
      toast("⚠️ Todos los campos son obligatorios", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    handleModalNuevoServicio3();
    handleModalNuevoServicio4();
  };

  const camposCamiones = [];

  useEffect(() => {
    if (comprobarCierre && modal3) {
      handleModalNuevoServicio3();
      setComprobarCierre(false);
      setModal3(false);
    }
  }, [comprobarCierre]);

  const handleClose = async () => {
    await handleCloseModalServicio();
    setModal3(true);
  };

  return (
    <Transition.Root show={modalNuevoServicio3} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalNuevoServicio3}
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
                    onClick={handleBackModal3}
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
                    Datos del Viaje
                  </Dialog.Title>

                  <form
                    className="my-2 mx-2 scroll-auto"
                    onSubmit={handleSubmit}
                  >
                    {tipoServicio === "round-trip" ? (
                      <div>
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="origen"
                        >
                          Retiro del contenedor
                        </label>

                        <select
                          id="origen"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={playaOrigen}
                          onChange={(e) => setPlayaOrigen(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {playas.map((domicilio) => (
                            <option key={domicilio._id} value={domicilio._id}>
                              {domicilio.nombre ? domicilio.nombre + "-" : ""}

                              {domicilio.direccion}
                              {"- "}
                              {domicilio.localidad}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      ""
                    )}
                    {tipoServicio === "round-trip" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="origen"
                        >
                          Consolidado Carga
                        </label>

                        <select
                          id="origen"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={origenCarga}
                          onChange={(e) => setOrigenCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {domiciliosCliente.map((domicilio) => (
                            <option key={domicilio._id} value={domicilio._id}>
                              {domicilio.fantasia
                                ? domicilio.fantasia + "-"
                                : ""}
                              {"- "}

                              {domicilio.direccion}
                              {"- "}
                              {domicilio.localidad}
                            </option>
                          ))}
                        </select>
                        <Button
                          onClick={handleAgregarDomicilio}
                          className="mt-3"
                        >
                          Cargar Domicilio al cliente
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                    {tipoServicio === "empty-pick" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="origen"
                        >
                          Origen de la carga
                        </label>

                        <select
                          id="origen"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={origenCarga}
                          onChange={(e) => setOrigenCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {playas.map((domicilio) => (
                            <option key={domicilio._id} value={domicilio._id}>
                              {domicilio.nombre ? domicilio.nombre + "-" : ""}
                              {"- "}

                              {domicilio.direccion}
                              {"- "}
                              {domicilio.localidad}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      ""
                    )}
                    {tipoServicio === "one-way" ||
                    tipoServicio === "nacional" ||
                    tipoServicio === "vacios" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="origen"
                        >
                          Origen de la carga
                        </label>

                        <select
                          id="origen"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={origenCarga}
                          onChange={(e) => setOrigenCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {domiciliosCliente.map((domicilio) => (
                            <option key={domicilio._id} value={domicilio._id}>
                              {domicilio.fantasia
                                ? domicilio.fantasia + "-"
                                : ""}
                              {"- "}

                              {domicilio.direccion}
                              {"- "}
                              {domicilio.localidad}
                            </option>
                          ))}
                        </select>
                        <Button
                          onClick={handleAgregarDomicilio}
                          className="mt-3"
                        >
                          Cargar Domicilio al cliente
                        </Button>
                      </div>
                    ) : tipoServicio === "importacion" ||
                      tipoServicio === "transito-aduanero" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="origen"
                        >
                          Origen de la carga
                        </label>

                        <select
                          id="origen"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={origenCarga}
                          onChange={(e) => setOrigenCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {terminales.map((terminales) => (
                            <option key={terminales._id} value={terminales._id}>
                              {terminales.nombre}
                              {"- "}
                              {terminales.localidad}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      ""
                    )}

                    {tipoServicio === "round-trip" ||
                    tipoServicio === "one-way" ||
                    tipoServicio === "transito-aduanero" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="destino"
                        >
                          Destino de la carga
                        </label>

                        <select
                          id="destino"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={destinoCarga}
                          onChange={(e) => setDestinoCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {terminales.map((terminales) => (
                            <option key={terminales._id} value={terminales._id}>
                              {terminales.nombre}
                              {"- "}
                              {terminales.localidad}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : tipoServicio === "empty-pick" ||
                      tipoServicio === "importacion" ||
                      tipoServicio === "nacional" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="destino"
                        >
                          Destino de la carga
                        </label>

                        <select
                          id="destino"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={destinoCarga}
                          onChange={(e) => setDestinoCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {domiciliosCliente.map((domicilio) => (
                            <option key={domicilio._id} value={domicilio._id}>
                              {domicilio.fantasia}
                              {"- "}
                              {domicilio.direccion}
                              {"- "}
                              {domicilio.localidad}
                            </option>
                          ))}
                        </select>

                        <Button
                          onClick={handleAgregarDomicilio}
                          className="mt-3"
                        >
                          Cargar Domicilio al cliente
                        </Button>
                      </div>
                    ) : tipoServicio === "vacios" ? (
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="destino"
                        >
                          Destino de la carga
                        </label>

                        <select
                          id="destino"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={destinoCarga}
                          onChange={(e) => setDestinoCarga(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {playas.map((domicilio) => (
                            <option key={domicilio._id} value={domicilio._id}>
                              {domicilio.nombre}
                              {"- "}
                              {domicilio.direccion}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="obs"
                      >
                        Observaciones del pedido
                      </label>
                      <textarea
                        id="obs"
                        type="text"
                        placeholder="Observaciones"
                        rows={4}
                        className="mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
                        value={observacionesCarga}
                        onChange={(e) => setObservacionesCarga(e.target.value)}
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

export default ModalNuevoServicio3;

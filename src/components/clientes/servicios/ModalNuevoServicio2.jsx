import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useClientes from "@/hooks/useClientes";

import useServicios from "@/hooks/useServicios";

const ModalNuevoServicio2 = () => {
  const {
    tipoDeCarga,
    cantidadCarga,
    pesoCarga,
    volumenCarga,

    setTipoDeCarga,
    setCantidadCarga,
    setPesoCarga,
    setVolumenCarga,
    handleCloseModalServicio,
    comprobarCierre,
    setComprobarCierre,
    tipoServicio,
  } = useServicios();

  const [modal2, setModal2] = useState(false);

  const {
    handleModalNuevoServicio2,
    modalNuevoServicio2,
    handleModalNuevoServicio3,
    handleBackModal2,
  } = useClientes();

  useEffect(() => {
    if (comprobarCierre && modal2) {
      handleModalNuevoServicio2();
      setComprobarCierre(false);
      setModal2(false);
    }
  }, [comprobarCierre]);

  const handleClose = async () => {
    await handleCloseModalServicio();
    setModal2(true);
  };

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([tipoDeCarga, cantidadCarga].includes("")) {
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
    handleModalNuevoServicio2();
    handleModalNuevoServicio3();
    // handleModalResumen();
  };

  return (
    <Transition.Root show={modalNuevoServicio2} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalNuevoServicio2}
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
                    onClick={handleBackModal2}
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
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="tipocarga"
                      >
                        Tipo de carga
                      </label>
                      <select
                        id="tipocarga"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tipoDeCarga}
                        onChange={(e) => setTipoDeCarga(e.target.value)}
                      >
                        {tipoServicio === "vacios" ? (
                          <>
                            <option value="">--Seleccionar--</option>
                            <option key={3} value={"Contenedor20"}>
                              Contenedor 20'
                            </option>
                            <option key={4} value={"Contenedor40"}>
                              Contenedor 40' DRY
                            </option>
                            <option key={5} value={"Contenedor40HC"}>
                              Contenedor 40' HC
                            </option>
                          </>
                        ) : (
                          <>
                            <option value="">--Seleccionar--</option>

                            <option key={1} value={"cajas"}>
                              Cajas
                            </option>
                            <option key={1} value={"bultos"}>
                              Bultos
                            </option>
                            <option key={2} value={"pallets"}>
                              Pallets
                            </option>
                            <option key={3} value={"Contenedor20"}>
                              Contenedor 20'
                            </option>
                            <option key={4} value={"Contenedor40"}>
                              Contenedor 40' DRY
                            </option>
                            <option key={5} value={"Contenedor40HC"}>
                              Contenedor 40' HC
                            </option>
                            <option key={6} value={"otro"}>
                              Otro
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                    {tipoDeCarga === "cajas" ||
                    tipoDeCarga === "bultos" ||
                    tipoDeCarga === "pallets" ? (
                      <>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="cantidad"
                          >
                            Cantidad
                          </label>
                          <input
                            id="cantidad"
                            type="text"
                            placeholder="Cantidad"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={cantidadCarga}
                            onChange={(e) => setCantidadCarga(e.target.value)}
                          />
                        </div>

                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="peso"
                          >
                            Peso
                          </label>
                          <input
                            id="peso"
                            type="text"
                            placeholder="Peso"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={pesoCarga}
                            onChange={(e) => setPesoCarga(e.target.value)}
                          />
                        </div>

                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="volumen"
                          >
                            Volumen
                          </label>
                          <input
                            id="volumen"
                            type="text"
                            placeholder="Volumen"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={volumenCarga}
                            onChange={(e) => setVolumenCarga(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="cantidad"
                          >
                            Cantidad
                          </label>
                          <input
                            id="cantidad"
                            type="text"
                            placeholder="Cantidad"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={cantidadCarga}
                            onChange={(e) => setCantidadCarga(e.target.value)}
                          />
                        </div>

                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="peso"
                          >
                            Peso
                          </label>
                          <input
                            id="peso"
                            type="text"
                            placeholder="Peso"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={pesoCarga}
                            onChange={(e) => setPesoCarga(e.target.value)}
                          />
                        </div>
                      </>
                    )}

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

export default ModalNuevoServicio2;

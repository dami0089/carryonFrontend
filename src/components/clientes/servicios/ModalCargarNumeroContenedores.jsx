import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer } from "react-toastify";

import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const ModalCargarNumeroContenedores = () => {
  const {
    numeroDeContenedores,
    cantidadCarga,
    setNumeroDeContenedores,
    handleModalContenedores,
    modalContenedores,
    obtenerPlayas,

    numeroContenedoresCargados,
    setNumeroContenedoresCargados,
  } = useServicios();

  const { handleModalNuevoServicio4 } = useClientes();

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeroContenedores = Array.from({ length: cantidadCargaInt }).map(
      (_, index) => ({
        numeroContenedor: numeroContenedoresCargados[index] || "",
        viaje: null,
      })
    );
    console.log("ContenedoreS: " + numeroContenedores);
    console.log("Cantidad Carga INT: " + cantidadCargaInt);
    console.log("Cantidad carga del modal: " + cantidadCarga);
    setNumeroDeContenedores(numeroContenedores);
    handleModalContenedores();
    handleModalNuevoServicio4();
  };

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerPlayas();
    };
    obtenerData();
  }, []);

  const cantidadCargaInt = parseInt(cantidadCarga); // Convertir a entero

  const handleBack = () => {
    handleModalContenedores();
    handleModalNuevoServicio4();
  };

  return (
    <Transition.Root show={modalContenedores} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalContenedores}
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
                  onClick={handleModalContenedores}
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
                    onClick={handleBack}
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
                    className="mb-3 text-center text-xl font-bold leading-6 text-gray-900"
                  >
                    Numero de Contenedores
                  </Dialog.Title>

                  <form
                    className="my-2 mx-2 scroll-auto"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    {Array.from({ length: cantidadCargaInt }).map(
                      (_, index) => (
                        <div className="mb-1" key={index}>
                          <div className="mr-4">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor={`contenedor-${index}`}
                            >
                              Numero Contenedor {index + 1}
                            </label>
                            <input
                              id={`contenedor-${index}`}
                              type="text"
                              placeholder="Numero Contenedor"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={numeroContenedoresCargados[index] || ""}
                              onChange={(e) => {
                                const nuevosContenedores = [
                                  ...numeroContenedoresCargados,
                                ];
                                nuevosContenedores[index] = e.target.value;
                                setNumeroContenedoresCargados(
                                  nuevosContenedores
                                );
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}

                    <input
                      type="submit"
                      className="mt-3 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar y Volver"}
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

export default ModalCargarNumeroContenedores;

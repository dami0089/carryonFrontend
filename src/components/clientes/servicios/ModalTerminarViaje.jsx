import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";
import useServicios from "@/hooks/useServicios";

const ModalTerminarViaje = () => {
  const {
    handleTerminarViaje,
    modalTerminarViaje,
    terminarViaje,
    observacionesViaje,
    setObservacionesViaje,
    idEditarViaje,
    handleCargando,
    adicionales,
    setAdicionales,
    fechaTerminacion,
    setFechaTerminacion,
    horaTerminacion,
    setHoraTerminacion,
    diasDemora,
    setActualizoListadoViajes,

    setDiasDemora,
    actualizoConceptos,
    setActualizoConceptos,
    setRecargarListadoTodosViajes,
  } = useServicios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleCargando();
    await terminarViaje(
      idEditarViaje,
      adicionales,
      fechaTerminacion,
      horaTerminacion,
      diasDemora,
      observacionesViaje
    );
    setActualizoListadoViajes(true);
    setActualizoConceptos(true);
    setRecargarListadoTodosViajes(true);

    toast("Informacion Grabada", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setAdicionales("");
    setFechaTerminacion("");
    setHoraTerminacion("");
    setDiasDemora("");
    setObservacionesViaje("");
    handleTerminarViaje();
    handleCargando();
  };

  return (
    <Transition.Root show={modalTerminarViaje} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleTerminarViaje}
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
                  onClick={handleTerminarViaje}
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
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Terminar Viaje
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="adicionales"
                      >
                        Adicionales
                      </label>

                      <select
                        id="adicionales"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={adicionales}
                        onChange={(e) => setAdicionales(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>

                        <option key={1} value={"Sin Extras"}>
                          Sin Extras
                        </option>
                        <option key={2} value={"Con Extras"}>
                          Con Extras
                        </option>
                        <option key={3} value={"Con Demora"}>
                          Con Demora
                        </option>
                        <option key={4} value={"Vacio"}>
                          Vacio Al Dia Siguiente
                        </option>
                        <option key={4} value={"no"}>
                          Ninguno
                        </option>
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fecha"
                      >
                        Fecha Terminacion
                      </label>
                      <input
                        id="fecha"
                        type="date"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={fechaTerminacion}
                        onChange={(e) => setFechaTerminacion(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="hora"
                      >
                        Hora Terminacion
                      </label>
                      <input
                        id="hora"
                        type="time"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={horaTerminacion}
                        onChange={(e) => setHoraTerminacion(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="dias"
                      >
                        Dias de demora
                      </label>
                      <input
                        id="dias"
                        type="number"
                        placeholder="Dias de demora"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={diasDemora}
                        onChange={(e) => setDiasDemora(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="observaciones"
                      >
                        Observaciones del Viaje
                      </label>
                      <textarea
                        id="observaciones"
                        type="number"
                        placeholder="Observaciones"
                        className="mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
                        value={observacionesViaje}
                        onChange={(e) => setObservacionesViaje(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      className="mt-4 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar"}
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

export default ModalTerminarViaje;

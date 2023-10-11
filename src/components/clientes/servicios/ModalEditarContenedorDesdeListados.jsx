import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";

import useClientes from "@/hooks/useClientes";

import useServicios from "@/hooks/useServicios";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

const ModalEditarContenedorListado = () => {
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const {
    idClienteServicio,
    tipoServicio,
    fechaDeCarga,
    horaDeCarga,

    setIdClienteServicio,
    setTipoServicio,
    setFechadeCarga,
    setHoraDeCarga,
    handleCloseModalServicio,
    comprobarCierre,
    setComprobarCierre,
    modalCargarDevolucion,
    handleModalDevoluciones,
    obtenerPlayas,
    playas,
    fechaDevolucionContenedor,
    setFechaDevolucionContenedor,
    horaDevolucionContenedor,
    setHoraDevolucionContenedor,
    fechaVencimientoDevolucionContenedor,
    setFechaVencimientoDevolucionContenedor,
    lugarDevolucionContenedorVacio,
    setLugarDevolucionContenedorVacio,
    handleModalNuevoServicio4,
    completarDevolucion,
    handleModalCargarDevolucionEditar,
    modalCargarDevolucionEditar,
    idEditarViaje,
    handleModalEditarContenedorDesdeListados,
    modalEditarContenedorDesdeListados,
    completarDevolucionListado,
    numeroContenedor,
    setNumeroContenedor,
    setActualizoListadosDespuesDeAsignar,
    setRecargoProximosViajes,
    horaDevolucionDesde,
    setHoraDevolucionDesde,
    horaDevolucionHasta,
    setHoraDevolucionHasta,
    fantasiaDevolucionEditar,
    setFantasiaDevolucionEditar,
    localidadDevolucionEditar,
    setLocalidadDevolucionEditar,
  } = useServicios();

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerPlayas();
    };
    obtenerData();
  }, []);

  useEffect(() => {
    if (numeroContenedor === "0") {
      setNumeroContenedor("");
    }
  }, []);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();

    await completarDevolucionListado(
      idEditarViaje,
      fechaDevolucionContenedor,
      fechaVencimientoDevolucionContenedor,
      lugarDevolucionContenedorVacio,
      numeroContenedor,
      horaDevolucionDesde,
      horaDevolucionHasta,
      fantasiaDevolucionEditar,
      localidadDevolucionEditar
    );
    setRecargoProximosViajes(true);
    setActualizoListadosDespuesDeAsignar(true);
    setFechaDevolucionContenedor("");
    setHoraDevolucionContenedor("");
    setFechaVencimientoDevolucionContenedor("");
    setLugarDevolucionContenedorVacio("");
    setNumeroContenedor("");
    setHoraDevolucionDesde("");
    setHoraDevolucionHasta("");
    handleModalEditarContenedorDesdeListados();
  };

  const recordarCliente = (e) => {
    Swal.fire({
      title: "Queres recordar al cliente?",
      text: "Esta accion le enviara un email automatico alertando la falta de informacion",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
      } else {
      }
    });
  };

  const handleClose = () => {
    setFechaDevolucionContenedor("");
    setHoraDevolucionContenedor("");
    setFechaVencimientoDevolucionContenedor("");
    setLugarDevolucionContenedorVacio("");
    setNumeroContenedor("");
    setHoraDevolucionDesde("");
    setHoraDevolucionHasta("");
    handleModalEditarContenedorDesdeListados();
  };

  return (
    <Transition.Root show={modalEditarContenedorDesdeListados} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalEditarContenedorDesdeListados}
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
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
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Devolucion Contenedor
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="fecha"
                        >
                          Fecha de Vencimiento
                        </label>

                        <input
                          id="fecha"
                          type="date"
                          placeholder="Fecha de carga"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={fechaVencimientoDevolucionContenedor}
                          onChange={(e) =>
                            setFechaVencimientoDevolucionContenedor(
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor={`direccion`}
                        >
                          Devuelve Vacio en:
                        </label>
                        <select
                          id={`direccion`}
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={lugarDevolucionContenedorVacio}
                          onChange={(e) => {
                            const selectedDireccion = e.target.value;
                            const selectedDomicilio = playas.find(
                              (domicilio) =>
                                domicilio.direccion === selectedDireccion
                            );
                            if (selectedDomicilio) {
                              setLugarDevolucionContenedorVacio(
                                selectedDireccion
                              );
                              setFantasiaDevolucionEditar(
                                selectedDomicilio.nombre
                              );
                              setLocalidadDevolucionEditar(
                                selectedDomicilio.localidad
                              );
                            }
                          }}
                        >
                          <option value="">--Seleccionar--</option>
                          {playas.map((domicilio) => (
                            <option
                              key={domicilio._id}
                              value={domicilio.direccion}
                            >
                              {domicilio.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="numero"
                        >
                          Numero Contenedor
                        </label>

                        <input
                          id="numero"
                          type="text"
                          placeholder="Numero Contenedor"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={numeroContenedor}
                          onChange={(e) => setNumeroContenedor(e.target.value)}
                        />
                      </div>
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fecha"
                      >
                        Fecha de Devolucion
                      </label>

                      <input
                        id="fecha"
                        type="date"
                        placeholder="Fecha de carga"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={fechaDevolucionContenedor}
                        onChange={(e) =>
                          setFechaDevolucionContenedor(e.target.value)
                        }
                      />
                    </div>

                    <div className="mb-1 flex items-center justify-between">
                      <div className="mr-2 flex-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="horaDesde"
                        >
                          Hora Desde
                        </label>
                        <select
                          id="horaDesde"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={horaDevolucionDesde}
                          onChange={(e) => {
                            setHoraDevolucionDesde(e.target.value);
                            if (
                              parseInt(e.target.value) >=
                              parseInt(horaDevolucionHasta)
                            ) {
                              setHoraDevolucionHasta("");
                            }
                          }}
                        >
                          <option value="">Selecciona una hora</option>
                          {Array.from({ length: 15 }, (_, i) => i + 6).map(
                            (hour) => (
                              <option key={hour} value={hour}>
                                {String(hour).padStart(2, "0")}:00
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="ml-2 flex-1">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="horaHasta"
                        >
                          Hora Hasta
                        </label>
                        <select
                          id="horaHasta"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={horaDevolucionHasta}
                          onChange={(e) =>
                            setHoraDevolucionHasta(e.target.value)
                          }
                        >
                          <option value="">Selecciona una hora</option>
                          {Array.from({ length: 15 }, (_, i) => i + 6).map(
                            (hour) =>
                              parseInt(horaDevolucionDesde) < hour && (
                                <option key={hour} value={hour}>
                                  {String(hour).padStart(2, "0")}:00
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>

                    {/* <input
                      type="submit"
                      className="mt-3 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar"}
                    /> */}
                  </form>
                  <Button
                    className="mt-2 mb-2 w-full"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Guardar
                  </Button>
                  {!lugarDevolucionContenedorVacio ||
                  !fechaVencimientoDevolucionContenedor ? (
                    <Button
                      onClick={(e) => recordarCliente(e)}
                      className="w-full bg-green-200"
                    >
                      Recordar al cliente
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalEditarContenedorListado;
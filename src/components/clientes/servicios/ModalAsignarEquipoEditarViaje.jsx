import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import useProveedores from "@/hooks/useProveedores";
import { ToastContainer, toast } from "react-toastify";
import useServicios from "@/hooks/useServicios";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

const ModalAsignarEquipoEditarViaje = () => {
  const {
    choferesProveedor,
    camionesProveedor,
    semisProveedor,
    equiposData,
    obtenerEquipos,
    obtenerChoferes,
    obtenerCamiones,
    obtenerSemis,
  } = useProveedores();

  const {
    asignarEquipo,
    handleModalReasignarEquipos,
    modalReAsignarEquipos,
    idEditarViaje,
    proveedorEditar,
    handleCargando,
    setActualizoListadosDespuesDeAsignar,
    idChoferEquipo,
    setIdCHoferEquipo,
    idCamionEquipo,
    setIdCamionEquipo,
    idSemiEquipo,
    setIdSemiEquipo,
    idEquipoProveedor,
    setIdEquipoProveedor,
    eliminarEquipo,
    notificarChoferWhatsapp,
    notificarAlChoferPorMail,
    setRecargoProximosViajes,
    setRecargarListadoTodosViajes,
    asignarEquipoPreArmado,
    notificarCoordinadorWhatsapp,
  } = useServicios();

  useEffect(() => {
    if (idEquipoProveedor == "") {
      setIdEquipoProveedor("no");
    }
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerEquipos(proveedorEditar);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerChoferes(proveedorEditar);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerCamiones(proveedorEditar);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      await obtenerSemis(proveedorEditar);
    };
    traerData();
  }, []);

  useEffect(() => {
    console.log(idEquipoProveedor);
  }, [idEquipoProveedor]);

  //Consultamos la base de datos para saber si el proveedor ya esta registrado antes. Si no esta registrado cierra el modal y pasa al modal2

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idEquipoProveedor === "no" || equiposData.length == 0) {
      if ([idChoferEquipo, idCamionEquipo].includes("")) {
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
    }

    if (idEquipoProveedor === "no") {
      handleCargando();
      await asignarEquipo(
        idEditarViaje,
        idChoferEquipo,
        idCamionEquipo,
        idSemiEquipo
      );

      setActualizoListadosDespuesDeAsignar(true);
      setRecargoProximosViajes(true);
      setIdCHoferEquipo("");
      setIdCamionEquipo("");
      setIdSemiEquipo("");
      handleModalReasignarEquipos();
      handleCargando();
    } else {
      handleCargando();

      await asignarEquipoPreArmado(idEditarViaje, idEquipoProveedor);

      setActualizoListadosDespuesDeAsignar(true);
      setRecargoProximosViajes(true);
      setIdCHoferEquipo("");
      setIdCamionEquipo("");
      setIdSemiEquipo("");
      handleModalReasignarEquipos();
      handleCargando();
    }
  };

  const borrarEquipo = () => {
    Swal.fire({
      title: "Queres Borrar este equipo?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarEquipo(idEditarViaje);

        setActualizoListadosDespuesDeAsignar(true);
        setRecargoProximosViajes(true);
        handleModalReasignarEquipos();
      }
    });
  };

  const infoChofer = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Noticicamos por Whatsapp al Chofer?",
      text: "Esta accion no se puede deshacer",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await notificarChoferWhatsapp(idEditarViaje);
        setRecargoProximosViajes(true);
        setRecargarListadoTodosViajes(true);

        handleModalReasignarEquipos();
      }
    });
  };

  const infoMail = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Enviar info por mail??",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await notificarAlChoferPorMail(idEditarViaje);
        handleModalReasignarEquipos();
      }
    });
  };

  const notificarCoordinador = async (e) => {
    e.preventDefault();
    handleCargando();
    await notificarCoordinadorWhatsapp(idEditarViaje);
    handleCargando();
    handleModalReasignarEquipos();
  };

  return (
    <Transition.Root show={modalReAsignarEquipos} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalReasignarEquipos}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalReasignarEquipos}
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
                <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Asignar Equipos
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    {equiposData.length != 0 ? (
                      <>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="domicilio"
                          >
                            Asignar Equipo
                          </label>
                          <select
                            id="cliente"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={idEquipoProveedor}
                            onChange={(e) =>
                              setIdEquipoProveedor(e.target.value)
                            }
                          >
                            <option value="">--Seleccionar--</option>
                            {equiposData.map((equipo) => (
                              <option key={equipo._id} value={equipo._id}>
                                {equipo.nombreChofer}/{" "}
                                {equipo.patenteCamion.toUpperCase()}/
                                {equipo.patenteSemi.toUpperCase()}
                              </option>
                            ))}
                            <option key={"xx"} value={"no"}>
                              ** Asignar Manualmente **
                            </option>
                          </select>
                        </div>
                        {idEquipoProveedor == "no" ? (
                          <>
                            <div className="mb-1">
                              <label
                                className="text-sm font-bold uppercase text-gray-700"
                                htmlFor="domicilio"
                              >
                                Asignar Chofer
                              </label>
                              <select
                                id="cliente"
                                className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                                value={idChoferEquipo}
                                onChange={(e) =>
                                  setIdCHoferEquipo(e.target.value)
                                }
                              >
                                <option value="">--Seleccionar--</option>
                                {choferesProveedor.map((chofer) => (
                                  <option key={chofer._id} value={chofer._id}>
                                    {chofer.nombre} {chofer.apellido}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-1">
                              <label
                                className="text-sm font-bold uppercase text-gray-700"
                                htmlFor="domicilio"
                              >
                                Asignar Camion
                              </label>
                              <select
                                id="cliente"
                                className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                                value={idCamionEquipo}
                                onChange={(e) =>
                                  setIdCamionEquipo(e.target.value)
                                }
                              >
                                <option value="">--Seleccionar--</option>
                                {camionesProveedor.map((camion) => (
                                  <option key={camion._id} value={camion._id}>
                                    {camion.patente}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-1">
                              <label
                                className="text-sm font-bold uppercase text-gray-700"
                                htmlFor="domicilio"
                              >
                                Asignar Semis
                              </label>
                              <select
                                id="cliente"
                                className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                                value={idSemiEquipo}
                                onChange={(e) =>
                                  setIdSemiEquipo(e.target.value)
                                }
                              >
                                <option value="">--Seleccionar--</option>
                                {semisProveedor.map((semi) => (
                                  <option key={semi._id} value={semi._id}>
                                    {semi.patente}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="domicilio"
                          >
                            Asignar Chofer
                          </label>
                          <select
                            id="cliente"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={idChoferEquipo}
                            onChange={(e) => setIdCHoferEquipo(e.target.value)}
                          >
                            <option value="">--Seleccionar--</option>
                            {choferesProveedor.map((chofer) => (
                              <option key={chofer._id} value={chofer._id}>
                                {chofer.nombre} {chofer.apellido}/
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="domicilio"
                          >
                            Asignar Camion
                          </label>
                          <select
                            id="cliente"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={idCamionEquipo}
                            onChange={(e) => setIdCamionEquipo(e.target.value)}
                          >
                            <option value="">--Seleccionar--</option>
                            {camionesProveedor.map((camion) => (
                              <option key={camion._id} value={camion._id}>
                                {camion.patente}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="domicilio"
                          >
                            Asignar Semis
                          </label>
                          <select
                            id="cliente"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={idSemiEquipo}
                            onChange={(e) => setIdSemiEquipo(e.target.value)}
                          >
                            <option value="">--Seleccionar--</option>
                            {semisProveedor.map((semi) => (
                              <option key={semi._id} value={semi._id}>
                                {semi.patente}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </form>

                  <div className="text-center">
                    <Button
                      className="mt-3 w-full cursor-pointer bg-blue-300"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Guardar
                    </Button>
                  </div>

                  {/* {idChoferEquipo && idChoferEquipo.length != 0 ? (
                    <div className="text-center">
                      <Button
                        className="mt-3 w-full cursor-pointer bg-green-500"
                        onClick={(e) => infoLogicsar(e)}
                      >
                        Info por Whatsapp a Logicsar
                      </Button>
                    </div>
                  ) : (
                    ""
                  )} */}
                  {idChoferEquipo && idChoferEquipo.length != 0 ? (
                    <div className="text-center">
                      <Button
                        className="mt-3 w-full cursor-pointer bg-green-600"
                        onClick={(e) => infoChofer(e)}
                      >
                        Info por Whatsapp al chofer
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                  {idChoferEquipo && idChoferEquipo.length != 0 ? (
                    <div className="text-center">
                      <Button
                        className="mt-3 w-full cursor-pointer bg-green-700"
                        onClick={(e) => infoMail(e)}
                      >
                        Info por mail
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="text-center">
                    <Button
                      className="mt-3 w-full cursor-pointer bg-blue-gray-300"
                      onClick={(e) => notificarCoordinador(e)}
                    >
                      Notificar viaje al Coordinador
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      className="mt-3 w-full cursor-pointer bg-red-500"
                      onClick={(e) => borrarEquipo(e)}
                    >
                      Eliminar Equipo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalAsignarEquipoEditarViaje;

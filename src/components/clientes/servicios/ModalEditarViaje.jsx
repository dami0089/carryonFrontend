import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";

import useClientes from "@/hooks/useClientes";

import useServicios from "@/hooks/useServicios";

import { Button } from "@material-tailwind/react";
import useProveedores from "@/hooks/useProveedores";
import Swal from "sweetalert2";

const ModalEditarViaje = () => {
  const {
    idClienteServicio,
    tipoServicioViajeEditar,
    fechaDeCarga,
    horaDeCarga,
    idEditarViaje,
    setIdClienteServicio,

    handleModalEditarViaje,
    modalEditarViaje,
    numeroContenedorEditar,
    setNumeroContenedorEditar,
    fechaCArgaEditar,
    setFechaCargaEditar,
    horaCargaEditar,
    setHoraCargaEditar,
    estadoEditar,
    setEstadoEditar,
    origenEditar,
    setOrigenEditar,
    destinoEditar,
    setDestinoEDitar,
    proveedorEditar,
    setProveedorEditar,
    choferEditar,
    setChoferEditar,
    camionEditar,
    setCamionEditar,
    semiEditar,
    setSemiEditar,
    nombreProveedorEditar,

    estadosViaje,
    clienteEditarViaje,

    obtenerTerminales,
    terminales,
    handleModalReasignarProveedor,

    obtenerPlayas,
    playas,
    direccionDevolucion,
    direccionRetornoEditarViaje,
    setDireccionDevolucion,
    handleModalReasignarEquipos,
    editarViaje,
    setIdEditarViaje,
    setTipoServicioViajeEditar,
    buscoEnEditarViaje,
    setBuscoEnEDitarViaje,
    handleTerminarViaje,
    handleCargando,
    editeViaje,
    setEditeViaje,
    observacionesViaje,
    setObservacionesViaje,
    eliminarViaje,
    adicionales,
    setAdicionales,
    fechaTerminacion,
    setFechaTerminacion,
    horaTerminacion,
    setHoraTerminacion,
    diasDemora,
    setDiasDemora,

    cantidadEditar,
    setCantidadEditar,
    pesoEditar,
    setPesoEditar,
    volumenEditar,
    setVolumenEditar,
    tipoCargaEditar,
    setTipoCargaEditar,
    handleModalCargarDevolucionEditar,
    actualizarEstadoServicio,
    setActualizarEstadoServicio,
    obtenerEstadosViaje,
    actualizoListadosDespuesDeAsignar,
    setActualizoListadosDespuesDeAsignar,
    setActualizoListadoViajes,
  } = useServicios();

  const { obtenerEquipos, equiposData } = useProveedores;

  const { cuitEditar, obtenerDomicilios, domiciliosCliente, selectInicio } =
    useClientes();

  useEffect(() => {
    const obtenerDomis = async () => {
      await obtenerDomicilios(clienteEditarViaje);
    };
    obtenerDomis();
  }, []);

  useEffect(() => {
    const obtenerEstados = async () => {
      if (selectInicio == 2 || selectInicio == 3 || selectInicio == 4) {
        await obtenerEstadosViaje();
      }
    };
    obtenerEstados();
  }, []);

  useEffect(() => {
    const obtenerDomis = async () => {
      if (buscoEnEditarViaje) {
        await obtenerDomicilios(clienteEditarViaje);
        await obtenerTerminales();
        await obtenerPlayas();
      }
    };
    obtenerDomis();
  }, [buscoEnEditarViaje]);

  useEffect(() => {
    setIdClienteServicio(clienteEditarViaje);
    setDireccionDevolucion(direccionRetornoEditarViaje);
  }, [clienteEditarViaje]);

  const handleEliminar = async () => {
    Swal.fire({
      title: "Queres eliminar el viaje?",
      text: "Esta accion solo eliminara el viaje actual",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarViaje(idEditarViaje);
        setEditeViaje(true);
        setActualizoListadosDespuesDeAsignar(true);
        setActualizoListadoViajes(true);
        handleCargando();
        handleModalEditarViaje();
      }
    });
  };

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (estadoEditar === "Terminado") {
      Swal.fire({
        title: "Terminamos el viaje?",
        text: "Esta accion marcara el viaje como terminado y continuara con el proceso de facturacion",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await editarViaje(
            idEditarViaje,
            numeroContenedorEditar,
            fechaCArgaEditar,
            horaCargaEditar,
            direccionDevolucion,
            tipoServicioViajeEditar,
            estadoEditar,
            origenEditar,
            destinoEditar,
            observacionesViaje,
            cantidadEditar,
            pesoEditar,
            volumenEditar,
            tipoCargaEditar
          );
          setEditeViaje(true);
          setActualizarEstadoServicio(true);
          setNumeroContenedorEditar("");
          setFechaCargaEditar("");
          setHoraCargaEditar("");
          setDireccionDevolucion("");
          setTipoServicioViajeEditar("");
          setEstadoEditar("");
          setOrigenEditar("");
          setDestinoEDitar("");
          handleModalEditarViaje();
          handleCargando();
          handleTerminarViaje();
          setCantidadEditar("");
          setPesoEditar("");
          setVolumenEditar("");
          setTipoCargaEditar("");
          handleCargando();
        }
      });
    } else {
      Swal.fire({
        title: "Guardar Cambios?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await editarViaje(
            idEditarViaje,
            numeroContenedorEditar,
            fechaCArgaEditar,
            horaCargaEditar,
            direccionDevolucion,
            tipoServicioViajeEditar,
            estadoEditar,
            origenEditar,
            destinoEditar,
            observacionesViaje,
            cantidadEditar,
            pesoEditar,
            volumenEditar,
            tipoCargaEditar
          );
          setActualizoListadosDespuesDeAsignar(true);
          setEditeViaje(true);
          setIdEditarViaje("");
          setNumeroContenedorEditar("");
          setFechaCargaEditar("");
          setHoraCargaEditar("");
          setDireccionDevolucion("");
          setTipoServicioViajeEditar("");
          setEstadoEditar("");
          setOrigenEditar("");
          setDestinoEDitar("");
          setCantidadEditar("");
          setPesoEditar("");
          setVolumenEditar("");
          setTipoCargaEditar("");
          handleModalEditarViaje();
        }
      });
    }
  };

  const handleReasignar = () => {
    handleModalEditarViaje();

    handleModalReasignarProveedor();
  };

  const handleModal = () => {
    handleTerminarViaje();
  };

  const handleDev = () => {
    handleModalCargarDevolucionEditar();
  };

  return (
    <Transition.Root show={modalEditarViaje} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalEditarViaje}
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
                  onClick={handleModalEditarViaje}
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
                    Editar Viaje
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="estado"
                      >
                        Estado
                      </label>

                      <select
                        id="estado"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={estadoEditar}
                        onChange={(e) => setEstadoEditar(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>

                        {estadosViaje.map((estado) => (
                          <option key={estado._id} value={estado.estado}>
                            {estado.estado}{" "}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="align-middle sm:flex sm:justify-between">
                      <div className="mb-1 sm:mr-2 sm:w-1/2">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="contenedor"
                        >
                          Numero de contenedor
                        </label>
                        <input
                          id="contenedor"
                          type="text"
                          placeholder="Nro Contenedor"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={numeroContenedorEditar}
                          onChange={(e) =>
                            setNumeroContenedorEditar(e.target.value)
                          }
                        />
                      </div>
                      {tipoCargaEditar !== "bultos" &&
                      tipoCargaEditar !== "pallets" &&
                      tipoCargaEditar !== "cajas" ? (
                        <div className="mt-6 mr-5 flex items-center justify-between">
                          <Button
                            className="text-center"
                            onClick={(e) => handleDev()}
                          >
                            Editar Devolucion
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {tipoCargaEditar === "cajas" ||
                    tipoCargaEditar === "bultos" ||
                    tipoCargaEditar === "pallets" ? (
                      <>
                        <div className="sm:flex sm:justify-between">
                          <div className="mb-1 sm:mr-2 sm:w-1/2">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="Cantidad"
                            >
                              Cantidad
                            </label>
                            <input
                              id="Cantidad"
                              type="text"
                              placeholder="Cantidad"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={cantidadEditar}
                              onChange={(e) =>
                                setCantidadEditar(e.target.value)
                              }
                            />
                          </div>
                          <div className="mb-1 sm:mr-2 sm:w-1/2">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="Peso"
                            >
                              Peso - KGS
                            </label>
                            <input
                              id="Peso"
                              type="text"
                              placeholder="Peso"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={pesoEditar}
                              onChange={(e) => setPesoEditar(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="sm:flex sm:justify-between">
                          <div className="mb-1 sm:mr-2 sm:w-1/2">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="Volumen"
                            >
                              Volumen
                            </label>
                            <input
                              id="Volumen"
                              type="text"
                              placeholder="Volumen"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={volumenEditar}
                              onChange={(e) => setVolumenEditar(e.target.value)}
                            />
                          </div>
                          <div className="mb-1 sm:ml-2 sm:w-1/2">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="Tipo"
                            >
                              Tipo de Carga
                            </label>
                            <select
                              id="Tipo"
                              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                              value={tipoCargaEditar}
                              onChange={(e) =>
                                setTipoCargaEditar(e.target.value)
                              }
                            >
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
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="sm:flex sm:justify-between">
                        <div className="mb-1 sm:mr-6 sm:w-1/2">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="Cantidad"
                          >
                            Tipo Contenedor
                          </label>
                          <select
                            id="tipocarga"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={tipoCargaEditar}
                            onChange={(e) => setTipoCargaEditar(e.target.value)}
                          >
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
                          </select>
                        </div>
                        <div className="mb-1 sm:mr-2 sm:w-1/2">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="Peso"
                          >
                            Peso - KGS
                          </label>
                          <input
                            id="Peso"
                            type="text"
                            placeholder="Peso"
                            className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                            value={pesoEditar}
                            onChange={(e) => setPesoEditar(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="sm:flex sm:justify-between">
                      <div className="mb-1 sm:mr-2 sm:w-1/2">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="fecha"
                        >
                          Fecha de Carga
                        </label>
                        <input
                          id="fecha"
                          type="date"
                          placeholder="Fecha de carga"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={fechaCArgaEditar}
                          onChange={(e) => setFechaCargaEditar(e.target.value)}
                        />
                      </div>
                      <div className="mb-1 sm:ml-2 sm:w-1/2">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="hora"
                        >
                          Hora de Carga
                        </label>
                        <input
                          id="hora"
                          type="time"
                          placeholder="Fecha de carga"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={horaCargaEditar}
                          onChange={(e) => setHoraCargaEditar(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-1 flex">
                      <div className="mr-2 w-1/2">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="origen"
                        >
                          Origen de la carga
                        </label>

                        <select
                          id="origen"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={origenEditar}
                          onChange={(e) => setOrigenEditar(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {tipoServicioViajeEditar === "one-way" ||
                          tipoServicioViajeEditar === "nacional" ||
                          tipoServicioViajeEditar === "vacios" ||
                          tipoServicioViajeEditar === "round-trip"
                            ? domiciliosCliente.map((domicilio) => (
                                <option
                                  key={domicilio._id}
                                  value={domicilio._id}
                                >
                                  {domicilio.fantasia}
                                  {"-"}
                                  {domicilio.direccion}
                                </option>
                              ))
                            : tipoServicioViajeEditar === "importacion" ||
                              tipoServicioViajeEditar === "transito-aduanero"
                            ? terminales.map((terminales) => (
                                <option
                                  key={terminales._id}
                                  value={terminales._id}
                                >
                                  {terminales.nombre}-{terminales.tipo}
                                </option>
                              ))
                            : tipoServicioViajeEditar === "empty-pick"
                            ? playas.map((terminales) => (
                                <option
                                  key={terminales._id}
                                  value={terminales._id}
                                >
                                  {terminales.nombre}-{terminales.direccion}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>

                      <div className="ml-2 w-1/2">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="destino"
                        >
                          Destino de la carga
                        </label>

                        <select
                          id="destino"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={destinoEditar}
                          onChange={(e) => setDestinoEDitar(e.target.value)}
                        >
                          <option value="">--Seleccionar--</option>

                          {tipoServicioViajeEditar === "one-way" ||
                          tipoServicioViajeEditar === "transito-aduanero" ||
                          tipoServicioViajeEditar === "round-trip"
                            ? terminales.map((terminales) => (
                                <option
                                  key={terminales._id}
                                  value={terminales._id}
                                >
                                  {terminales.nombre}-{terminales.tipo}
                                </option>
                              ))
                            : tipoServicioViajeEditar === "importacion" ||
                              tipoServicioViajeEditar === "nacional" ||
                              tipoServicioViajeEditar === "empty-pick"
                            ? domiciliosCliente.map((domicilio) => (
                                <option
                                  key={domicilio._id}
                                  value={domicilio._id}
                                >
                                  {domicilio.fantasia}
                                  {"-"}
                                  {domicilio.direccion}
                                </option>
                              ))
                            : tipoServicioViajeEditar === "vacios"
                            ? playas.map((domicilio) => (
                                <option
                                  key={domicilio._id}
                                  value={domicilio._id}
                                >
                                  {domicilio.nombre} {"-"}
                                  {domicilio.direccion}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="observaciones"
                      >
                        Observaciones Viaje
                      </label>

                      <textarea
                        id="observaciones"
                        type="text"
                        placeholder="Observaciones"
                        rows={2}
                        className="mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
                        value={observacionesViaje}
                        onChange={(e) => setObservacionesViaje(e.target.value)}
                      />
                    </div>

                    {/* <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="proveedor"
                      >
                        Proveedor
                      </label>

                      <input
                        id="proveedor"
                        type="text"
                        placeholder="Proveedor"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombreProveedorEditar}
                        onChange={(e) => setProveedorEditar(e.target.value)}
                        disabled={true}
                      />
                    </div>
                    <div className="mb-1 flex">
                      <div className="mr-2 w-1/3">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="chofer"
                        >
                          Chofer
                        </label>

                        <input
                          id="chofer"
                          type="text"
                          placeholder="Chofer"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={choferEditar}
                          disabled={true}
                        />
                      </div>

                      <div className="mx-2 w-1/3">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="camion"
                        >
                          Camion
                        </label>

                        <input
                          id="camion"
                          type="text"
                          placeholder="Camion"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={camionEditar}
                          disabled={true}
                        />
                      </div>

                      <div className="ml-2 w-1/3">
                        <label
                          className="text-sm font-bold uppercase text-gray-700"
                          htmlFor="semi"
                        >
                          Semi
                        </label>

                        <input
                          id="semi"
                          type="text"
                          placeholder="Semi"
                          className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                          value={semiEditar}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="mt-5 mb-3 flex items-center justify-between">
                      <Button
                        className="text-center"
                        onClick={(e) => handleReasignar()}
                      >
                        Cambiar Proveedor
                      </Button>
                      <Button
                        className="text-center"
                        onClick={(e) => handleEquipos()}
                      >
                        Elegir Equipos
                      </Button>
                    </div> */}

                    <input
                      type="submit"
                      className="mt-3 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar Cambios"}
                    />
                  </form>
                  <div className="text-center">
                    <Button
                      className="mt-3 w-80 cursor-pointer bg-red-500"
                      onClick={handleEliminar}
                    >
                      Eliminar Viaje
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

export default ModalEditarViaje;

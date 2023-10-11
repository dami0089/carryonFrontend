import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";

import useProveedores from "@/hooks/useProveedores";
import useServicios from "@/hooks/useServicios";

const ModalAsignarProveedor = () => {
  const {
    handleModalAsignarProveedor,
    modalAsignarProveedor,
    idAsignarProveedor,
    setIdAsignarProveedor,
    asignarProveedor,
    idObtenerServicio,
    idViajeAsignarProveedor,
    seAsignoProveedor,
    obtenerViajesServicio,
    handleCargando,
    setSeAsignoProveedor,
    setIdObtenerServicio,
    setIdViajeAsignarProveedor,
    setRecargoProximosViajes,
  } = useServicios();

  const { proveedores, obtenerProveedores } = useProveedores();

  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");

  // useEffect(() => {
  //   const obtenerViajes = async () => {
  //     if (seAsignoProveedor) {
  //       await obtenerViajesServicio(idObtenerServicio);
  //     }
  //   };
  //   obtenerViajes();
  // }, [seAsignoProveedor]);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([idAsignarProveedor].includes("")) {
      toast("⚠️ Elije un proveedor", {
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
    handleCargando();

    await asignarProveedor(
      idObtenerServicio,
      idAsignarProveedor,
      idViajeAsignarProveedor
    );
    setRecargoProximosViajes(true);
    handleCargando();
    setSeAsignoProveedor(true);
    setIdObtenerServicio("");
    setIdAsignarProveedor("");
    setIdViajeAsignarProveedor("");

    handleModalAsignarProveedor();
  };

  useEffect(() => {
    const obtenerprov = async () => {
      await obtenerProveedores();
    };
    obtenerprov();
  }, []);

  const handleNombreClienteChange = (e) => {
    const inputValue = e.target.value;
    setNombreProveedor(inputValue);

    // Filtrar los clientes basados en el nombre ingresado
    const coincidencias = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    setProveedoresFiltrados(coincidencias);
  };

  return (
    <Transition.Root show={modalAsignarProveedor} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalAsignarProveedor}
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
                  onClick={handleModalAsignarProveedor}
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
                    Asignar Proveedor
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cliente"
                      >
                        Selecciona el Proveedor
                      </label>

                      <input
                        id="cliente"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        type="text"
                        autoComplete="off"
                        placeholder="Ingresa el proveedor"
                        value={nombreProveedor}
                        onChange={handleNombreClienteChange}
                      />

                      {/* Mostrar las coincidencias */}
                      {proveedoresFiltrados.length > 0 && (
                        <div className="mt-2 max-h-40 overflow-y-auto rounded-md bg-gray-100">
                          <ul className="border border-gray-300 py-1 px-2">
                            {proveedoresFiltrados.map((proveedor) => (
                              <li
                                key={proveedor._id}
                                className="cursor-pointer py-1 hover:bg-gray-200"
                                onClick={() => {
                                  setNombreProveedor(proveedor.nombre);
                                  setIdAsignarProveedor(proveedor._id);
                                  setProveedoresFiltrados([]);
                                }}
                              >
                                {proveedor.nombre}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <input
                      type="submit"
                      className="mt-3 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Asignar"}
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

export default ModalAsignarProveedor;

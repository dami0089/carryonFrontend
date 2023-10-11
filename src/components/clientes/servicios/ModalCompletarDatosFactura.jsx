import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";
import useServicios from "@/hooks/useServicios";
import { formatearFecha } from "@/data/helpers/formatearFecha";

const ModalCompletarDatosFactura = () => {
  const {
    handleModalEditarDocumento,
    estadoDocu,
    setEstadoDocu,

    numeroDocumento,
    setNumeroDocumento,
    linkDocumento,
    setLinkDocumento,
    idDocumento,
    editarDocumento,

    setActualizoListadoDocu,

    handleModalValorizar,
    modalValorizar,

    fechaFactura,
    setFechaFactura,
    conceptoFactura,
    setConceptoFactura,
    descripcionFactura,
    setDescripcionFactura,
    referenciaClienteFactura,
    setReferenciaClienteFactura,
    despachoFactura,
    setDespachoFactura,
    remitoFactura,
    setRemitoFactura,
    contenedorFactura,
    setContenedorFactura,
    logicsarFactura,
    setLogicsarFactura,
    precioFactura,
    setPrecioFactura,
    idConceptoFactura,
    setIdConceptoFactura,
    editarConcepto,
    seActualizaConceptos,
    setSeActualizaConceptos,
    modalAgragarCampo,
    handleModalAgregarCampo,
    agregarConcepto,
    idObtenerServicio,
    handleModalFactura,
    modalCamposFactura,
  } = useServicios();

  const [fechaSinHora, setFechaSinHora] = useState("");
  const [fechamostrar, setfechamostrar] = useState("");

  // Función para cargar el valor de fecha desde la base de datos (simulado con un useEffect)
  useEffect(() => {
    const fechaSinHora = fechaFactura.split("T")[0]; // Extraer solo la parte de la fecha "2023-07-28"
    setfechamostrar(fechaSinHora); // Asignar la fecha sin hora al estado fechaFactura
  }, []);

  const [fechaAgregarFactura, setFechaAgregarFactura] = useState("");
  const [conceptoAgragarFactura, setConceptoAgregarFactura] = useState("");
  const [descripcionAgregarFactura, setDescripcionAgregarFactura] =
    useState("");
  const [precioAgregarFactura, setPrecioAgregarFactura] = useState("");

  useEffect(() => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
    const dia = String(fecha.getDate()).padStart(2, "0"); // El día del mes

    const fechaFormateada = `${año}-${mes}-${dia}`;
    setFechaAgregarFactura(fechaFormateada);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await agregarConcepto(
      idObtenerServicio,
      fechaAgregarFactura,
      conceptoAgragarFactura,
      descripcionAgregarFactura,
      referenciaClienteFactura,
      despachoFactura,
      remitoFactura,
      contenedorFactura,
      precioAgregarFactura
    );
    setFechaAgregarFactura("");
    setConceptoAgregarFactura("");
    setDescripcionAgregarFactura("");
    setPrecioAgregarFactura("");
    setSeActualizaConceptos(true);
    handleModalAgregarCampo();
  };

  return (
    <Transition.Root show={modalCamposFactura} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalFactura}
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
                  onClick={handleModalFactura}
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
                    Completar Factura
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fecha"
                      >
                        Fecha
                      </label>
                      <input
                        id="fecha"
                        type="date"
                        placeholder="Fecha"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={fechaAgregarFactura}
                        onChange={(e) => setFechaAgregarFactura(e.target.value)}
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="Numero"
                      >
                        Numero Factura
                      </label>
                      <input
                        id="Numero"
                        type="text"
                        placeholder="Numero Factura"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={conceptoAgragarFactura}
                        onChange={(e) =>
                          setConceptoAgregarFactura(e.target.value)
                        }
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="bruto"
                      >
                        Precio Bruto
                      </label>
                      <input
                        id="bruto"
                        type="text"
                        placeholder="Precio bruto"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={referenciaClienteFactura}
                        onChange={(e) =>
                          setReferenciaClienteFactura(e.target.value)
                        }
                        autocomplete="off"
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="iva"
                      >
                        IVA
                      </label>
                      <input
                        id="iva"
                        type="text"
                        placeholder="IVA"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={despachoFactura}
                        onChange={(e) => setDespachoFactura(e.target.value)}
                        autocomplete="off"
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="neto"
                      >
                        Precio Neto
                      </label>
                      <input
                        id="neto"
                        type="text"
                        placeholder="Precio Neto"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={remitoFactura}
                        onChange={(e) => setRemitoFactura(e.target.value)}
                        autocomplete="off"
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="link"
                      >
                        Link Factura
                      </label>
                      <input
                        id="link"
                        type="text"
                        placeholder="Link Factura"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={contenedorFactura}
                        onChange={(e) => setContenedorFactura(e.target.value)}
                        autocomplete="off"
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

export default ModalCompletarDatosFactura;

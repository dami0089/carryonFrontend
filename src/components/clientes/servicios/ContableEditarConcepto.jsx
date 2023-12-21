import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Dropzone from "./DropZone";
import { ToastContainer, toast } from "react-toastify";
import useServicios from "@/hooks/useServicios";
import useContable from "@/hooks/useContable";

const ContableEditarConcepto = () => {
  const { handleCargando, seActualizaConceptos, setSeActualizaConceptos } =
    useServicios();
  const {
    handleModalEditarConcepto,
    editarConcepto,
    tituloConcepto,
    setTituloConcepto,
    descripcion1,
    setDescripcion1,
    descripcion2,
    setDescripcion2,
    descripcion3,
    setDescripcion3,
    descripcion4,
    setDescripcion4,
    descripcion5,
    setDescripcion5,
    descripcion6,
    setDescripcion6,
    precioBrutoEditar,
    setPrecioBrutoEditar,
    editarMovimiento,
    idConceptoAFacturar,
    setIdConceptoAFActurar,
  } = useContable();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCargando();
    await editarMovimiento(
      idConceptoAFacturar,
      tituloConcepto,
      descripcion1,
      descripcion2,
      descripcion3,
      descripcion4,
      descripcion5,
      descripcion6,
      precioBrutoEditar
    );
    setIdConceptoAFActurar("");
    setTituloConcepto("");
    setDescripcion1("");
    setDescripcion2("");
    setDescripcion3("");
    setDescripcion4("");
    setDescripcion5("");
    setDescripcion6("");
    setPrecioBrutoEditar("");
    setSeActualizaConceptos(true);
    handleModalEditarConcepto();
    handleCargando();
  };

  return (
    <Transition.Root show={editarConcepto} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalEditarConcepto}
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
                  onClick={handleModalEditarConcepto}
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
                    Editar Concepto
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="titulo"
                      >
                        Titulo Concepto
                      </label>
                      <input
                        id="titulo"
                        type="text"
                        placeholder="Titulo Concepto"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tituloConcepto}
                        onChange={(e) => setTituloConcepto(e.target.value)}
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="dias"
                      >
                        Descripcion Servicio
                      </label>
                      <textarea
                        id="dias"
                        type="text"
                        placeholder="Descripcion Servicio"
                        className="mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
                        rows={3}
                        value={descripcion1}
                        onChange={(e) => setDescripcion1(e.target.value)}
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="ref"
                      >
                        Referencia Cliente
                      </label>
                      <input
                        id="ref"
                        type="text"
                        placeholder="Referencia Cliente"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcion2}
                        onChange={(e) => setDescripcion2(e.target.value)}
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="remito"
                      >
                        Numero Remito
                      </label>
                      <input
                        id="remito"
                        type="text"
                        placeholder="Numero Remito"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcion6}
                        onChange={(e) => setDescripcion6(e.target.value)}
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cont"
                      >
                        Numero Contenedor
                      </label>
                      <input
                        id="cont"
                        type="text"
                        placeholder="Numero Contenedor"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcion4}
                        onChange={(e) => setDescripcion4(e.target.value)}
                        autocomplete="off"
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="log"
                      >
                        Pedido Logicsar
                      </label>
                      <input
                        id="log"
                        type="text"
                        placeholder="Numero Pedido Logicsar"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcion5}
                        onChange={(e) => setDescripcion5(e.target.value)}
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="des"
                      >
                        Despacho Aduana
                      </label>
                      <input
                        id="des"
                        type="text"
                        placeholder="Numero Despacho"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={descripcion3}
                        onChange={(e) => setDescripcion3(e.target.value)}
                        autocomplete="off"
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="precio"
                      >
                        Precio Bruto
                      </label>
                      <input
                        id="precio"
                        type="text"
                        placeholder="Precio Bruto"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={precioBrutoEditar}
                        onChange={(e) => setPrecioBrutoEditar(e.target.value)}
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

export default ContableEditarConcepto;

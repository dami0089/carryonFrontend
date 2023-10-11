import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMensajeria from "@/hooks/useMensajeria";
import useAuth from "@/hooks/useAuth";

const ModalMensajeria = () => {
  //   const [modalMensajeria, setModalMensajeria] = useState(false);
  const [mensajesEnviados, setMensajesEnviados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { auth } = useAuth();
  const { modalMensajeria, handleModalMensajeria } = useMensajeria();

  //   const handleModalMensajeria = () => {
  //     setModalMensajeria(!modalMensajeria);
  //   };

  const handleEnviarMensaje = (e) => {
    e.preventDefault();
    if (mensaje.trim() !== "") {
      const nuevoMensaje = {
        remitente: auth.nombre,
        contenido: mensaje,
      };
      setMensajesEnviados([...mensajesEnviados, nuevoMensaje]);
      setMensaje("");
    } else {
      toast.error("Por favor, ingresa un mensaje válido");
    }
  };

  return (
    <Transition.Root show={modalMensajeria} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalMensajeria}
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
                  onClick={handleModalMensajeria}
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
                    Mensajes
                  </Dialog.Title>

                  <div className="mt-4 flex h-64 flex-col overflow-y-scroll rounded-md border border-gray-300 p-2">
                    {mensajesEnviados.map((mensaje, index) => (
                      <div
                        key={index}
                        className="mb-2 flex flex-col items-start"
                      >
                        <p className="text-sm font-semibold text-gray-600">
                          {mensaje.remitente}
                        </p>
                        <p className="rounded-md bg-blue-100 p-2 text-sm text-gray-800">
                          {mensaje.contenido}
                        </p>
                      </div>
                    ))}
                  </div>

                  <form className="my-2 mx-2" onSubmit={handleEnviarMensaje}>
                    <div className="mb-1">
                      <textarea
                        id="mensaje"
                        type="text"
                        placeholder="Escribe tu mensaje"
                        className="mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      className="mt-3 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Enviar"}
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

export default ModalMensajeria;

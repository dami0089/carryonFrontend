import React, { useState, useEffect, Fragment } from "react";
import io from "socket.io-client";
import dotenv from "dotenv";
import useServicios from "@/hooks/useServicios";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import QRCode from "qrcode";
import { ToastContainer } from "react-toastify";
import Cargando from "../deTodos/Cargando";

const Qr = () => {
  const [qr, setQr] = useState("");
  const {
    handleModalQr,
    modalQr,
    handleCargando,
    autenticado,
    setAutenticado,
  } = useServicios();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    // const socket = io("http://carryon.com.ar:3000");

    socket.on("connection-successful", () => {
      console.log("Connection with WhatsApp is successful!");
      // Aquí puedes realizar cualquier otra lógica que necesites una vez conectado.
    });

    socket.on("authentication-status", async (status) => {
      if (status === "authenticated") {
        setAutenticado("1");
      } else if (status === "requires-authentication") {
        setAutenticado("2");

        // Espera a que el evento "qr" sea emitido por el backend.
        socket.on("qr", async (qrText) => {
          // Genera la imagen QR a partir de la cadena recibida
          const qrImageUrl = await QRCode.toDataURL(qrText);
          setQr(qrImageUrl);
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Transition.Root show={modalQr} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalQr}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-center  align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalQr}
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

              <div className=" sm:flex sm:items-start">
                <div className="mt-3 w-full  sm:ml-0 sm:mt-0 sm:text-center">
                  {qr && <img src={qr} alt="QR Code" />}
                </div>
              </div>
              <Cargando />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Qr;

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import useServicios from "@/hooks/useServicios";
import Cargando from "@/components/deTodos/Cargando";

const TIPO = ["A", "B"];

const ModalEditarCliente = () => {
  const {
    setNombre,

    nombre,

    setActualizoCliente,
    setEmailFactura,
    cuit,
    setCuit,
    tipo,
    setTipo,
    emailFactura,
    telefonoCorporativo,
    setTelefonoCorporativo,

    domicilio,
    setDomicilio,

    localidad,
    setLocalidad,
    provincia,
    setProvincia,

    handleModalEditarCliente,
    modalEditarCliente,
    idClienteEditar,
    editoCliente,
  } = useClientes();

  const { handleCargando } = useServicios();

  const [cuitSiSeEdita, setCuitSiSeEdita] = useState("");

  useEffect(() => {
    if (cuitSiSeEdita === "") {
      setCuitSiSeEdita(cuit);
    }
  }, [cuit]);

  //Consultamos la base de datos para saber si el cliente ya esta registrado antes. Si no esta registrado cierra el modal y pasa al modal2
  const consultarBase = async () => {
    if (cuitSiSeEdita != cuit) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        await clienteAxios.post(`/clientes/comprobar`, { cuit }, config);

        await editoCliente({
          id: idClienteEditar,
          tipo: tipo,
          nombre: nombre,
          cuit: cuit,
          domicilio: domicilio,
          localidad: localidad,
          provincia: provincia,
          mailFactura: emailFactura,
          telefono: telefonoCorporativo,
        });

        toast.success("Cliente editado correctamente", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      try {
        await editoCliente({
          id: idClienteEditar,
          tipo: tipo,
          nombre: nombre,
          cuit: cuit,
          domicilio: domicilio,
          localidad: localidad,
          provincia: provincia,
          mailFactura: emailFactura,
          telefono: telefonoCorporativo,
        });

        toast.success("Cliente editado correctamente", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error("Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCargando();
    consultarBase(cuit);
    setTipo("");
    setNombre("");
    setCuit("");
    setDomicilio("");
    setLocalidad("");
    setProvincia("");
    setEmailFactura("");
    setTelefonoCorporativo("");
    setActualizoCliente(true);
    handleModalEditarCliente("");
    handleCargando();

    //  validarCuit(cuit);
  };

  return (
    <Transition.Root show={modalEditarCliente} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalEditarCliente}
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
                  onClick={handleModalEditarCliente}
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
                    Editar Cliente
                  </Dialog.Title>

                  <form className="my-2 mx-2" onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="plan"
                      >
                        Tipo
                      </label>
                      <select
                        id="plan"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        {TIPO.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="razon"
                      >
                        {tipo === "A" || tipo === ""
                          ? "Razon Social"
                          : "Nombre"}
                      </label>
                      <input
                        id="razon"
                        type="text"
                        placeholder={
                          tipo === "A" || tipo === ""
                            ? "Razon Social"
                            : "Nombre"
                        }
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cuit"
                      >
                        {tipo === "A" || tipo === "" ? "Cuit" : "Dni"}
                      </label>
                      <input
                        id="cuit"
                        type="text"
                        placeholder={
                          tipo === "A" || tipo === "" ? "Cuit" : "Dni"
                        }
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={cuitSiSeEdita}
                        onChange={(e) => setCuitSiSeEdita(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="domicilio"
                      >
                        Domicilio Fiscal
                      </label>
                      <input
                        id="domicilio"
                        type="text"
                        placeholder="Domicilio"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={domicilio}
                        onChange={(e) => setDomicilio(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="localidad"
                      >
                        Localidad
                      </label>
                      <input
                        id="localidad"
                        type="text"
                        placeholder="Localidad"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="provincia"
                      >
                        Provincia
                      </label>
                      <input
                        id="provincia"
                        type="text"
                        placeholder="Provincia"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={provincia}
                        onChange={(e) => setProvincia(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="email"
                      >
                        Email Facturacion
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email "
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={emailFactura}
                        onChange={(e) => setEmailFactura(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="email"
                      >
                        Telefono Corporativo
                      </label>
                      <input
                        id="email"
                        type="number"
                        placeholder="Telefono"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={telefonoCorporativo}
                        onChange={(e) => setTelefonoCorporativo(e.target.value)}
                      />
                    </div>
                    <input
                      type="submit"
                      className="mt-4 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Continuar"}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
        <Cargando />
      </Dialog>
    </Transition.Root>
  );
};

export default ModalEditarCliente;

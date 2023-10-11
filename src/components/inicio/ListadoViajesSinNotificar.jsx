import { Button, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";

import { formatearFecha } from "@/data/helpers/formatearFecha";

import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";
import { ToastContainer } from "react-toastify";
import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";

const ListadoViajesSinNotificar = () => {
  const {
    obtenerServicio,

    handleModalAsignarProveedor,
    setIdViajeAsignarProveedor,
    setIdObtenerServicio,
    handleModalEstadoViaje,
    setEstadoCambiado,
    viajesSinNotificar,
    obtenerViajesSinNotificar,
    notificarViajes,
    notificarAceptacion,
    resultOK,
    setResultOk,
    setBuscoActualizaciones,
    handleCargando,
  } = useServicios();

  const { setSelectInicio, setSeleccion, setValueProfile } = useClientes();
  const [recargarListado, setRecargarListado] = useState(false);

  useEffect(() => {
    const obtenerViajes = async () => {
      await obtenerViajesSinNotificar();
    };
    obtenerViajes();
  }, []);

  useEffect(() => {
    const obtenerViajes = async () => {
      await obtenerViajesSinNotificar();
      setResultOk(false);
    };
    obtenerViajes();
  }, [resultOK]);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (recargarListado) {
        await obtenerViajesSinNotificar();
        handleCargando();
        setRecargarListado(false);
      }
    };
    obtenerViajes();
  }, [recargarListado]);

  const handleVolverInicio = (e) => {
    e.preventDefault();
    setSelectInicio(1);
    setIdViajeAsignarProveedor("");
    setIdObtenerServicio("");
    setBuscoActualizaciones(true);
  };
  const handleNotificar = async (_id) => {
    handleCargando();
    await notificarViajes(_id);
    setRecargarListado(true);
  };

  const handleAceptar = async (_id) => {
    await notificarAceptacion(_id);
    setResultOk(true);
  };

  return (
    <>
      <div className="mt-20">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-5 flex justify-between">
          <Typography className="font-bold uppercase">
            Servicios sin Notificar
          </Typography>
          <Button
            className="w-30 mx-2 bg-green-300 text-center"
            fullWidth
            onClick={(e) => handleVolverInicio(e)}
          >
            Volver a Inicio
          </Button>
        </div>
        <CardBody className=" overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Numero servicio",
                  "Cliente",
                  "Fecha y hora de carga",
                  "Tipo de Carga",
                  "Contenedores",
                  "Estado",
                  "Accion",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {viajesSinNotificar.map(
                (
                  {
                    _id,
                    numeroPedido,
                    nombreCliente,
                    fechaCarga,
                    horaCarga,
                    tipoCarga,
                    cantidad,
                    notificado,
                    estado,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {numeroPedido}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {nombreCliente}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {formatearFechaNuevo(fechaCarga)} / {horaCarga} Hs
                          </Typography>
                        </div>
                      </td>

                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {tipoCarga}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {cantidad}
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center">
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-black"
                          >
                            {estado}
                          </Typography>
                        </div>
                      </td>
                      {estado == "Coordinado" && notificado != "Notificado" ? (
                        <td className={className}>
                          <Button
                            color="blue"
                            className="-mt-1 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                            fullWidth
                            onClick={(e) => handleNotificar(_id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              {console.log(notificado)}
                              Informar Flete
                            </Typography>
                          </Button>
                        </td>
                      ) : estado == "Por Responder" ? (
                        <td className={className}>
                          <Button
                            color="blue"
                            className="-mt-1 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                            fullWidth
                            onClick={(e) => handleAceptar(_id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              Aceptacion
                            </Typography>
                          </Button>
                        </td>
                      ) : (
                        <td className={className}>
                          <div className="rounded-xl border border-gray-300 bg-deep-orange-500 p-1 text-center">
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-black"
                            >
                              Esperando estado Coordinado
                            </Typography>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </div>
    </>
  );
};

export default ListadoViajesSinNotificar;

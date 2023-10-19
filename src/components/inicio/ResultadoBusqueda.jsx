import { Button, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";

import { formatearFecha } from "@/data/helpers/formatearFecha";

import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";
import { ToastContainer } from "react-toastify";
import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";
import useProveedores from "@/hooks/useProveedores";
import { useNavigate } from "react-router-dom";

const ResultadoBusqueda = () => {
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

    busquedaCliente,
    busquedaViaje,
    busquedaServicio,
    busquedaProveedores,
    paginaLogisticaSelector,
    setPaginaLogisticaSelector,
    enBusqueda,
    setEnbusqueda,
  } = useServicios();
  const navigate = useNavigate();
  const {
    setSelectInicio,
    setValueProfile,
    setSeleccion,
    setCuitEditar,
    selectInicio,
    seleccion,
    seleccionComercial,
    setSeleccionComercial,
  } = useClientes();

  const { seleccionProveedor, setSeleccionProveedor, setCuitEditarProveedor } =
    useProveedores();

  const handleResultadoCliente = async (e, id) => {
    e.preventDefault();
    await setCuitEditar(id);
    navigate("/clientes/ficha-cliente");
  };

  const handleResultadoViaje = async (e, servicio) => {
    e.preventDefault();
    setIdObtenerServicio(servicio);
    navigate("/coordinacion/ficha-servicio");
  };

  const handleResultadoServicio = async (e, servicio) => {
    e.preventDefault();
    setIdObtenerServicio(servicio);
    navigate("/coordinacion/ficha-servicio");
  };

  const handleResultadoProveedor = async (e, id) => {
    e.preventDefault();
    setCuitEditarProveedor(id);
    navigate("/proveedores/ficha-proveedor");
  };

  return (
    <>
      <div className="mt-20">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-5 flex justify-between">
          <Typography className="font-bold uppercase">
            Resultado Busqueda
          </Typography>
        </div>
        <CardBody className=" overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto text-center">
            <thead>
              <tr>
                {["Tipo", "Descripcion", "Accion"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 px-6 py-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-center text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {busquedaViaje ? (
              <>
                <tbody>
                  {busquedaViaje.map(
                    (
                      { _id, numeroDeViaje, nombreCliente, servicio, estado },
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
                            <div className="rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center">
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-black"
                              >
                                Viaje
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              Nombre Cliente: {nombreCliente} Viaje Nro:{" "}
                              {numeroDeViaje}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Button
                              color="blue"
                              className="-mt-1 h-8 items-center gap-4 px-6 pb-1 pt-1 capitalize"
                              onClick={(e) => handleResultadoViaje(e, servicio)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                Ver
                              </Typography>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </>
            ) : (
              ""
            )}
            {busquedaCliente ? (
              <>
                <tbody>
                  {busquedaCliente.map(
                    (
                      {
                        _id,
                        nombre,
                        cuit,
                        mailFactura,

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
                            <div className="rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center">
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-black"
                              >
                                Cliente
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              Nombre Cliente: {nombre} Cuit: {cuit} Email:{" "}
                              {mailFactura}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Button
                              color="blue"
                              className="-mt-1 h-8 items-center gap-4 px-6 pb-1 pt-1 capitalize"
                              onClick={(e) => handleResultadoCliente(e, _id)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                Ver
                              </Typography>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </>
            ) : (
              ""
            )}
            {busquedaProveedores ? (
              <>
                <tbody>
                  {busquedaProveedores.map(
                    (
                      {
                        _id,
                        nombre,
                        cuit,
                        email,

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
                            <div className="rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center">
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-black"
                              >
                                Proveedor
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              Nombre Proveedor: {nombre} cuit: {cuit} Email:{" "}
                              {email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Button
                              color="blue"
                              className="-mt-1 h-8 items-center gap-4 px-6 pb-1 pt-1 capitalize"
                              onClick={(e) => handleResultadoProveedor(e, _id)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                Ver
                              </Typography>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </>
            ) : (
              ""
            )}
            {busquedaServicio ? (
              <>
                <tbody>
                  {busquedaServicio.map(
                    (
                      {
                        _id,
                        nombreCliente,
                        destinoCarga,
                        observaciones,
                        nombreTerminal,
                        nombreProveedor,
                        nombreChofer,
                        numeroCliente,
                        numeroPedido,
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
                            <div className="rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center">
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-black"
                              >
                                Servicio
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              Servicio: {numeroPedido} Cliente: {nombreCliente}{" "}
                              Destino: {destinoCarga}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Button
                              color="blue"
                              className="-mt-1 h-8 items-center gap-4 px-6 pb-1 pt-1 capitalize"
                              onClick={(e) => handleResultadoServicio(e, _id)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                Ver
                              </Typography>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </>
            ) : (
              ""
            )}
          </table>
        </CardBody>
      </div>
    </>
  );
};

export default ResultadoBusqueda;

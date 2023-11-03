import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";

import useProveedores from "@/hooks/useProveedores";

import useServicios from "@/hooks/useServicios";

import useClientes from "@/hooks/useClientes";

import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";
import { ArrowPathIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { formateoFechaCortoDesdeCadena } from "@/data/helpers/formateoFechaCortoDesdeCadena";
import useMinutas from "@/hooks/useMinutas";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListadoLIquidacionMensualPorProveedor = () => {
  const { serviciosProveedor, setSeleccionVistaProveedor } = useProveedores();

  const {
    obtenerServicio,

    obtenerViajes,

    setVolver,

    setChofer,
    setIdViajeAsignarProveedor,
    setEstadoCambiado,
    handleModalEstadoViaje,
    recargarListadoTodosViajes,
    setRecargarListadoTodosViajes,
    obtenerViajesValorizarClientes,
    viajesLiquidarClientes,
    fijarPrecioViajeCliente,

    fijarPrecioAdicional,
    handleCargando,
    setIdServicio,
    setIdObtenerServicio,
  } = useServicios();
  const navigate = useNavigate();
  const {
    clientes,

    handleModalNuevoFiltroLiquidacionClientes,

    setSeleccion,
  } = useClientes();

  const [fichaoNo, setFichaOno] = useState(1);
  const [precioDelViaje, setPrecioDelViaje] = useState({});
  const [precioDelAdicional, setPrecioDelAdicional] = useState({});
  const { obtenerMinutasServicio } = useMinutas();

  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");

  const [reiniciarListado, setReiniciarListado] = useState(false);

  const handleEdit = async (e, _id) => {
    e.preventDefault();
    await obtenerServicio(_id);
    await obtenerMinutasServicio(_id);
    setIdServicio(_id);
    setSeleccion(10);
    setVolver(8);
  };

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerViajesValorizarClientes();
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (reiniciarListado) {
        handleCargando();
        await obtenerViajesValorizarClientes();
        handleCargando();

        setReiniciarListado(false);
      }
    };
    obtenerInfo();
  }, [reiniciarListado]);

  // useEffect(() => {
  //   const obtenercli = async () => {
  //     await obtenerClientes();
  //   };
  //   obtenercli();
  // }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (recargarListadoTodosViajes) {
        await obtenerViajes();
        setRecargarListadoTodosViajes(false);
      }
    };
    obtenerInfo();
  }, [recargarListadoTodosViajes]);

  const handleCambiarEstado = (_id, estado, chofer) => {
    setEstadoCambiado(estado);
    setIdViajeAsignarProveedor(_id);
    setChofer(chofer);
    handleModalEstadoViaje();
  };

  const handleNombreClienteChange = (e) => {
    const inputValue = e.target.value;
    setNombreCliente(inputValue);

    // Filtrar los clientes basados en el nombre ingresado
    const coincidencias = clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    setClientesFiltrados(coincidencias);
  };

  const handleopen = (e) => {
    handleModalNuevoFiltroLiquidacionClientes();
  };

  const guardarPrecioViajeEnLaBaseDeDatos = async (id, precio) => {
    await fijarPrecioViajeCliente(id, precio);
  };

  const guardarPrecioAdicionalEnLaBaseDeDatos = async (id, precio) => {
    await fijarPrecioAdicional(id, precio);
  };

  const handleReiniciar = (e) => {
    e.preventDefault();
    setReiniciarListado(true);
  };

  const handleClick = async (e, servicio) => {
    e.preventDefault();
    setIdObtenerServicio(servicio);
    navigate("/coordinacion/ficha-servicio");
  };

  return (
    <>
      <div className="mb-6 mt-8 flex justify-between">
        <Typography className="mb-5 ml-3 mt-1 font-bold">
          Liquidacion por Transporte
        </Typography>
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="flex  text-center align-middle">
          <ArrowPathIcon
            className="mr-5 h-6 w-6 hover:cursor-pointer"
            title="Recargar Formulario"
            onClick={(e) => handleReiniciar(e)}
          />
          <FunnelIcon
            className="mr-5 h-8 w-8 cursor-pointer"
            title="Filtrar Clientes"
            onClick={(e) => {
              handleopen(e);
            }}
          ></FunnelIcon>
        </div>
      </div>
      <div className="mb-4  grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className=" overflow-x-scroll px-0 pb-2 pt-0">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-gray-50">
                  <tr>
                    {[
                      "Nro Viaje",
                      "Fecha Inicio y Terminacion",
                      "Por cuenta y Orden De",
                      "Tipo de Servicio",
                      "Origen y Destino",
                      "Observaciones del Pedido",
                      "Observaciones del viaje",
                      "Adicionales",
                      "Dias de Demora",
                      "Importe Cobrado",
                      "Adicional Cobrado",
                      "Importe Pagado",
                      "Adicional Pagado",
                      "Estado",
                      "Empresa",
                      "Chofer",
                      "Remito",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-6 py-3  text-center"
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
                  {viajesLiquidarClientes // Filtrar proveedores con estado distinto a "Terminado"
                    .map(
                      (
                        {
                          _id,
                          estadoServicio,
                          numeroDeViaje,
                          fechaOrigen,
                          horaOrigen,
                          tipoServicio,
                          nombreCliente,
                          numeroContenedor,

                          tipoCarga,
                          cantidadCarga,
                          pesoCarga,
                          volumenCarga,
                          nombreDomicilioOrigenCliente,
                          nombreDomicilioOrigenTerminal,
                          nombreDomicilioDestinoCliente,
                          nombreDomicilioDestinoTerminal,
                          nombreProveedor,
                          nombreChofer,
                          patenteSemi,
                          patenteCamion,
                          adicionales,
                          fechaTerminacion,
                          horaTerminacion,
                          diasDemora,
                          estado,
                          observacionesServicio,
                          observacionesViaje,
                          servicio,
                          notificado,
                          proveedor,
                          fantasiaOrigen,
                          fantasiaDestino,
                          chofer,
                          numeroFactura,
                          precioViaje,
                          precioAdicional,
                          AdicionalPagado,
                          importePagado,
                          estadoDocumentacion,
                        },
                        key
                      ) => {
                        const className = `text-center py-3 px-5 ${
                          key === projectsTableData.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            <td className={className}>
                              <Button
                                color="blue"
                                className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap ${
                                  estadoServicio === "Coordinado"
                                    ? "bg-green-300"
                                    : "bg-deep-orange-300"
                                }  px-4 py-1 `}
                                fullWidth
                                onClick={(e) => handleClick(e, servicio)}
                              >
                                <Typography
                                  variant="small"
                                  className="flex items-center justify-between text-sm font-medium capitalize"
                                >
                                  <span className="mr-1 text-black ">
                                    {numeroDeViaje}
                                  </span>
                                </Typography>
                              </Button>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="w-40 text-center text-xs font-medium "
                                >
                                  {formateoFechaCorto(fechaOrigen)}-{horaOrigen}{" "}
                                  Hs
                                  <br />
                                  {fechaTerminacion
                                    ? formateoFechaCortoDesdeCadena(
                                        fechaTerminacion
                                      )
                                    : ""}
                                  {horaTerminacion
                                    ? "-" + horaTerminacion + "HS"
                                    : ""}
                                </Typography>
                              </div>
                            </td>

                            <td className={className}>
                              <Typography
                                variant="small"
                                className="w-40 text-xs font-black uppercase text-blue-gray-600"
                              >
                                {nombreCliente}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium uppercase text-blue-gray-600"
                              >
                                {tipoCarga}
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography
                                variant="small"
                                className="w-40 text-center text-xs font-medium text-blue-gray-600"
                              >
                                {tipoServicio === "importacion"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenTerminal
                                  : tipoServicio === "nacional"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenTerminal
                                  : tipoServicio === "one-way"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenCliente
                                  : tipoServicio === "transito-aduanero"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenCliente
                                  : ""}
                                {"-"}
                                <br />
                                {tipoServicio === "importacion"
                                  ? fantasiaDestino ??
                                    nombreDomicilioDestinoCliente
                                  : tipoServicio === "nacional"
                                  ? fantasiaDestino ??
                                    nombreDomicilioDestinoCliente
                                  : tipoServicio === "one-way"
                                  ? fantasiaDestino ??
                                    nombreDomicilioDestinoTerminal
                                  : tipoServicio === "transito-aduanero"
                                  ? fantasiaDestino ??
                                    nombreDomicilioDestinoTerminal
                                  : ""}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {observacionesServicio}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-center text-xs font-medium text-blue-gray-600"
                              >
                                {observacionesViaje}
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography
                                variant="small"
                                className="w-40 text-xs font-medium text-blue-gray-600"
                              >
                                {adicionales}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-center text-xs font-medium text-black"
                              >
                                {diasDemora}
                              </Typography>
                            </td>

                            <td className={className}>
                              <input
                                type="text"
                                className="h-8 rounded-lg border bg-white text-center text-xs font-medium text-black focus:bg-blue-200"
                                value={
                                  "$" +
                                  (precioDelViaje[_id] ||
                                    (precioViaje ? precioViaje : ""))
                                }
                                placeholder="$"
                                onChange={(e) => {
                                  const nuevoPrecio = e.target.value.replace(
                                    /^\$/,
                                    ""
                                  ); // quita el signo de dolar al principio
                                  setPrecioDelViaje({
                                    ...precioDelViaje,
                                    [_id]: nuevoPrecio,
                                  });
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    guardarPrecioViajeEnLaBaseDeDatos(
                                      _id,
                                      precioDelViaje[_id]
                                    );
                                  }
                                }}
                              />
                            </td>

                            <td className={className}>
                              <input
                                type="text"
                                className="h-8 rounded-lg border bg-white text-center text-xs font-medium text-black focus:bg-blue-200"
                                value={
                                  "$" +
                                  (precioDelAdicional[_id] ||
                                    (precioAdicional ? precioAdicional : ""))
                                }
                                placeholder="$"
                                onChange={(e) => {
                                  const nuevoPrecio = e.target.value.replace(
                                    /^\$/,
                                    ""
                                  ); // quita el signo de dolar al principio
                                  setPrecioDelAdicional({
                                    ...precioDelAdicional,
                                    [_id]: nuevoPrecio,
                                  });
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    guardarPrecioAdicionalEnLaBaseDeDatos(
                                      _id,
                                      precioDelAdicional[_id]
                                    );
                                  }
                                }}
                              />
                            </td>

                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-center text-xs font-medium text-black"
                              >
                                {importePagado ? importePagado : "-"}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-center text-xs font-medium text-black"
                              >
                                {AdicionalPagado ? AdicionalPagado : "-"}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="rounded-xl p-1 text-center">
                                <Button
                                  className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap ${
                                    estadoServicio == "Aceptado"
                                      ? "bg-deep-orange-300"
                                      : ""
                                  } ${
                                    estadoServicio == "Coordinado"
                                      ? "bg-green-400 text-black"
                                      : ""
                                  } ${
                                    estadoServicio == "Por Facturar"
                                      ? "bg-blue-300"
                                      : ""
                                  } ${
                                    estadoServicio == "Terminado"
                                      ? "bg-blue-gray-500 text-black"
                                      : ""
                                  }  px-4 py-1`}
                                  fullWidth
                                >
                                  <Typography
                                    variant="small"
                                    className="flex items-center justify-between text-sm font-medium capitalize"
                                  >
                                    {estadoServicio}
                                  </Typography>
                                </Button>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="w-40 text-xs font-black uppercase text-blue-gray-600"
                              >
                                {nombreProveedor ? nombreProveedor : "-"}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="w-40 text-center text-xs font-medium text-black"
                              >
                                {nombreChofer ? nombreChofer : "-"}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className={`min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap rounded-xl p-1 text-center font-bold text-white ${
                                  estadoDocumentacion === "entregado"
                                    ? "bg-green-500 uppercase"
                                    : "bg-red-500"
                                }`}
                              >
                                {estadoDocumentacion === "entregado"
                                  ? estadoDocumentacion
                                  : "PENDIENTE"}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ListadoLIquidacionMensualPorProveedor;

import { CardBody, Typography, Button, Card } from "@material-tailwind/react";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import { toast } from "react-toastify";
import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";
import useContable from "@/hooks/useContable";

const ValorizacionViajeDesdeFicha = () => {
  const {
    viajesServicio,
    idObtenerServicio,
    handleCargando,
    obtenerConceptos,
    actualizoConceptos,
    setActualizoConceptos,
    seActualizaConceptos,
    setSeActualizaConceptos,
    fijarPrecioViajeCliente,
    fijarPrecioAdicional,
    obtenerServicio,
  } = useServicios();

  const { obtenerFacturaEmitida } = useContable();

  const [precioDelViaje, setPrecioDelViaje] = useState({});
  const [precioDelAdicional, setPrecioDelAdicional] = useState({});

  useEffect(() => {
    const obtenerCons = async () => {
      handleCargando();
      await obtenerFacturaEmitida(idObtenerServicio);
      handleCargando();
    };
    obtenerCons();
  }, []);

  useEffect(() => {
    const obtenerFactu = async () => {
      await obtenerConceptos(idObtenerServicio);
    };
    obtenerFactu();
  }, []);

  useEffect(() => {
    const obtenerCons = async () => {
      if (actualizoConceptos) {
        handleCargando();
        await obtenerConceptos(idObtenerServicio);
        handleCargando();
        setActualizoConceptos(false);
      }
    };
    obtenerCons();
  }, [actualizoConceptos]);

  useEffect(() => {
    const actualizar = async () => {
      handleCargando();
      await obtenerServicio(idObtenerServicio);
      setActualizoConceptos(false);
      handleCargando();
    };
    actualizar();
  }, [actualizoConceptos]);

  useEffect(() => {
    const obtenerCons = async () => {
      if (seActualizaConceptos) {
        handleCargando();
        await obtenerConceptos(idObtenerServicio);
        handleCargando();
        setSeActualizaConceptos(false);
      }
    };
    obtenerCons();
  }, [seActualizaConceptos]);

  const guardarPrecioViajeEnLaBaseDeDatos = async (id, precio) => {
    try {
      await fijarPrecioViajeCliente(id, precio);
      setSeActualizaConceptos(true);
    } catch (error) {
      toast.error("El valor del viaje no se guardo", {
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
  };

  const guardarPrecioAdicionalEnLaBaseDeDatos = async (id, precio) => {
    await fijarPrecioAdicional(id, precio);
    setSeActualizaConceptos(true);
  };

  return (
    <>
      <div className="ml-4 mr-4 flex justify-between">
        <Typography variant="h6" color="blue-gray" className="mb-1">
          Valorizacion
        </Typography>
      </div>
      <div className="mb-4  mt-5 grid grid-cols-1  gap-6 xl:grid-cols-3">
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
                      "Factura",
                      "Estado",
                      "Importe Cobrado",
                      "Adicional Cobrado",
                      "Importe Pagado",
                      "Adicional Pagado",
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
                  {viajesServicio // Filtrar proveedores con estado distinto a "Terminado"
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
                          tipoCarga,
                          nombreDomicilioOrigenCliente,
                          nombreDomicilioOrigenTerminal,
                          nombreDomicilioDestinoCliente,
                          nombreDomicilioDestinoTerminal,
                          adicionales,
                          fechaTerminacion,
                          horaTerminacion,
                          diasDemora,
                          estado,
                          observacionesServicio,
                          observacionesViaje,
                          servicio,
                          fantasiaOrigen,
                          fantasiaDestino,
                          numeroFactura,
                          precioViaje,
                          precioAdicional,
                          AdicionalPagado,
                          importePagado,
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
                                // onClick={(e) => handleClick(e, servicio)}
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
                                    ? formateoFechaCorto(fechaTerminacion)
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
                                    nombreDomicilioOrigenCliente
                                  : tipoServicio === "one-way"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenCliente
                                  : tipoServicio === "transito-aduanero"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenCliente
                                  : tipoServicio === "vacios"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenCliente
                                  : tipoServicio === "importacion"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenTerminal
                                  : tipoServicio === "round-trip"
                                  ? fantasiaOrigen ??
                                    nombreDomicilioOrigenTerminal
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
                                  : tipoServicio === "vacios"
                                  ? fantasiaDestino ??
                                    nombreDomicilioDestinoTerminal
                                  : tipoServicio === "round-trip"
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
                              <Typography
                                variant="small"
                                className="text-center text-xs font-medium text-black"
                              >
                                {numeroFactura ? numeroFactura : "-"}
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
                              <div className="flex items-center">
                                <span className="mr-2">$</span>
                                <input
                                  type="text"
                                  className="h-8 w-24 rounded-lg border bg-white text-center text-xs font-medium text-black focus:bg-blue-200"
                                  value={
                                    precioDelViaje[_id] ||
                                    (precioViaje ? precioViaje : "")
                                  }
                                  placeholder="Precio del Viaje"
                                  onChange={(e) => {
                                    const nuevoPrecio = e.target.value.replace(
                                      /[^0-9.]/g,
                                      ""
                                    ); // Acepta solo números y puntos
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
                              </div>
                            </td>

                            <td className={className}>
                              <div className="flex items-center">
                                <span className="mr-2">$</span>
                                <input
                                  type="text"
                                  className="h-8 w-24 rounded-lg border bg-white text-center text-xs font-medium text-black focus:bg-blue-200"
                                  value={
                                    precioDelAdicional[_id] ||
                                    (precioAdicional ? precioAdicional : "")
                                  }
                                  placeholder="Precio Adicional"
                                  onChange={(e) => {
                                    const nuevoPrecio = e.target.value.replace(
                                      /[^0-9.]/g,
                                      ""
                                    ); // Acepta solo números y puntos
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
                              </div>
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

export default ValorizacionViajeDesdeFicha;

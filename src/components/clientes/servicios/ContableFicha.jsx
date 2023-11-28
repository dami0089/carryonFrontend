import { CardBody, Typography, Button, Card } from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import useMinutas from "@/hooks/useMinutas";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import useProveedores from "@/hooks/useProveedores";
import { StatisticsCard } from "@/widgets/cards";
import {
  BanknotesIcon,
  ChevronDoubleDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  PaperClipIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";
import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";
import useContable from "@/hooks/useContable";
import { formatearPrecio } from "@/data/helpers/formatearPrecio";

const ContableFicha = () => {
  const {
    cuitEditar,
    formaDePago,

    obtenerCliente,
  } = useClientes();

  const {
    viajesServicio,
    idObtenerServicio,
    handleCargando,
    conceptosAFacturar,
    obtenerConceptos,
    actualizoConceptos,
    setActualizoConceptos,
    seActualizaConceptos,
    setSeActualizaConceptos,
    fijarPrecioViajeCliente,
    fijarPrecioAdicional,
    estadoObtenerServicio,
    clienteObtenerServicio,
    obtenerServicio,
  } = useServicios();

  const { crearFactura } = useContable();

  const [fichaoNo, setFichaOno] = useState(1);
  const [precioDelViaje, setPrecioDelViaje] = useState({});
  const [precioDelAdicional, setPrecioDelAdicional] = useState({});
  const [numeroFact, setNumeroFact] = useState({});

  const { equiposData, choferesProveedor, camionesProveedor } =
    useProveedores();

  const [viajeOChoferes, setViajeOChoferes] = useState(1);

  useEffect(() => {
    const obtenerCons = async () => {
      handleCargando();
      await obtenerConceptos(idObtenerServicio);
      handleCargando();
    };
    obtenerCons();
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

  const facturar = async (e) => {
    e.preventDefault();
    if (estadoObtenerServicio !== "Por Facturar") {
      return toast.error(
        "Para facturar, el servicio tiene que tener estado -Por Facturar-",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
    handleCargando();
    await crearFactura(idObtenerServicio);
    setSeActualizaConceptos(true);
    handleCargando();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      {/* <div className="mb-3 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4 ">
        <Card
          onClick={(e) => handleModalCompletarFactura(e)}
          className="cursor-pointer"
        >
          <Card
            variant="gradient"
            disabled={true}
            className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-300 text-white"
          >
            <SquaresPlusIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Completar Factura
            </Typography>
          </CardBody>
        </Card>
        <Card
          onClick={(e) => handleAgregarCampoFactura(e)}
          className="cursor-pointer"
        >
          <Card
            variant="gradient"
            disabled={true}
            className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-400 text-white"
          >
            <DocumentPlusIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Agregar Campo
            </Typography>
          </CardBody>
        </Card>
      </div> */}

      {/* <Card className="mb-5 p-4">
        <Typography variant="small" className="mb-2 text-2xl font-bold">
          Información
        </Typography>
        <Typography variant="small">
          <span className="text-l font-bold">Nombre Cliente: </span>
          <span
            onClick={(e) => handleReturnProfile(e)}
            className="cursor-pointer text-blue-500"
          > */}
      {/* {nombreClienteObtenerServicio} */}
      {/* </span>
        </Typography>
        <Typography variant="small">
          <span className="font-bold">Importe Bruto:</span>{" "} */}
      {/* {origenCargaObtenerServicio} */}
      {/* </Typography>
        <Typography variant="small">
          <span className="font-bold">IVA:</span>{" "} */}
      {/* {destinoCargaObtenerServicio} */}
      {/* </Typography>
        <Typography variant="small">
          <span className="font-bold">Neto a Pagar:</span>{" "} */}
      {/* {camionesObtenerServicio} */}
      {/* </Typography>
      </Card> */}

      <div className="ml-4 mr-4 flex justify-between">
        <Typography variant="h6" color="blue-gray" className="mb-1">
          Conceptos a Facturar
        </Typography>
        {estadoObtenerServicio === "Por Facturar" ? (
          <Button onClick={(e) => facturar(e)}>Facturar</Button>
        ) : estadoObtenerServicio === "Facturado" ? (
          <Button disabled={true}>Servicio Facturado</Button>
        ) : (
          ""
        )}
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

      <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Servicio", "Importe"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 px-6 py-3 text-center"
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
            {conceptosAFacturar.map(
              (
                {
                  _id,
                  fecha,
                  cliente,
                  nombreCliente,
                  estado,
                  descripcion0,
                  descripcion1,
                  descripcion2,
                  descripcion3,
                  descripcion4,
                  descripcion5,
                  precioBruto,
                  iva,
                  iibb,
                  precioNeto,
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
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {formateoFechaCorto(fecha)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="font-bold">
                        {descripcion0}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        -{descripcion1} <br />
                        {descripcion2 && descripcion2 !== ""
                          ? "-" + descripcion2
                          : ""}{" "}
                        <br />
                        {descripcion3 && descripcion3 !== ""
                          ? "-" + descripcion3
                          : ""}
                        {descripcion4 && descripcion4 !== ""
                          ? "-" + descripcion4
                          : ""}
                        <br />
                        {descripcion5 && descripcion5 !== ""
                          ? "-" + descripcion5
                          : ""}
                        <br />
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-center text-xs font-medium text-blue-gray-600"
                      >
                        {precioBruto ? "$" + formatearPrecio(precioBruto) : "-"}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default ContableFicha;

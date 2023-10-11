import { CardBody, Typography, Button } from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import useMinutas from "@/hooks/useMinutas";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import useProveedores from "@/hooks/useProveedores";

const ListadoViajesProveedores = () => {
  const {
    cuitEditar,
    formaDePago,

    obtenerCliente,
  } = useClientes();

  const {
    handleModalAsignarProveedor,

    viajesServicio,

    setIdViajeAsignarProveedor,
    idObtenerServicio,
    obtenerViajesServicio,
    idAsignarProveedor,

    handleModalEditarViaje,

    setNumeroContenedorEditar,

    setFechaCargaEditar,

    setHoraCargaEditar,

    setEstadoEditar,

    setOrigenEditar,
    setDestinoEDitar,
    setProveedorEditar,

    setChoferEditar,

    setTipoServicioViajeEditar,
    setCamionEditar,
    nombreProveedorEditar,
    setNombreProveedorEditar,
    setSemiEditar,

    setClienteEditarViaje,

    setIdEditarViaje,
    direccionRetornoEditarViaje,
    setDireccionRetornoEditarViaje,
    buscoEnEditarViaje,
    setBuscoEnEDitarViaje,
    seAsignoProveedor,
    setSeAsignoProveedor,
    handleCargando,
    editeViaje,
    setEditeViaje,
    observacionesViaje,
    setObservacionesViaje,
    adicionales,
    setAdicionales,
    fechaTerminacion,
    setFechaTerminacion,
    horaTerminacion,
    setHoraTerminacion,
    diasDemora,
    setDiasDemora,
    handleTerminarViaje,
    notificarAlChofer,
    cantidadEditar,
    setCantidadEditar,
    pesoEditar,
    setPesoEditar,
    volumenEditar,
    setVolumenEditar,
    tipoCargaEditar,
    setTipoCargaEditar,
    setFechaDevolucionContenedor,
    setHoraDevolucionContenedor,
    setFechaVencimientoDevolucionContenedor,
    setLugarDevolucionContenedorVacio,
  } = useServicios();

  const { equiposData, choferesProveedor, camionesProveedor } =
    useProveedores();

  const [viajeOChoferes, setViajeOChoferes] = useState(1);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (idObtenerServicio) {
        handleCargando();
        await obtenerViajesServicio(idObtenerServicio);
        handleCargando();
      }
      obtenerViajes();
    };
  }, []);

  useEffect(() => {
    const actualizarData = async () => {
      if (seAsignoProveedor) {
        handleCargando();
        console.log("Se actualiza listado");

        await obtenerViajesServicio(idObtenerServicio);
        handleCargando();

        setSeAsignoProveedor(false);
      }
    };
    actualizarData();
  }, [seAsignoProveedor]);

  const handleAsignarProveedor = (_id) => {
    setIdViajeAsignarProveedor(_id);
    handleModalAsignarProveedor();
  };

  useEffect(() => {
    const traerData = async () => {
      if (cuitEditar) {
        handleCargando();
        await obtenerCliente(cuitEditar);
        handleCargando();
      }
    };
    traerData();
  }, [cuitEditar]);

  useEffect(() => {
    formaDePago;
  }, [formaDePago]);

  const handleEditarViaje = (
    _id,
    numeroContenedor,
    nombreDomicilioOrigenTerminal,
    nombreDomicilioOrigenCliente,
    nombreDomicilioDestinoCliente,
    nombreDomicilioDestinoTerminal,
    fechaOrigen,
    estado,
    proveedor,
    horaOrigen,
    nombreProveedor,
    nombreChofer,
    patenteCamion,
    patenteSemi,
    cliente,
    tipoServicio,
    direccionRetorno,
    domicilioOrigenTerminal,
    domicilioOrigenCliente,
    domicilioDestinoTerminal,
    domicilioDestinoCliente,
    observacionesViaje,
    peso,
    volumen,
    cantidad,
    tipoCarga,
    fechaDevolucion,
    horaDevolucion,
    fechaVencimientoDevolucion,
    lugarDevolucion
  ) => {
    if (
      tipoServicio === "importacion" ||
      tipoServicio === "transito-aduanero"
    ) {
      setOrigenEditar(domicilioOrigenTerminal);
    } else {
      setOrigenEditar(domicilioOrigenCliente);
    }

    if (tipoServicio === "importacion" || tipoServicio === "nacional") {
      setDestinoEDitar(domicilioDestinoCliente);
    } else {
      setDestinoEDitar(domicilioDestinoTerminal);
    }
    setNumeroContenedorEditar(numeroContenedor),
      setFechaCargaEditar(fechaOrigen);
    setProveedorEditar(proveedor);
    setEstadoEditar(estado);
    setHoraCargaEditar(horaOrigen);
    setNombreProveedorEditar(nombreProveedor);
    setChoferEditar(nombreChofer), setCamionEditar(patenteCamion);
    setSemiEditar(patenteSemi);
    setClienteEditarViaje(cliente);
    setTipoServicioViajeEditar(tipoServicio);
    setIdEditarViaje(_id);
    setDireccionRetornoEditarViaje(direccionRetorno);
    setObservacionesViaje(observacionesViaje);
    setTipoCargaEditar(tipoCarga);
    if (
      tipoCarga === "cajas" ||
      tipoCarga === "bultos" ||
      tipoCarga === "pallets"
    ) {
      setVolumenEditar(volumen);
      setCantidadEditar(cantidad);
    }
    setPesoEditar(peso);
    setFechaDevolucionContenedor(fechaDevolucion),
      setHoraDevolucionContenedor(horaDevolucion),
      setFechaVencimientoDevolucionContenedor(fechaVencimientoDevolucion),
      setLugarDevolucionContenedorVacio(lugarDevolucion),
      setBuscoEnEDitarViaje(true);
    handleModalEditarViaje();
  };

  const handleEditarTerminado = async (
    _id,
    adicionales,
    fechaTerminacion,
    horaTerminacion,
    diasDemora,
    observacionesViaje
  ) => {
    setIdEditarViaje(_id);
    setAdicionales(adicionales);
    setFechaTerminacion(fechaTerminacion);
    setHoraTerminacion(horaTerminacion);
    setDiasDemora(diasDemora);
    setObservacionesViaje(observacionesViaje);
    handleTerminarViaje();
  };

  const handleNotificarChofer = async (id) => {
    await notificarAlChofer(id);
  };

  return (
    <>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        Datos de los viajes
      </Typography>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Nro Viaje",
                "Nro Contenedor",
                "FechaCarga",
                "Origen",
                "Destino",
                "Proveedor",
                "Nombre Chofer",
                "Estado",
                "Accion",
              ].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-center"
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
            {viajesServicio.map(
              (
                {
                  _id,
                  numeroDeViaje,
                  numeroContenedor,
                  nombreDomicilioOrigenTerminal,
                  nombreDomicilioOrigenCliente,
                  nombreDomicilioDestinoCliente,
                  nombreDomicilioDestinoTerminal,
                  domicilioOrigenTerminal,
                  domicilioOrigenCliente,
                  domicilioDestinoTerminal,
                  domicilioDestinoCliente,
                  fechaOrigen,
                  nombreProveedor,
                  estado,
                  chofer,
                  camion,
                  semi,
                  proveedor,
                  horaOrigen,
                  nombreChofer,
                  patenteCamion,
                  patenteSemi,
                  cliente,
                  tipoServicio,
                  direccionRetorno,

                  adicionales,
                  fechaTerminacion,
                  horaTerminacion,
                  diasDemora,
                  pesoCarga,
                  volumenCarga,
                  cantidadCarga,
                  tipoCarga,
                  fechaDevolucion,
                  horaDevolucion,
                  fechaVencimientoDevolucion,
                  lugarDevolucion,
                  observacionesViaje,
                  fantasiaDestino,
                  fantasiaOrigen,
                },
                key
              ) => {
                const className = `py-3 px-5 text-center ${
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
                          {numeroDeViaje}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {numeroContenedor}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {formatearFecha(fechaOrigen)}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        className="w-36 text-xs font-medium text-blue-gray-600"
                      >
                        {tipoServicio === "importacion"
                          ? fantasiaOrigen ?? nombreDomicilioOrigenTerminal
                          : tipoServicio === "nacional"
                          ? fantasiaOrigen ?? nombreDomicilioOrigenTerminal
                          : tipoServicio === "one-way"
                          ? fantasiaOrigen ?? nombreDomicilioOrigenCliente
                          : tipoServicio === "transito-aduanero"
                          ? fantasiaOrigen ?? nombreDomicilioOrigenCliente
                          : tipoServicio === "round-trip"
                          ? fantasiaOrigen ?? nombreDomicilioOrigenCliente
                          : ""}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="w-40 text-xs font-medium text-blue-gray-600"
                      >
                        {tipoServicio === "importacion"
                          ? fantasiaDestino ?? nombreDomicilioDestinoCliente
                          : tipoServicio === "nacional"
                          ? fantasiaDestino ?? nombreDomicilioDestinoCliente
                          : tipoServicio === "one-way"
                          ? fantasiaDestino ?? nombreDomicilioDestinoTerminal
                          : tipoServicio === "transito-aduanero"
                          ? fantasiaDestino ?? nombreDomicilioDestinoTerminal
                          : tipoServicio === "round-trip"
                          ? fantasiaDestino ?? nombreDomicilioDestinoTerminal
                          : ""}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {nombreProveedor}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {nombreChofer}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div
                        className={`rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center  ${
                          estado === "Terminado"
                            ? "bg-green-400 font-bold shadow-xl"
                            : ""
                        }`}
                      >
                        <Typography
                          variant="small"
                          className={`text-xs font-medium  ${
                            estado === "Terminado" ? "text-white" : "text-black"
                          }`}
                        >
                          {estado}
                        </Typography>
                      </div>
                    </td>
                    {nombreProveedor === "" || nombreProveedor ? (
                      <td className={className}>
                        {/* {nombreChofer != "" ? (
                          <Button
                            color="blue"
                            className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                            fullWidth
                            onClick={(e) => handleNotificarChofer(_id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              Notificar Chofer
                            </Typography>
                          </Button>
                        ) : (
                          ""
                        )} */}
                        {estado === "Terminado" && fechaTerminacion ? (
                          <Button
                            color="blue"
                            className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 text-center capitalize"
                            fullWidth
                            onClick={(e) =>
                              handleEditarTerminado(
                                _id,
                                adicionales,
                                fechaTerminacion,
                                horaTerminacion,
                                diasDemora,
                                observacionesViaje
                              )
                            }
                          >
                            <Typography
                              color="inherit"
                              className="w-40 text-center font-medium capitalize"
                            >
                              Ver Terminado
                            </Typography>
                          </Button>
                        ) : (
                          ""
                        )}

                        <Button
                          color="blue"
                          className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                          fullWidth
                          onClick={(e) =>
                            handleEditarViaje(
                              _id,
                              numeroContenedor,
                              nombreDomicilioOrigenTerminal,
                              nombreDomicilioOrigenCliente,
                              nombreDomicilioDestinoCliente,
                              nombreDomicilioDestinoTerminal,
                              fechaOrigen,
                              estado,
                              proveedor,
                              horaOrigen,
                              nombreProveedor,
                              nombreChofer,
                              patenteCamion,
                              patenteSemi,
                              cliente,
                              tipoServicio,
                              direccionRetorno,
                              domicilioOrigenTerminal,
                              domicilioOrigenCliente,
                              domicilioDestinoTerminal,
                              domicilioDestinoCliente,
                              observacionesViaje,
                              pesoCarga,
                              volumenCarga,
                              cantidadCarga,
                              tipoCarga,
                              fechaDevolucion,
                              horaDevolucion,
                              fechaVencimientoDevolucion,
                              lugarDevolucion
                            )
                          }
                        >
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            Editar
                          </Typography>
                        </Button>
                      </td>
                    ) : (
                      <>
                        <td className={className}>
                          <Button
                            color="blue"
                            className="-mt-1 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                            fullWidth
                            onClick={(e) => handleAsignarProveedor(_id)}
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              Asignar
                            </Typography>
                          </Button>

                          <Button
                            color="blue"
                            className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                            fullWidth
                            onClick={(e) =>
                              handleEditarViaje(
                                _id,
                                numeroContenedor,
                                nombreDomicilioOrigenTerminal,
                                nombreDomicilioOrigenCliente,
                                nombreDomicilioDestinoCliente,
                                nombreDomicilioDestinoTerminal,
                                fechaOrigen,
                                estado,
                                proveedor,
                                horaOrigen,
                                nombreProveedor,
                                nombreChofer,
                                patenteCamion,
                                patenteSemi,
                                cliente,
                                tipoServicio,
                                direccionRetorno,
                                domicilioOrigenTerminal,
                                domicilioOrigenCliente,
                                domicilioDestinoTerminal,
                                domicilioDestinoCliente,
                                observacionesViaje,
                                pesoCarga,
                                volumenCarga,
                                cantidadCarga,
                                tipoCarga,
                                fechaDevolucion,
                                horaDevolucion,
                                fechaVencimientoDevolucion,
                                lugarDevolucion
                              )
                            }
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              editar
                            </Typography>
                          </Button>
                        </td>
                      </>
                    )}
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

export default ListadoViajesProveedores;

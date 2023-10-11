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
  CurrencyDollarIcon,
  DocumentPlusIcon,
  PaperClipIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";
import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";

const ContableFicha = () => {
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
    obtenerDocumentacion,
    documentacionViaje,
    handleModalEditarDocumento,
    estadoDocu,
    setEstadoDocu,
    numeroContenedorDocu,
    setNumeroContenedorDocu,
    numeroDocumento,
    setNumeroDocumento,
    linkDocumento,
    setLinkDocumento,
    idDocumento,
    setIdDocumento,
    actualizoListadoDocu,
    setActualizoListadoDocu,
    conceptosAFacturar,
    obtenerConceptos,
    actualizoConceptos,
    setActualizoConceptos,
    handleModalValorizar,
    fechaFactura,
    setFechaFactura,
    conceptoFactura,
    setConceptoFactura,
    descripcionFactura,
    setDescripcionFactura,
    referenciaClienteFactura,
    setReferenciaClienteFactura,
    despachoFactura,
    setDespachoFactura,
    remitoFactura,
    setRemitoFactura,
    contenedorFactura,
    setContenedorFactura,
    logicsarFactura,
    setLogicsarFactura,
    precioFactura,
    setPrecioFactura,
    idConceptoFactura,
    setIdConceptoFactura,
    seActualizaConceptos,
    setSeActualizaConceptos,
    modalAgragarCampo,
    handleModalAgregarCampo,
    handleModalFactura,
  } = useServicios();

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

  const handleValor = (
    e,
    fecha,
    descripcion0,
    descripcion1,
    descripcion2,
    descripcion3,
    descripcion4,
    descripcion5,
    precioBruto,
    _id
  ) => {
    console.log(fecha);
    e.preventDefault();
    setFechaFactura(fecha);
    setConceptoFactura(descripcion0);
    setDescripcionFactura(descripcion1);
    setReferenciaClienteFactura(descripcion2);
    setDespachoFactura(descripcion3);
    // setRemitoFactura(descripcion4);
    setContenedorFactura(descripcion4);
    setLogicsarFactura(descripcion5);
    setPrecioFactura(precioBruto);
    setIdConceptoFactura(_id);
    handleModalValorizar();
  };

  const handleVerDocumento = (linkDocumento) => {
    window.open(linkDocumento, "_blank");
  };

  const handleAgregarCampoFactura = (e) => {
    e.preventDefault();
    handleModalAgregarCampo();
  };

  const handleModalCompletarFactura = (e) => {
    e.preventDefault();
    handleModalFactura();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-3 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
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
      </div>
      <Card className="mb-5 p-4">
        <Typography variant="small" className="mb-2 text-2xl font-bold">
          Información
        </Typography>
        <Typography variant="small">
          <span className="text-l font-bold">Nombre Cliente: </span>
          <spane
            onClick={(e) => handleReturnProfile(e)}
            className="cursor-pointer text-blue-500"
          >
            {/* {nombreClienteObtenerServicio} */}
          </spane>
        </Typography>
        <Typography variant="small">
          <span className="font-bold">Importe Bruto:</span>{" "}
          {/* {origenCargaObtenerServicio} */}
        </Typography>
        <Typography variant="small">
          <span className="font-bold">IVA:</span>{" "}
          {/* {destinoCargaObtenerServicio} */}
        </Typography>
        <Typography variant="small">
          <span className="font-bold">Neto a Pagar:</span>{" "}
          {/* {camionesObtenerServicio} */}
        </Typography>
      </Card>

      <Typography variant="h6" color="blue-gray" className="mb-1">
        Conceptos a Facturar
      </Typography>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Servicio", "Importe", "Valorizar"].map((el) => (
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
                        {descripcion2 !== "" ? "-" + descripcion2 : ""} <br />
                        {descripcion3 === "" || descripcion3 == undefined
                          ? ""
                          : "-" + descripcion3}
                        {descripcion3 === "" ? "" : <br />}
                        {descripcion4 !== "" ? "-" + descripcion4 : ""}
                        <br />
                        {descripcion5 !== "" ? "-" + descripcion5 : ""}
                        <br />
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-center text-xs font-medium text-blue-gray-600"
                      >
                        {precioBruto ? "$" + precioBruto : "-"}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Button
                        color="blue"
                        className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                        fullWidth
                        onClick={(e) =>
                          handleValor(
                            e,
                            fecha,
                            descripcion0,
                            descripcion1,
                            descripcion2,
                            descripcion3,
                            descripcion4,
                            descripcion5,
                            precioBruto,
                            _id
                          )
                        }
                      >
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Valorizar
                        </Typography>
                      </Button>
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

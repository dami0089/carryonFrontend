import {
  CardBody,
  Typography,
  Button,
  Card,
  Menu,
} from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import useMinutas from "@/hooks/useMinutas";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import useProveedores from "@/hooks/useProveedores";
import { StatisticsCard } from "@/widgets/cards";
import {
  ArrowLeftCircleIcon,
  ChevronDoubleDownIcon,
  FunnelIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import ModalEditarDocumento from "../clientes/servicios/ModalEditarDocumento";
import Cargando from "../deTodos/Cargando";

const ListadoDocumentacionPendiente = () => {
  const {
    cuitEditar,
    formaDePago,

    obtenerCliente,
  } = useClientes();

  const {
    handleCargando,

    handleModalEditarDocumento,

    setEstadoDocu,
    setNumeroContenedorDocu,

    setNumeroDocumento,

    setLinkDocumento,

    setIdDocumento,
    actualizoListadoDocu,
    setActualizoListadoDocu,
    handleModalEditarDevolucion,
    documentacionPendiente,
    obtenerDocumentacionPendiente,

    setLinkVacio,
    modalEditarDocumento,
    cargando,
    setPaginaLogisticaSelector,
  } = useServicios();

  const { equiposData, choferesProveedor, camionesProveedor } =
    useProveedores();

  const [viajeOChoferes, setViajeOChoferes] = useState(1);

  useEffect(() => {
    const obtenerViajes = async () => {
      handleCargando();
      await obtenerDocumentacionPendiente();
      handleCargando();
    };
    obtenerViajes();
  }, []);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (actualizoListadoDocu) {
        handleCargando();
        await obtenerDocumentacionPendiente();
        setActualizoListadoDocu(false);
        handleCargando();
      }
    };
    obtenerViajes();
  }, [actualizoListadoDocu]);

  const handleEditarDocumentacion = (
    e,
    _id,
    numeroContenedor,
    numeroDocumentacion,
    estado,
    linkRemito,
    linkVacio
  ) => {
    e.preventDefault();
    setIdDocumento(_id);
    setNumeroContenedorDocu(numeroContenedor);
    setNumeroDocumento(numeroDocumentacion);
    if (estado === "Esperando Numero") {
      setEstadoDocu("No entregado");
    } else {
      setEstadoDocu(estado);
    }
    setLinkVacio(linkVacio);
    setLinkDocumento(linkRemito);
    handleModalEditarDocumento();
  };

  const handleClick = async (e, linkDocumento) => {
    e.preventDefault();
    if (linkDocumento) {
      window.open(linkDocumento, "_blank");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setPaginaLogisticaSelector(100);
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <div className="mb-5 mt-6 ml-3 mr-3 flex justify-between">
        <Typography className="font-bold uppercase">
          Documentacion Pendiente
        </Typography>
        <Button
          className="w-30 mx-2 bg-green-300 text-center"
          fullWidth
          onClick={(e) => handleBack(e)}
        >
          Volver
        </Button>
      </div>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Nro Viaje",
                "Nombre Chofer",
                "Nro Contenedor",
                "Remito",
                "Vacio",
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
            {documentacionPendiente.map(
              (
                {
                  _id,
                  numeroViaje,
                  nombreChofer,
                  numeroContenedor,
                  tipoDocumentacion,
                  numeroDocumentacion,
                  estado,
                  linkRemito,
                  linkVacio,
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
                          {numeroViaje}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {nombreChofer}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {numeroContenedor === "0" ? "-" : numeroContenedor}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Button
                        color="blue"
                        className="min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1 text-center text-black"
                        fullWidth
                        onClick={(e) => handleClick(e, linkRemito)}
                      >
                        <Typography
                          variant="small"
                          className="flex items-center justify-between text-center text-sm font-medium capitalize"
                        >
                          <span className="mr-1">
                            {numeroDocumentacion ? numeroDocumentacion : "-"}
                          </span>
                          <div className="h-4 w-4">
                            {linkRemito ? <ChevronDoubleDownIcon /> : ""}
                          </div>
                        </Typography>
                      </Button>
                    </td>

                    <td className={className}>
                      <Button
                        color="blue"
                        className="min-w-100 -mt-1 h-8 items-center gap-2 whitespace-nowrap bg-transparent px-4 py-1 text-center text-black"
                        fullWidth
                        onClick={(e) => handleClick(e, linkVacio)}
                      >
                        <Typography
                          variant="small"
                          className="flex items-center justify-between text-center text-sm font-medium capitalize"
                        >
                          <span className="mr-1">
                            {linkVacio ? "Ver Documento" : "-"}
                          </span>
                          <div className="h-4 w-4">
                            {linkVacio ? <ChevronDoubleDownIcon /> : ""}
                          </div>
                        </Typography>
                      </Button>
                    </td>

                    <td className={className}>
                      <div
                        className={`rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center  `}
                      >
                        <Typography
                          variant="small"
                          className={`text-xs font-medium text-black `}
                        >
                          {estado}
                        </Typography>
                      </div>
                    </td>

                    <td className={className}>
                      <Button
                        color="blue"
                        className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                        fullWidth
                        onClick={(e) =>
                          handleEditarDocumentacion(
                            e,
                            _id,
                            numeroContenedor,
                            numeroDocumentacion,
                            estado,
                            linkRemito,
                            linkVacio
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
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      {modalEditarDocumento ? <ModalEditarDocumento /> : ""}
      {cargando ? <Cargando /> : ""}
    </>
  );
};

export default ListadoDocumentacionPendiente;

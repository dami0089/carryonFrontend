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
  CheckIcon,
  ChevronDoubleDownIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";

const ListadoDocumentacion = () => {
  const {
    cuitEditar,
    formaDePago,

    obtenerCliente,
  } = useClientes();

  const {
    idObtenerServicio,

    handleCargando,
    editeViaje,
    setEditeViaje,

    obtenerDocumentacion,
    documentacionViaje,
    handleModalEditarDocumento,

    setEstadoDocu,
    setNumeroContenedorDocu,

    setNumeroDocumento,
    linkDocumento,
    setLinkDocumento,

    setIdDocumento,
    actualizoListadoDocu,
    setActualizoListadoDocu,
    handleModalEditarDevolucion,
  } = useServicios();

  const { equiposData, choferesProveedor, camionesProveedor } =
    useProveedores();

  const [viajeOChoferes, setViajeOChoferes] = useState(1);

  useEffect(() => {
    const obtenerViajes = async () => {
      handleCargando();
      await obtenerDocumentacion(idObtenerServicio);
      handleCargando();
    };
    obtenerViajes();
  }, []);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (editeViaje) {
        handleCargando();
        await obtenerDocumentacion(idObtenerServicio);
        handleCargando();
        setEditeViaje(false);
      }
    };
    obtenerViajes();
  }, [editeViaje]);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (actualizoListadoDocu) {
        handleCargando();
        await obtenerDocumentacion(idObtenerServicio);
        handleCargando();
        setActualizoListadoDocu(false);
      }
    };
    obtenerViajes();
  }, [actualizoListadoDocu]);

  const handleAgregarDocumentacion = (e) => {
    e.preventDefault();
  };

  const handleEditarDocumentacion = (
    e,
    _id,
    numeroContenedor,
    numeroDocumentacion,
    estado,
    linkDocumento
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
    setLinkDocumento(linkDocumento);
    handleModalEditarDocumento();
  };

  const handleEditarDevolucion = (
    e,
    _id,

    linkDocumento
  ) => {
    e.preventDefault();
    setIdDocumento(_id);

    setLinkDocumento(linkDocumento);
    handleModalEditarDevolucion();
  };

  const handleVerDocumento = (linkDocumento) => {
    window.open(linkDocumento, "_blank");
  };

  const handleClick = async (e, linkDocumento) => {
    e.preventDefault();
    if (linkDocumento) {
      window.open(linkDocumento, "_blank");
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <Typography variant="h6" color="blue-gray" className="mb-1">
        Datos de los viajes
      </Typography>

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
            {documentacionViaje.map(
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
                            {numeroDocumentacion ? (
                              numeroDocumentacion
                            ) : linkRemito ? (
                              "-"
                            ) : (
                              <XMarkIcon className="h-4 w-4 font-bold text-red-400" />
                            )}
                          </span>
                          <div className="h-4 w-4">
                            {linkRemito ? (
                              <CheckIcon className="font-bold text-green-500" />
                            ) : (
                              ""
                            )}
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
                            {linkVacio ? "Ver Documento" : ""}
                          </span>
                          <div className="h-4 w-4">
                            {linkVacio ? (
                              <CheckIcon className="font-bold text-green-500" />
                            ) : (
                              <XMarkIcon className="h-4 w-4 font-bold text-red-400" />
                            )}
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
                      {tipoDocumentacion === "Devolucion Vacio" ? (
                        <Button
                          color="blue"
                          className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                          fullWidth
                          onClick={(e) =>
                            handleEditarDevolucion(
                              e,
                              _id,

                              linkDocumento
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
                      ) : (
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
                              linkDocumento
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
                      )}
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

export default ListadoDocumentacion;

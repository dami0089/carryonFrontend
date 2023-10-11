import { CardBody, Typography, Button } from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useEffect, useState } from "react";
import useMinutas from "@/hooks/useMinutas";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import Swal from "sweetalert2";

const ListadoViajesProveedoresChoferes = () => {
  const {
    viajesServicio,

    idObtenerServicio,
    obtenerViajesServicio,
    idAsignarProveedor,
    aprobarViaje,
    handleCargando,
    seAsignoProveedor,
  } = useServicios();

  const [viajeOChoferes, setViajeOChoferes] = useState(1);

  // useEffect(() => {
  //   if (!idAsignarProveedor) {
  //     const obtenerViajes = async () => {
  //       if (idObtenerServicio) {
  //         await obtenerViajesServicio(idObtenerServicio);
  //       }
  //     };
  //     obtenerViajes();
  //   }
  // }, [viajesServicio, idObtenerServicio, idAsignarProveedor]);

  useEffect(() => {
    if (!idAsignarProveedor) {
      const obtenerViajes = async () => {
        if (idObtenerServicio) {
          handleCargando();
          await obtenerViajesServicio(idObtenerServicio);
          handleCargando();
        }
      };
      obtenerViajes();
    }
  }, []);

  useEffect(() => {
    const obtenerViajes = async () => {
      if (seAsignoProveedor) {
        await obtenerViajesServicio(idObtenerServicio);
      }
    };
    obtenerViajes();
  }, [seAsignoProveedor]);

  const handleAprobar = (id) => {
    Swal.fire({
      title: "Seguro queres aprobar el equipo?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await aprobarViaje(id);
      }
    });
  };

  return (
    <>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        Choferes Asignados
      </Typography>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Chofer",
                "Camion",
                "Semi",
                "Nro Contenedor",

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
          {viajesServicio == "" ? (
            ""
          ) : (
            <>
              <tbody>
                {viajesServicio.map(
                  (
                    {
                      _id,
                      nombreChofer,
                      patenteCamion,
                      patenteSemi,
                      numeroContenedor,
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
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {nombreChofer ? nombreChofer : "-"}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {patenteCamion ? patenteCamion : "-"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {patenteSemi ? patenteSemi : "-"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {numeroContenedor ? numeroContenedor : "-"}
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
                        {estado === "Aceptar Equipos" ? (
                          <td className={className}>
                            <Button
                              color="blue"
                              className="-mt-1 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                              fullWidth
                              onClick={(e) => handleAprobar(_id)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                Aprobar
                              </Typography>
                            </Button>

                            <Button
                              color="blue"
                              className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                              fullWidth
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                editar
                              </Typography>
                            </Button>
                          </td>
                        ) : (
                          <Button
                            color="blue"
                            className="mt-2 h-8 items-center gap-4 px-6 pt-1 pb-1 capitalize"
                            fullWidth
                          >
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              editar
                            </Typography>
                          </Button>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </>
          )}
        </table>
      </CardBody>
    </>
  );
};

export default ListadoViajesProveedoresChoferes;

import { projectsTableData } from "@/data";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import useMinutas from "@/hooks/useMinutas";
import useServicios from "@/hooks/useServicios";
import { formatearFecha } from "@/data/helpers/formatearFecha";

const ListadoMinutasServicio = () => {
  const { obtenerMinutasServicio, minutasServicio } = useMinutas();
  const { setIdServicio, numeroPedidoObtenerServicio, idObtenerServicio } =
    useServicios;

  //   useEffect(() => {
  //     obtenerMinutasServicio(setIdServicio);
  //   }, [setIdServicio]);

  return (
    <>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        Minutas con el cliente
      </Typography>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Titulo", "Contacto", "Accion"].map((el) => (
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
          {minutasServicio == "" ? (
            ""
          ) : (
            <>
              <tbody>
                {minutasServicio.map(
                  (
                    {
                      _id,
                      titulo,
                      fecha,

                      contacto,
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
                              {formatearFecha(fecha)}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {titulo}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {contacto}
                          </Typography>
                        </td>

                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mx-2 flex text-xs font-medium text-blue-gray-600"
                            >
                              <Button
                                color="blue"
                                className="items-center gap-4 px-6 capitalize"
                                fullWidth
                                // onClick={(e) => handleEdit()}
                              >
                                <Typography
                                  color="inherit"
                                  className="font-medium capitalize"
                                >
                                  editar
                                </Typography>
                              </Button>
                            </Typography>
                          </div>
                        </td>
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

export default ListadoMinutasServicio;

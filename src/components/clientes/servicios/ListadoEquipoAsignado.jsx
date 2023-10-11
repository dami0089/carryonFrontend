import { projectsTableData } from "@/data";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";

import useServicios from "@/hooks/useServicios";

const ListadoEquipoAsignado = () => {
  const { viajeObtenido, obtenerViaje } = useServicios();

  useEffect(() => {
    if (viajeObtenido._id) {
      const obtenerData = async () => {
        handleCargando();

        await obtenerViaje(viajeObtenido._id);
        handleCargando();
      };
      obtenerData();
    }
  }, [viajeObtenido]);

  return (
    <>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        Equipo Asignado
      </Typography>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Nombre Chofer",
                "Patente Camion",
                "Patente Semi",
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
          {viajeObtenido == "" ? (
            ""
          ) : (
            <>
              <tbody>
                <tr key={viajeObtenido._id}>
                  <td
                    className={`"border-b border-blue-gray-50" 
                      py-3 px-5
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {viajeObtenido.nombreChofer
                          ? viajeObtenido.nombreChofer
                          : "-"}
                      </Typography>
                    </div>
                  </td>
                  <td
                    className={`"border-b border-blue-gray-50" 
                      py-3 px-5`}
                  >
                    <Typography
                      variant="small"
                      className="text-xs font-medium text-blue-gray-600"
                    >
                      {viajeObtenido.patenteCamion
                        ? viajeObtenido.patenteCamion
                        : "-"}
                    </Typography>
                  </td>
                  <td
                    className={`"border-b border-blue-gray-50" 
                      py-3 px-5`}
                  >
                    <Typography
                      variant="small"
                      className="text-xs font-medium text-blue-gray-600"
                    >
                      {viajeObtenido.patenteSemi
                        ? viajeObtenido.patenteSemi
                        : ""}
                    </Typography>
                  </td>
                  <td
                    className={`"border-b border-blue-gray-50" 
                      py-3 px-5`}
                  >
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
              </tbody>
            </>
          )}
        </table>
      </CardBody>
    </>
  );
};

export default ListadoEquipoAsignado;

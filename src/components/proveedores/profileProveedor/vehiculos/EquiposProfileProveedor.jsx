import React from "react";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import { projectsTableData } from "@/data";
import useServicios from "@/hooks/useServicios";
import useProveedores from "@/hooks/useProveedores";

const EquiposProfileProveedor = () => {
  const { equiposData } = useProveedores();

  return (
    <>
      <CardBody className="mt-10 overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Chofer", "Patente Camion", "Patente Semi", "Accion"].map(
                (el) => (
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
                )
              )}
            </tr>
          </thead>
          <>
            <tbody>
              {equiposData.map(
                ({ _id, nombreChofer, patenteCamion, patenteSemi }, key) => {
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
                            {nombreChofer}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {patenteCamion}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {patenteSemi}
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
                              onClick={(e) => handleEdit(_id)}
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
        </table>
      </CardBody>
    </>
  );
};

export default EquiposProfileProveedor;

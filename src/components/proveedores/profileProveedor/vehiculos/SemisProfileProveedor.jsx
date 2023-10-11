import React from "react";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import { projectsTableData } from "@/data";
import useServicios from "@/hooks/useServicios";
import useProveedores from "@/hooks/useProveedores";

const SemisProfileProveedor = () => {
  const {
    semisProveedor,
    handleModalEditarSemi,
    setModeloSemi,
    setPatenteSemi,
    setYearSemi,
    setIdEditarSemi,
  } = useProveedores();

  const handleEdit = (e, _id, modelo, patente, year) => {
    e.preventDefault();
    setIdEditarSemi(_id);
    setModeloSemi(modelo);
    setYearSemi(year);
    setPatenteSemi(patente);
    handleModalEditarSemi();
  };

  return (
    <>
      <CardBody className="mt-10 overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Modelo", "Patente", "Año", "Accion"].map((el) => (
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
          <>
            <tbody>
              {semisProveedor.map(({ _id, modelo, year, patente }, key) => {
                const className = `py-3 px-5 ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50 text-center"
                }`;

                return (
                  <tr key={_id}>
                    <td className={className}>
                      <div className="flex gap-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-bold"
                        >
                          {modelo === "" ? "-" : modelo}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {patente}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {year === "" ? "-" : year}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mx-2 flex text-xs font-medium text-blue-gray-600"
                      >
                        <Button
                          color="blue"
                          className="items-center gap-4 px-6 capitalize"
                          fullWidth
                          onClick={(e) =>
                            handleEdit(e, _id, modelo, patente, year)
                          }
                        >
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            editar
                          </Typography>
                        </Button>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        </table>
      </CardBody>
    </>
  );
};

export default SemisProfileProveedor;

import React, { useEffect, useState } from "react";

import useProveedores from "@/hooks/useProveedores";
import { ProfileInfoCard } from "@/widgets/cards";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import { projectsTableData } from "@/data";

const CamionesProfileProveedor = () => {
  const {
    camionesProveedor,
    handleModalEditarCamion,
    setModelo,
    setPatente,
    setYear,

    setIdCamionEditar,
  } = useProveedores();

  const handleEdit = (e, _id, modelo, patente, year) => {
    e.preventDefault();
    setIdCamionEditar(_id);
    setModelo(modelo);
    setPatente(patente);
    setYear(year);
    handleModalEditarCamion();
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
              {camionesProveedor.map(({ _id, modelo, year, patente }, key) => {
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
                          {modelo ? modelo.toUpperCase() : ""}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {patente ? patente.toUpperCase() : ""}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {year}
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

export default CamionesProfileProveedor;

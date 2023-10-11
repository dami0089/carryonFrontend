import { CardBody, Typography } from "@material-tailwind/react";
import React from "react";

const HistorialProfileProveedor = () => {
  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Concepto", "Importe", "Notas", "Accion"].map((el) => (
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
        </table>
      </CardBody>
    </>
  );
};

export default HistorialProfileProveedor;

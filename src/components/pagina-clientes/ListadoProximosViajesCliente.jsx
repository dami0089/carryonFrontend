import { Button, CardBody, Typography } from "@material-tailwind/react";

import React from "react";
import { projectsTableData } from "@/data";

import useProveedores from "@/hooks/useProveedores";
import { formatearFecha } from "@/data/helpers/formatearFecha";

import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";

const ListadoProximosViajesCliente = () => {
  const { setSeleccion } = useClientes();

  const { serviciosCliente, obtenerServicio } = useServicios();

  const handleClick = async (e, _id) => {
    e.preventDefault();

    await obtenerServicio(_id);
    setSeleccion(2);
  };

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Referencia",
                "Fecha",
                "Hora",
                "Origen",
                "Destino",
                "Estado",
                "Orden Nro",
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
          <tbody>
            {serviciosCliente
              .sort((a, b) => new Date(a.fechaCarga) - new Date(b.fechaCarga))
              .map(
                (
                  {
                    _id,
                    numeroPedido,
                    numeroCliente,
                    fechaCarga,
                    horaCarga,
                    origenCarga,
                    destinoCarga,
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
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {numeroCliente}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {formatearFecha(fechaCarga)}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {horaCarga}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {origenCarga}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {destinoCarga}
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
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {numeroPedido}
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
                              className="mx-1 items-center gap-4 px-6 capitalize"
                              fullWidth
                              onClick={(e) => handleClick(e, _id)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                ver
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
        </table>
      </CardBody>
    </>
  );
};

export default ListadoProximosViajesCliente;

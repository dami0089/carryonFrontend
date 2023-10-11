import { Button, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";

import useProveedores from "@/hooks/useProveedores";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/configs/context";
import useServicios from "@/hooks/useServicios";
import useAuth from "@/hooks/useAuth";

const ListadoProximosViajesVistaProveedor = () => {
  const {
    serviciosProveedor,
    setSeleccionVistaProveedor,
    obtenerServiciosProveedor,
  } = useProveedores();

  const {
    obtenerServicio,
    setIdProvisorioServicio,
    obtenerViaje,
    handleCargando,
  } = useServicios();

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.proveedor) {
      const traerData = async () => {
        handleCargando();
        await obtenerServiciosProveedor(auth.proveedor);
        handleCargando();
      };
      traerData();
    }
  }, []);

  const handleClick = async (e, _id) => {
    e.preventDefault();
    await obtenerViaje(_id);
    setSeleccionVistaProveedor(6);
  };

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Nro Viaje", "Fecha", "Cliente", "Estado", "Accion"].map(
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
          <tbody>
            {serviciosProveedor.map(
              (
                { _id, numeroDeViaje, fechaOrigen, nombreCliente, estado },
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
                          {numeroDeViaje}
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
                          {formatearFecha(fechaOrigen)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {nombreCliente}
                      </Typography>
                    </td>

                    <td className={className}>
                      <div className="rounded-xl border border-gray-300 bg-deep-orange-100 p-1 text-center">
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-black"
                        >
                          {estado === "Aceptar Equipos"
                            ? "Aguarde Instrucciones"
                            : estado}
                        </Typography>
                      </div>
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

export default ListadoProximosViajesVistaProveedor;

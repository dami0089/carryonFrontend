import { Button, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";

import useProveedores from "@/hooks/useProveedores";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/configs/context";
import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";

const ListadoTodosServiciosActivos = () => {
  const { setSeleccionVistaProveedor } = useProveedores();

  const {
    obtenerServicio,
    idProvisorioServicio,
    setIdProvisorioServicio,
    todosLosServicios,
    obtenerTodosServicios,
    recargoProximosViajes,
    setRecargoProximosViajes,
    setPaginaLogisticaSelector,
    setIdObtenerServicio,
    setVolver,
    obtenerTodosServiciosenCurso,
    todosServiciosActivos,
  } = useServicios();

  const { setSeleccion } = useClientes();

  const navigate = useNavigate();

  const handleClick = async (e, _id) => {
    e.preventDefault();
    setPaginaLogisticaSelector(5);
    setIdObtenerServicio(_id);
    setVolver(9);
  };

  useEffect(() => {
    const obtenerServ = async () => {
      await obtenerTodosServiciosenCurso();
    };
    obtenerServ();
  }, []);

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Nro Servicio",
                "Fecha",
                "Cliente",
                "Origen",
                "Destino",
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
          <tbody>
            {todosServiciosActivos.map(
              (
                {
                  _id,
                  numeroPedido,
                  fechaCarga,
                  nombreCliente,
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
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {numeroPedido}
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
                          {formatearFecha(fechaCarga)}
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

export default ListadoTodosServiciosActivos;

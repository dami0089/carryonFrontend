import {
  Avatar,
  Button,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/configs/context";

const ListadodeClientesInactivos = () => {
  const {
    clientes,
    setObtenerUs,
    setSeleccion,
    handleModalEditarCliente,
    setCuitEditar,
    cuitEditar,
    // obtenerUser,
  } = useClientes();

  const navigate = useNavigate();

  const handleClick = async (e, _id, usuarios) => {
    e.preventDefault();
    await setCuitEditar(_id);
    // obtenerUser([usuarios]);
    setSeleccion(5);
  };

  const handleClickEditar = async (e, _id) => {
    e.preventDefault();
    await setCuitEditar(_id);
    handleModalEditarCliente();
    console.log("editando");
  };

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Cliente", "Vencimiento", "Mail Factura", "Accion"].map(
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
            {clientes
              .filter((cliente) => cliente.isActivo == false) // filtrar solo los clientes con isActivo = true
              .map(
                (
                  { _id, nombre, fechaVencimiento, mailFactura, usuarios },
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
                            {nombre}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {formatearFecha(fechaVencimiento)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {mailFactura}
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
                              onClick={(e) => handleClick(e, _id, usuarios)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                ver
                              </Typography>
                            </Button>
                            <Button
                              color="blue"
                              className="items-center gap-4 px-6 capitalize"
                              fullWidth
                              onClick={(e) => handleClickEditar(e, _id)}
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                editar
                              </Typography>
                            </Button>
                          </Typography>
                          {/* <Progress
                value={fechaVencimiento}
                variant="gradient"
                className="h-1"
              /> */}
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

export default ListadodeClientesInactivos;

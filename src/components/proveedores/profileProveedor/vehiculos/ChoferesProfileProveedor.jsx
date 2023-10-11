import React, { useEffect, useState } from "react";

import useProveedores from "@/hooks/useProveedores";
import { ProfileInfoCard } from "@/widgets/cards";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import { projectsTableData } from "@/data";

const ChoferesProfileProveedor = () => {
  const {
    choferesProveedor,

    setNombreChofer,

    setApellidoChofer,

    setDniChofer,

    setEmailChofer,
    idChoferEditar,
    setIdChoferEditar,
    setTelefonoChofer,
    idCamionChofer,
    setIdCamionChofer,
    nuevoChofer,
    handleModalEditarChofer,
    modalEditarChofer,
    cuitEditarProveedor,
  } = useProveedores();

  const handleEditarChofer = (_id, nombre, apellido, dni, telefono, email) => {
    setIdChoferEditar(_id);
    setNombreChofer(nombre);
    setApellidoChofer(apellido);
    setDniChofer(dni);
    setTelefonoChofer(telefono);
    setEmailChofer(email);
    handleModalEditarChofer();
  };

  return (
    <>
      <CardBody className="mt-10 overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Nombre", "Email", "Telefono", , "Accion"].map((el) => (
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
          <>
            <tbody>
              {choferesProveedor.map(
                ({ _id, nombre, apellido, email, dni, telefono }, key) => {
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
                            {nombre ? nombre.toUpperCase() : ""}{" "}
                            {apellido ? apellido.toUpperCase() : ""}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {telefono}
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
                              handleEditarChofer(
                                _id,
                                nombre,
                                apellido,
                                dni,
                                telefono,
                                email
                              )
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
                }
              )}
            </tbody>
          </>
        </table>
      </CardBody>
    </>
  );
};

export default ChoferesProfileProveedor;

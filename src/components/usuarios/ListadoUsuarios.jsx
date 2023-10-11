import { Button, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";

const ListadoUsuarios = () => {
  const {
    usuarios,

    setNombreUsuario,

    setApellidoUsuario,

    setEmailUsuario,

    setCeluUsuario,
    setDniUsuario,

    handleModalEditarUsuario,

    setIdUsuarioModificar,
  } = useClientes();

  const handleEdit = async (celu, email, dni, apellido, nombre, _id) => {
    setNombreUsuario(nombre);
    setApellidoUsuario(apellido);
    setDniUsuario(dni);
    setEmailUsuario(email);
    setCeluUsuario(celu);
    setIdUsuarioModificar(_id);
    handleModalEditarUsuario();
  };

  return (
    <>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Nombre", "Email", "Cliente", "Accion"].map((el) => (
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
            {usuarios.map(
              (
                { _id, nombre, apellido, email, confirmado, celu, dni },
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
                          {nombre} {apellido}
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
                        {celu}
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
                            onClick={(e) =>
                              handleEdit(
                                celu,
                                email,
                                dni,
                                apellido,
                                nombre,

                                _id
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

export default ListadoUsuarios;

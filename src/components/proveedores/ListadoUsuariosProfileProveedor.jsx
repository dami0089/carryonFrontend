import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import useProveedores from "@/hooks/useProveedores";

const ListadoUsuariosProfileProveedor = () => {
  const {
    setNombreUsuario,
    setApellidoUsuario,
    setEmailUsuario,
    handleModalEditarUsuarioCliente,
    setIdUsuarioModificar,
    setSector,
    handleNuevoUsuarioProveedor,
    setNuevoPedidoNotifMail,
    setInfoViajeNotifMail,
    setInfoViajeWhatsapp,

    setCeluUsuario,
  } = useClientes();

  const {
    usuariosEmpresaProveedor,
    obtenerUsuariosPorEmpresaProveedor,
    cuitEditarProveedor,
    actualizarListadoUsuariosProveedor,
    setActualizarListadoUsuariosProveedor,
  } = useProveedores();

  const handleEdit = async (
    email,
    nombre,
    apellido,
    sector,
    _id,
    nuevoPedidoNotifMail,
    infoViajeNotifMail,
    infoViajeWhatsapp,
    celu
  ) => {
    handleModalEditarUsuarioCliente();
    setIdUsuarioModificar(_id);
    setNombreUsuario(nombre);
    setApellidoUsuario(apellido);
    setSector(sector);
    setEmailUsuario(email);
    setNuevoPedidoNotifMail(nuevoPedidoNotifMail);
    setInfoViajeNotifMail(infoViajeNotifMail);
    setInfoViajeWhatsapp(infoViajeWhatsapp);
    setCeluUsuario(celu);
  };

  useEffect(() => {
    const traerData = async () => {
      await obtenerUsuariosPorEmpresaProveedor(cuitEditarProveedor);
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (actualizarListadoUsuariosProveedor) {
        await obtenerUsuariosPorEmpresaProveedor(cuitEditarProveedor);
        setActualizarListadoUsuariosProveedor(false);
      }
    };
    traerData();
  }, [actualizarListadoUsuariosProveedor]);

  const handleModalNuevoUsuarioCliente = () => {
    handleNuevoUsuarioProveedor();
  };

  return (
    <>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2 ">
        <Card onClick={(e) => handleModalNuevoUsuarioCliente()}>
          <Card
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 cursor-pointer place-items-center"
          >
            <PlusCircleIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="cursor-pointer font-normal text-blue-gray-600"
            >
              Nuevo Usuario Proveedor
            </Typography>
          </CardBody>
        </Card>
      </div>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Nombre",
                "Email",
                "Rol",
                "Notif. Nuevo Servicio",
                "Notif. Info Viaje",
                "Whatsapp",
                "Accion",
              ].map((el) => (
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
          <tbody>
            {usuariosEmpresaProveedor.map(
              (
                {
                  _id,
                  nombre,
                  apellido,
                  email,
                  sector,
                  nuevoPedidoNotifMail,
                  infoViajeNotifMail,
                  infoViajeWhatsapp,
                  celu,
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
                        className="text-xs font-medium uppercase text-blue-gray-600"
                      >
                        {sector}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium uppercase text-blue-gray-600"
                      >
                        {nuevoPedidoNotifMail ? "Si" : "No"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium uppercase text-blue-gray-600"
                      >
                        {infoViajeNotifMail ? "Si" : "No"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium uppercase text-blue-gray-600"
                      >
                        {infoViajeWhatsapp ? "Si" : "No"}
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
                            handleEdit(
                              email,
                              nombre,
                              apellido,
                              sector,
                              _id,
                              nuevoPedidoNotifMail,
                              infoViajeNotifMail,
                              infoViajeWhatsapp,
                              celu
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
        </table>
      </CardBody>
    </>
  );
};

export default ListadoUsuariosProfileProveedor;

import {
  BanknotesIcon,
  BuildingOfficeIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import useClientes from "@/hooks/useClientes";
import { projectsTableData } from "@/data";

const DomiciliosClienteProfile = () => {
  const {
    handleModalDomicilio,
    obtenerDomicilios,
    cuitEditar,
    domiciliosCliente,
    recardoDomis,
    setRecargoDomis,
    handleModalEditarDomicilio,
    setDomicilioEntrega,
    setLocalidadEntre,
    setProvinciaEntrega,
    setDomiFantasia,
    setIdDomicilioEDitar,
    actualizarListadoDomis,
    setActualizarListadoDomis,
  } = useClientes();

  useEffect(() => {
    const obtenerDomis = async () => {
      if (cuitEditar && domiciliosCliente.length == 0) {
        await obtenerDomicilios(cuitEditar);
      }
    };
    obtenerDomis();
  }, [domiciliosCliente]);

  useEffect(() => {
    const obtenerDomis = async () => {
      await obtenerDomicilios(cuitEditar);
    };

    obtenerDomis();
  }, []);

  useEffect(() => {
    const obtenerDomis = async () => {
      if (actualizarListadoDomis) {
        await obtenerDomicilios(cuitEditar);
        setActualizarListadoDomis(false);
      }
    };
    obtenerDomis();
  }, [actualizarListadoDomis]);

  useEffect(() => {
    const obtenerDomis = async () => {
      if (recardoDomis) {
        await obtenerDomicilios(cuitEditar);
        setRecargoDomis(false);
      }
    };
    obtenerDomis();
  }, [recardoDomis]);

  const handleClick = () => {
    handleModalDomicilio();
  };

  const handleClickEditar = (
    _id,
    fantasia,
    direccion,
    localidad,
    provincia
  ) => {
    setIdDomicilioEDitar(_id);
    setDomicilioEntrega(direccion);
    setLocalidadEntre(localidad);
    setProvinciaEntrega(provincia);
    setDomiFantasia(fantasia);
    handleModalEditarDomicilio();
  };

  const handleClickGoogleMaps = (direccion, localidad, provincia, fantasia) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${fantasia} ${direccion} ${localidad} ${provincia}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2 ">
        <Card onClick={(e) => handleClick()}>
          <Card
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 cursor-pointer place-items-center"
          >
            <BuildingOfficeIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="cursor-pointer font-normal text-blue-gray-600"
            >
              Nuevo Deposito Cliente
            </Typography>
          </CardBody>
        </Card>
      </div>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Fantasia",
                "Domicilio",
                "Localidad",
                "Provincia",
                "Link",
                "Editar",
              ].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-center text-[11px] font-medium uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {domiciliosCliente ? (
            <>
              <tbody>
                {domiciliosCliente.map(
                  ({ _id, fantasia, direccion, localidad, provincia }, key) => {
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
                              {fantasia}
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
                              {direccion}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {localidad}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {provincia}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Button
                            className="flex items-center justify-center bg-green-300 capitalize"
                            fullWidth
                            onClick={(e) =>
                              handleClickGoogleMaps(
                                direccion,
                                localidad,
                                provincia,
                                fantasia
                              )
                            }
                          >
                            <MapIcon className="mr-1 h-4 w-4" />{" "}
                            {/* Nota el 'mr-1' para dar un pequeño espacio entre el ícono y el texto */}
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              Map
                            </Typography>
                          </Button>
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
                                handleClickEditar(
                                  _id,
                                  fantasia,
                                  direccion,
                                  localidad,
                                  provincia
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
          ) : (
            ""
          )}
        </table>
      </CardBody>
    </>
  );
};

export default DomiciliosClienteProfile;

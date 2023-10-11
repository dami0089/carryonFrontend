import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";

import useProveedores from "@/hooks/useProveedores";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";
import { setOpenConfigurator } from "@/configs/context";
import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";

const ListadoDeProveedores = () => {
  const {
    proveedores,

    setCuitEditarProveedor,

    obtenerProveedores,

    consultarListadoProveedores,
    setConsultarListadoProveedores,
  } = useProveedores();

  const { handleCargando } = useServicios();

  const { setSeleccionComercial } = useClientes();

  const navigate = useNavigate();

  const handleClick = async (e, _id) => {
    e.preventDefault();
    await setCuitEditarProveedor(_id);
    navigate("/proveedores/ficha-proveedor");
  };

  const [nombreFiltrado, setNombreFiltrado] = useState("");
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);

  const handleNombreProveedorChange = (e) => {
    const inputValue = e.target.value;
    setNombreFiltrado(inputValue);

    const coincidencias = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    setProveedoresFiltrados(coincidencias);
  };

  useEffect(() => {
    handleCargando();
    const obtenerprov = async () => {
      await obtenerProveedores();
      handleCargando();
    };
    obtenerprov();
  }, []);

  useEffect(() => {
    const obtenerprov = async () => {
      if (consultarListadoProveedores) {
        await obtenerProveedores();
        setConsultarListadoProveedores(false);
      }
    };
    obtenerprov();
  }, [consultarListadoProveedores]);

  return (
    <>
      <div className="mb-3 mt-8 flex items-center justify-between text-black">
        <Typography className="ml-3  font-bold">
          Listado de proveedores
        </Typography>

        <div className="flex items-center space-x-4">
          <input
            className="mt-2 mb-4 rounded-md border-2 p-2 placeholder-gray-400"
            type="text"
            autoComplete="off"
            placeholder="Filtrar por proveedor"
            value={nombreFiltrado}
            onChange={handleNombreProveedorChange}
          />
        </div>
      </div>
      <div className="mb-4  grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-gray-50">
                  <tr>
                    {["Proveedor", "Cuit", "Email", "Accion"].map((el) => (
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
                  {(nombreFiltrado ? proveedoresFiltrados : proveedores)
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map(({ _id, nombre, cuit, email }, key) => {
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
                              {cuit}
                            </Typography>
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
                    })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ListadoDeProveedores;

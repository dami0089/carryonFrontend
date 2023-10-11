import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import { useNavigate } from "react-router-dom";

const ListadodeClientes = () => {
  const navigate = useNavigate();
  const {
    clientes,
    setSeleccion,
    setCuitEditar,
    refrescoListado,
    setRefrescoListado,
    obtenerClientes,
    setSeleccionComercial,
  } = useClientes();
  const { handleCargando } = useServicios();
  const [currentPage, setCurrentPage] = useState(1);
  const [nombreFiltrado, setNombreFiltrado] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  const handleClick = async (e, _id) => {
    e.preventDefault();
    await setCuitEditar(_id);
    navigate("/clientes/ficha-cliente");
  };

  useEffect(() => {
    handleCargando();
    const obtenercli = async () => {
      await obtenerClientes();
      handleCargando();
    };
    obtenercli();
  }, []);

  useEffect(() => {
    const obtenerprov = async () => {
      if (refrescoListado) {
        await obtenerClientes();
        setRefrescoListado(false);
      }
    };
    obtenerprov();
  }, [refrescoListado]);

  // Paginación
  const itemsPerPage = 10;
  const totalPages = Math.ceil(clientes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = nombreFiltrado
    ? clientesFiltrados
    : clientes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNombreClienteChange = (e) => {
    const inputValue = e.target.value;
    setNombreFiltrado(inputValue);

    const coincidencias = clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    setClientesFiltrados(coincidencias);
  };

  return (
    <>
      <Typography className="mt-8 ml-4 mb-5 font-bold">
        Listado De Clientes
      </Typography>
      <div className="mb-4  grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="max-h-[78vh] overflow-y-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 bg-blue-gray-50 ">
                  <tr>
                    {["Nombre", "Cuit", "Email", "Accion"].map((el) => (
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
                  {currentItems.map(
                    ({ _id, nombre, cuit, mailFactura }, key) => {
                      const className = `py-3 px-5 ${
                        key === currentItems.length - 1
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
                              {mailFactura}
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
                    }
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-4 mb-4 flex items-center justify-center">
        <Button
          color="blue"
          className="mx-1"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Typography variant="small" className="mx-1">
          Página {currentPage} de {totalPages}
        </Typography>
        <Button
          color="blue"
          className="mx-1"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default ListadodeClientes;

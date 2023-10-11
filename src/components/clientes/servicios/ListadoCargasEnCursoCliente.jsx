import { Button, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import useServicios from "@/hooks/useServicios";
import useClientes from "@/hooks/useClientes";
import useMinutas from "@/hooks/useMinutas";
import { projectsTableData } from "@/data";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import { useNavigate } from "react-router-dom";

const ListadoCargasEnCursoCliente = () => {
  const navigate = useNavigate();
  const {
    serviciosCliente,
    obternerServiciosCliente,
    setIdServicio,
    obtenerServicio,
    recargoProximosViajes,
    setRecargoProximosViajes,
  } = useServicios();
  const { cuitEditar, formaDePago, setSeleccion } = useClientes();

  const { obtenerMinutasServicio } = useMinutas();

  useEffect(() => {
    const obtenerServices = async () => {
      await obternerServiciosCliente(cuitEditar);
    };
    obtenerServices();
  }, []);

  useEffect(() => {
    const traigoData = async () => {
      if (recargoProximosViajes) {
        await obternerServiciosCliente(cuitEditar);
        setRecargoProximosViajes(false);
      }
    };
    traigoData();
  }, [recargoProximosViajes]);

  const handleEdit = async (e, _id) => {
    e.preventDefault();
    await obtenerServicio(_id);
    await obtenerMinutasServicio(_id);
    setIdServicio(_id);
    navigate("/coordinacion/ficha-servicio");
  };

  return (
    <>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        Cargas en curso
      </Typography>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "OrdenServicio",
                "Tipo",
                "Camiones",
                "Destino",
                "Fecha",
                "Hora",
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
            {serviciosCliente.map(
              (
                {
                  _id,
                  numeroPedido,
                  tipoOperacion,
                  cantidad,
                  destinoCarga,
                  fechaCarga,
                  horaCarga,
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
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {tipoOperacion}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {cantidad}
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
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {formatearFecha(fechaCarga)}
                      </Typography>
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
                          className="mx-1 items-center gap-4 capitalize"
                          onClick={(e) => handleEdit(e, _id)}
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

export default ListadoCargasEnCursoCliente;

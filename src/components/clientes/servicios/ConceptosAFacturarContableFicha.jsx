import { CardBody, Typography } from "@material-tailwind/react";

import useServicios from "@/hooks/useServicios";
import { useEffect } from "react";

import { projectsTableData } from "@/data";

import { PencilSquareIcon } from "@heroicons/react/24/solid";

import useContable from "@/hooks/useContable";
import { formatearPrecio } from "@/data/helpers/formatearPrecio";
import { formatearFechaLibroVentas } from "@/data/helpers/formatearFechaLibroVentas";
import ContableEditarConcepto from "./ContableEditarConcepto";

const ConceptosAFacturarContableFicha = () => {
  const {
    idObtenerServicio,
    handleCargando,
    conceptosAFacturar,
    obtenerConceptos,
    actualizoConceptos,
    setActualizoConceptos,
    seActualizaConceptos,
    setSeActualizaConceptos,
    obtenerServicio,
  } = useServicios();

  const {
    handleModalEditarConcepto,
    obtenerFacturaEmitida,
    setTituloConcepto,
    setDescripcion1,
    setDescripcion2,
    setDescripcion3,
    setDescripcion4,
    setDescripcion5,
    setDescripcion6,
    setPrecioBrutoEditar,
    setIdConceptoAFActurar,
  } = useContable();

  useEffect(() => {
    const obtenerCons = async () => {
      handleCargando();
      await obtenerFacturaEmitida(idObtenerServicio);
      handleCargando();
    };
    obtenerCons();
  }, []);

  useEffect(() => {
    const obtenerFactu = async () => {
      await obtenerConceptos(idObtenerServicio);
    };
    obtenerFactu();
  }, []);

  useEffect(() => {
    const obtenerCons = async () => {
      if (actualizoConceptos) {
        handleCargando();
        await obtenerConceptos(idObtenerServicio);
        handleCargando();
        setActualizoConceptos(false);
      }
    };
    obtenerCons();
  }, [actualizoConceptos]);

  useEffect(() => {
    const actualizar = async () => {
      handleCargando();
      await obtenerServicio(idObtenerServicio);
      setActualizoConceptos(false);
      handleCargando();
    };
    actualizar();
  }, [actualizoConceptos]);

  useEffect(() => {
    const obtenerCons = async () => {
      if (seActualizaConceptos) {
        handleCargando();
        await obtenerConceptos(idObtenerServicio);
        handleCargando();
        setSeActualizaConceptos(false);
      }
    };
    obtenerCons();
  }, [seActualizaConceptos]);

  const editarConcep = (e, titulo, d1, d2, d3, d4, d5, d6, precioB, id) => {
    e.preventDefault();
    handleCargando();
    setTituloConcepto(titulo);
    setDescripcion1(d1);
    setDescripcion2(d2);
    setDescripcion3(d3);
    setDescripcion4(d4);
    setDescripcion5(d5);
    setDescripcion6(d6);
    setPrecioBrutoEditar(precioB);
    setIdConceptoAFActurar(id);
    handleCargando();
    handleModalEditarConcepto();
  };

  return (
    <>
      <Typography className="mb-5  mt-10 font-bold">
        Conceptos a Facturar
      </Typography>
      <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Fecha", "Servicio", "Importe"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 px-6 py-3 text-center"
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
            {conceptosAFacturar.map(
              (
                {
                  _id,
                  fecha,
                  descripcion0,
                  descripcion1,
                  descripcion2,
                  descripcion3,
                  descripcion4,
                  descripcion5,
                  descripcion6,
                  precioBruto,
                },
                key
              ) => {
                const className = ` ${
                  key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={_id}>
                    <td className={className}>
                      <div className="flex items-center ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {formatearFechaLibroVentas(fecha)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="mt-4 flex flex-col text-start">
                        <Typography className="font-bold">
                          {descripcion0}
                        </Typography>

                        <>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            -{descripcion1} <br />
                            {descripcion2 && descripcion2 !== ""
                              ? "-Ref: " + descripcion2
                              : null}{" "}
                            {descripcion2 ? <br /> : null}
                            {descripcion6 && descripcion6 !== ""
                              ? "-Remito: " + descripcion6
                              : null}
                            {descripcion6 ? <br /> : null}
                            {descripcion3 && descripcion3 !== ""
                              ? "-Despacho: " + descripcion3
                              : null}
                            {descripcion3 ? <br /> : null}
                            {descripcion4 && descripcion4 !== ""
                              ? "-Contenedor: " + descripcion4
                              : null}
                            {descripcion4 ? <br /> : null}
                            {descripcion5 && descripcion5 !== ""
                              ? "-Pedido Logicsar: " + descripcion5
                              : null}
                            {descripcion5 ? <br /> : null}
                          </Typography>

                          <PencilSquareIcon
                            className="mt-1 h-6 w-6 hover:cursor-pointer"
                            onClick={(e) =>
                              editarConcep(
                                e,
                                descripcion0,
                                descripcion1,
                                descripcion2,
                                descripcion3,
                                descripcion4,
                                descripcion5,
                                descripcion6,
                                precioBruto,
                                _id
                              )
                            }
                          />
                        </>
                      </div>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-center text-xs font-medium text-blue-gray-600"
                      >
                        {precioBruto
                          ? "$ " + formatearPrecio(precioBruto)
                          : "-"}
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

export default ConceptosAFacturarContableFicha;

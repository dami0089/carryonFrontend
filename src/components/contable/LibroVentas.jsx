import { Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import { EyeIcon } from "@heroicons/react/24/solid";
import useServicios from "@/hooks/useServicios";

import { ToastContainer, toast } from "react-toastify";

import { formateoFechaCorto } from "@/data/helpers/formateoFechaCorto";
import Cargando from "../deTodos/Cargando";

import { useNavigate } from "react-router-dom";
import useContable from "@/hooks/useContable";
import { formatearFecha } from "@/data/helpers/formatearFecha";
import { formatearFechaLibroVentas } from "@/data/helpers/formatearFechaLibroVentas";
import { obtenerNumeroMesLibroVentas } from "@/data/helpers/devolverMesLibroVentas";
import { obtenerYear } from "@/data/helpers/devolverAnoLibroVentas";

const LibroVentas = () => {
  const navigate = useNavigate();
  const { handleCargando, cargando } = useServicios();

  const { facturasEmitidas, obtenerFacturasLibroDiario } = useContable();

  useEffect(() => {
    handleCargando();

    const obtenerFacturas = async () => {
      await obtenerFacturasLibroDiario();
      handleCargando();
    };
    obtenerFacturas();
  }, []);

  const handleOpenPdf = (e, urlPdf) => {
    e.preventDefault();

    if (urlPdf === "") {
      toast.error("No hay pdf para esta factura", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      window.open(urlPdf, "_blank"); // Esto abrirá la URL en una nueva pestaña
    }
  };

  return (
    <>
      <div className="mt-10">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-5 ml-3 mr-3 text-center md:text-left">
          <Typography className="font-bold uppercase">Libro Ventas</Typography>
        </div>

        {facturasEmitidas.length > 0 ? (
          <div className="mb-4  grid grid-cols-1 gap-6  xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3">
              <CardBody className=" overflow-x-scroll px-0 pb-2 pt-0">
                <div className="max-h-[78vh] overflow-y-auto">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead className="sticky top-0 bg-blue-gray-50">
                      <tr>
                        {[
                          "Fecha",
                          "Mes",
                          "Año",
                          "Numero",
                          "Cliente",
                          "Categoria",
                          "CUIT",
                          "Importe NEto",
                          "Iva %",
                          "Iva",
                          "Total",
                          "Jur. IIBB",
                          "Estado",
                          "Factura De venta",
                          "Orden de Cobranza",
                          "Fecha de Pago",
                          "Enviada",
                          "Accion",
                        ].map((el) => (
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
                      {facturasEmitidas // Filtrar proveedores con estado distinto a "Terminado"
                        .map(
                          (
                            {
                              _id,
                              fechaEmision,
                              numeroFactura,
                              clienteRazonSocial,
                              totalIva,
                              total,
                              urlPDF,
                              EmpresaLegalTipoResponsable,
                              cuit,
                              subtotal,
                              alicuotaIVA,
                              iibb,
                              estado,
                              ordenCobranza,
                              fechaPago,
                              enviada,
                            },
                            key
                          ) => {
                            const className = `text-center py-3 px-5 ${
                              key === projectsTableData.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                            return (
                              <tr key={_id}>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className=" text-center text-xs font-medium"
                                    >
                                      {formatearFechaLibroVentas(fechaEmision)}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="text-center text-xs font-medium"
                                    >
                                      {obtenerNumeroMesLibroVentas(
                                        fechaEmision
                                      )}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="text-center text-xs font-medium"
                                    >
                                      {obtenerYear(fechaEmision)}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-40 text-xs font-medium uppercase text-blue-gray-600"
                                    >
                                      {numeroFactura}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-40 text-xs font-black uppercase text-blue-gray-600"
                                    >
                                      {clienteRazonSocial}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="text-xs font-black uppercase text-blue-gray-600"
                                    >
                                      {EmpresaLegalTipoResponsable ===
                                      "IVA Responsable Inscripto"
                                        ? "RI"
                                        : "CF"}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-40 text-xs font-black uppercase text-blue-gray-600"
                                    >
                                      {cuit}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      $ {subtotal.toFixed(2)}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      {alicuotaIVA}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      $ {totalIva.toFixed(2)}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      $ {total.toFixed(2)}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      {iibb}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      {estado}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-40 text-xs font-medium text-blue-gray-600"
                                    >
                                      FACTURA {numeroFactura}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      {ordenCobranza}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      {fechaPago
                                        ? formatearFechaLibroVentas(fechaPago)
                                        : ""}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <Typography
                                      variant="small"
                                      className="w-20 text-xs font-medium text-blue-gray-600"
                                    >
                                      {enviada}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center justify-center gap-4">
                                    <EyeIcon
                                      className="h-8 w-8 hover:cursor-pointer"
                                      onClick={(e) => handleOpenPdf(e, urlPDF)}
                                    />
                                  </div>
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
        ) : (
          <div className="text-center">No hay facturas emitidas</div>
        )}

        {cargando ? <Cargando /> : ""}
      </div>
    </>
  );
};

export default LibroVentas;

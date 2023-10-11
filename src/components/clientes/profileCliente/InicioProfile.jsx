import { ProfileInfoCard } from "@/widgets/cards";
import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import ListadoCargasEnCursoCliente from "../servicios/ListadoCargasEnCursoCliente";
import useClientes from "@/hooks/useClientes";
import useServicios from "@/hooks/useServicios";
import Cargando from "@/components/deTodos/Cargando";

const InicioProfile = () => {
  const {
    editarCliente,
    isActivo,
    cuitEditar,
    obtenerCliente,
    handleModalNuevoServicioDesdeFicha,
    handleModalNuevoUsuario,
    handleModalEditarCliente,
    actualizoCliente,
    setActualizoCliente,
  } = useClientes();

  useEffect(() => {
    const traerData = async () => {
      if (cuitEditar) {
        await obtenerCliente(cuitEditar);
      }
    };
    traerData();
  }, []);

  const handleNuevoServicioAdmin = () => {
    handleModalNuevoServicioDesdeFicha();
  };

  const handleModalNuevoUsuarioCliente = () => {
    handleModalNuevoUsuario();
  };
  return (
    <>
      <div className="mb-12 grid grid-cols-2 gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2">
        <div>
          <ProfileInfoCard
            title="Informacion"
            details={{
              Nombre: `${editarCliente.nombre ? editarCliente.nombre : ""}`,
              Cuit: `${editarCliente.cuit ? editarCliente.cuit : ""}`,
              "Email Factura": `${
                editarCliente.mailFactura ? editarCliente.mailFactura : ""
              }`,
              Direccion: `${
                editarCliente.domicilio ? editarCliente.domicilio : ""
              }`,
              // "Fecha de Vencimiento": `${formatearFecha(
              //   editarCliente.fechaVencimiento
              // )}`,
            }}
          />
        </div>
        <div className="flex flex-col justify-start">
          <div className="mb-2">
            <Button
              className="bg-blue-gray-600"
              fullWidth
              onClick={(e) => handleNuevoServicioAdmin()}
            >
              Nuevo Servicio
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className="bg-blue-gray-400"
              fullWidth
              onClick={(e) => handleModalNuevoUsuarioCliente()}
            >
              Nuevo Usuario
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className="bg-blue-gray-300"
              fullWidth
              onClick={(e) => handleModalEditarCliente()}
            >
              Editar Cliente
            </Button>
          </div>
        </div>
      </div>
      <Cargando />
      <ListadoCargasEnCursoCliente />
    </>
  );
};

export default InicioProfile;

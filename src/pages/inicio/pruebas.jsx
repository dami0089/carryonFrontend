import { React, useEffect } from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";

import useClientes from "@/hooks/useClientes";

import ModalEditarUsuario from "@/components/usuarios/ModalEditarUsuario";

import ModalEliminarUsuario from "@/components/usuarios/ModalEliminarUsuario";

import useServicios from "@/hooks/useServicios";
import ModalTerminalesYDepositos from "@/components/pruebas/ModalTerminalesYDepositos";
import {
  GlobeAsiaAustraliaIcon,
  QuestionMarkCircleIcon,
  QueueListIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import ModalNuevoUsuario from "@/components/clientes/servicios/ModalNuevoUsuario";
import ModalNuevoEstadoServicio from "@/components/pruebas/ModalNuevoEstadoServicio";
import ModalEstadosViajes from "@/components/pruebas/ModalEstadosViajes";
import ModalPlayasDevolucion from "@/components/pruebas/ModalPlayasDevolucion";
import Cargando from "@/components/deTodos/Cargando";

export function Prueba() {
  const {
    usuarios,
    handleModalNuevoUsuario,
    setIdUsuarioPrueba,
    handleModalEditarUsuarioPrueba,
    obtenerUsuarioProfile2,
    obtenerUsuarios,
    graboUsuario,
    setGraboUsuario,
    modalEditarUsuario,
    modalEliminarUsuario,
    modalNuevoUsuario,
  } = useClientes();

  const {
    handleModalTerminales,
    modalTerminales,
    handleModalNuevoEstadoservicio,
    handleModalEstadosViajes,
    handleModalDevolucion,
    handleCargando,
    nuevoEstadoServicio,
    modalEstadosViajes,
    modalDevolucion,
  } = useServicios();

  const handleClick = () => {
    handleModalNuevoUsuario();
    // setSeleccion(5);
  };

  const handleClickEditar = async (id) => {
    await obtenerUsuarioProfile2(id);
    setIdUsuarioPrueba(id);
    handleModalEditarUsuarioPrueba();
    // setSeleccion(5);
  };

  const handleTerminales = () => {
    handleModalTerminales();
  };

  const handleNuevoEstado = () => {
    handleModalNuevoEstadoservicio();
  };

  const handleNuevoEstadoViaje = () => {
    handleModalEstadosViajes();
  };

  const handleModalNuevaPlaya = () => {
    handleModalDevolucion();
  };

  useEffect(() => {
    const recargoUsuarios = async () => {
      if (graboUsuario) {
        handleCargando();

        await obtenerUsuarios();
        setGraboUsuario(false);
        handleCargando();
      }
    };
    recargoUsuarios();
  }, [graboUsuario]);

  useEffect(() => {
    handleCargando();

    const obtenerUsers = async () => {
      await obtenerUsuarios();
      handleCargando();
    };
    obtenerUsers();
  }, []);

  return (
    <div className="mt-12">
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
        <Card onClick={handleTerminales} className="cursor-pointer">
          <Card
            variant="gradient"
            color="blue"
            disabled={true}
            className="absolute -mt-4 grid h-12 w-12 place-items-center"
          >
            <GlobeAsiaAustraliaIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Terminales
            </Typography>
          </CardBody>
        </Card>
        <Card onClick={handleNuevoEstado} className="cursor-pointer">
          <Card
            variant="gradient"
            color="blue"
            disabled={true}
            className="absolute -mt-4 grid h-12 w-12 place-items-center"
          >
            <QuestionMarkCircleIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Nuevo Estado Servicio
            </Typography>
          </CardBody>
        </Card>
        <Card onClick={handleNuevoEstadoViaje} className="cursor-pointer">
          <Card
            variant="gradient"
            color="blue"
            disabled={true}
            className="absolute -mt-4 grid h-12 w-12 place-items-center"
          >
            <QueueListIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Nuevo Estado Viajes
            </Typography>
          </CardBody>
        </Card>
        <Card onClick={handleModalNuevaPlaya} className="cursor-pointer">
          <Card
            variant="gradient"
            color="blue"
            disabled={true}
            className="absolute -mt-4 grid h-12 w-12 place-items-center"
          >
            <TruckIcon className="h-8 w-8" />
          </Card>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Nueva playa devolucion
            </Typography>
          </CardBody>
        </Card>
      </div>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Nombre", "Email", "Rol", "Accion"].map((el) => (
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
            {usuarios.map(({ _id, nombre, apellido, email, rol }, key) => {
              const className = `py-3 px-5 ${key === _id}`;

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
                      {rol}
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
                          onClick={(e) => handleClickEditar(_id)}
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
            })}
          </tbody>
        </table>
      </CardBody>
      {modalEditarUsuario ? <ModalEditarUsuario /> : ""}
      {modalEliminarUsuario ? <ModalEliminarUsuario /> : ""}
      {modalNuevoUsuario ? <ModalNuevoUsuario /> : ""}
      {modalTerminales ? <ModalTerminalesYDepositos /> : ""}
      {nuevoEstadoServicio ? <ModalNuevoEstadoServicio /> : ""}
      {modalEstadosViajes ? <ModalEstadosViajes /> : ""}
      {modalDevolucion ? <ModalPlayasDevolucion /> : ""}
      <Cargando />
    </div>
  );
}

export default Prueba;

import { React, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Menu,
  Button,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";

import useProveedores from "@/hooks/useProveedores";

import ModalNuevoProveedor from "@/components/proveedores/ModalNuevoProveedor";

import ListadoDeProveedores from "@/components/proveedores/ListadodeProveedores";

import ModalNuevoMovimiento from "@/components/contable/ModalNuevoMovimiento";

import ModalNuevoPago from "@/components/contable/ModalNuevoPago";
import ProfileProveedor from "@/components/proveedores/ProfileProveedor";
import useServicios from "@/hooks/useServicios";
import Cargando from "@/components/deTodos/Cargando";
import useClientes from "@/hooks/useClientes";
import ListadoLIquidacionMensualPorProveedor from "@/components/proveedores/ListadoLIquidacionMensualPorProveedor";
import ResultadoBusqueda from "@/components/inicio/ResultadoBusqueda";
import Profile from "@/components/clientes/Profile";
import ProfileServicio from "@/components/clientes/servicios/ProfileServicio";

export function Proveedores() {
  const {
    handleModalNuevoProveedor,

    handleModalCargarFactura,
    seleccionProveedor,
    setSeleccionProveedor,
    modalNuevoProveedor,
  } = useProveedores();

  const { setSeleccion, seleccion, setSelectInicio } = useClientes();

  const { handleCargando, cargando, setPaginaLogisticaSelector } =
    useServicios();

  useEffect(() => {
    setSeleccion(1);
  }, []);

  useEffect(() => {
    setSelectInicio(1);
  }, []);

  useEffect(() => {
    setPaginaLogisticaSelector(100);
  }, []);

  const handleClick = () => {
    setSeleccion(5);
  };

  return seleccionProveedor == 1 ||
    seleccionProveedor == 2 ||
    seleccionProveedor == 3 ||
    seleccionProveedor == 4 ||
    seleccionProveedor == 6 ? (
    <>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
          <Card onClick={handleModalNuevoProveedor} className="cursor-pointer">
            <Card
              variant="gradient"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center bg-blue-gray-500"
            >
              <PlusIcon className="h-8 w-8 text-white" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Nuevo Transporte
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => setSeleccionProveedor(1)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center  bg-blue-gray-400"
            >
              <QueueListIcon className="h-8 w-8 text-white" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Listado de Transportes
              </Typography>
            </CardBody>
          </Card>
          <Card
            onClick={(e) => setSeleccionProveedor(6)}
            className="cursor-pointer"
          >
            <Card
              variant="gradient"
              disabled={true}
              className="absolute -mt-4 grid h-12 w-12 place-items-center  bg-blue-gray-300"
            >
              <CurrencyDollarIcon className="h-8 w-8 text-white" />
            </Card>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Liquidacion mensual x Transporte
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="mt-5 flex items-center justify-between "
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  {seleccionProveedor == 1 ? "Listado de Proveedores" : ""}
                  {seleccionProveedor == 5 ? "Facturas por pagar" : ""}
                </Typography>
              </div>

              {/* <Menu placement="left-start">
                <div>
                  {seleccionProveedor == 1 ? (
                    <>
                      <div className="flex justify-center">
                        <Button
                          className="w-30 mx-2 bg-green-300 text-center"
                          fullWidth
                          onClick={(e) => setSeleccionProveedor(5)}
                        >
                          volver
                        </Button>
                      </div>
                    </>
                  ) : seleccionProveedor == 5 ? (
                    <>
                      <Button
                        className="w-30 mx-2 bg-green-300 text-center "
                        fullWidth
                        onClick={(e) => setSeleccionProveedor(1)}
                      >
                        Volver
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </Menu> */}
            </CardHeader>

            {seleccionProveedor == 1 ? <ListadoDeProveedores /> : ""}
            {seleccionProveedor == 10 ? <ProfileProveedor /> : ""}
            {seleccionProveedor == 6 ? (
              <ListadoLIquidacionMensualPorProveedor />
            ) : (
              ""
            )}
          </Card>
        </div>
        {modalNuevoProveedor ? <ModalNuevoProveedor /> : ""}

        {/* <ModalNuevoMovimiento /> */}
        {/* <ModalNuevoPago /> */}
        <Cargando />
      </div>
    </>
  ) : seleccionProveedor == 7 ? (
    <ResultadoBusqueda />
  ) : seleccionProveedor == 8 ? (
    <Profile />
  ) : seleccionProveedor == 9 ? (
    <ProfileServicio />
  ) : seleccionProveedor == 10 ? (
    <ProfileProveedor />
  ) : (
    ""
  );
}

export default Proveedores;

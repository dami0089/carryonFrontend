import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";

import { StatisticsCard } from "@/widgets/cards";

import {
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  GlobeAsiaAustraliaIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import useContable from "@/hooks/useContable";

export function Contable() {
  const {
    seleccionEntidad,
    setSeleccionEntidad,
    movimientos,
    handleModalNuevoMovimiento,
  } = useContable();

  const [mostrarTotalBanco, setMostrarTotalBanco] = useState(0);
  const [mostrarTotalMP, setMostrarTotalMP] = useState(0);
  const [mostrarTotalEfectivo, setMostrarTotalEfectivo] = useState(0);
  const [mostrarTotalCripto, setMostrarTotalCripto] = useState(0);

  // useEffect(() => {
  //   let precio = 0;
  //   let precioG = 0;
  //   let total = 0;
  //   let totalG = 0;
  //   let totalB = 0;
  //   movimientos.forEach((movimiento) => {
  //     if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Banco") {
  //       precio = parseFloat(movimiento.precioNeto);
  //       total += precio;
  //     }
  //     if (movimiento.tipo == "Gasto" && movimiento.entidad == "Banco") {
  //       precioG = parseFloat(movimiento.precioNeto);
  //       totalG += precioG;
  //       // setMovimientoGastoBanco(total);
  //     }
  //   });

  //   totalB = total - totalG;
  //   setMostrarTotalBanco(totalB.toFixed(2));
  // }, [movimientos]);

  // useEffect(() => {
  //   let precio = 0;
  //   let precioG = 0;
  //   let total = 0;
  //   let totalG = 0;
  //   let totalB = 0;
  //   movimientos.forEach((movimiento) => {
  //     if (movimiento.tipo == "Ingreso" && movimiento.entidad == "MP") {
  //       precio = parseFloat(movimiento.precioNeto);
  //       total += precio;
  //     }
  //     if (movimiento.tipo == "Gasto" && movimiento.entidad == "MP") {
  //       precioG = parseFloat(movimiento.precioNeto);
  //       totalG += precioG;
  //       // setMovimientoGastoBanco(total);
  //     }
  //   });

  //   totalB = total - totalG;
  //   setMostrarTotalMP(totalB.toFixed(2));
  // }, [movimientos]);

  // useEffect(() => {
  //   let precio = 0;
  //   let precioG = 0;
  //   let total = 0;
  //   let totalG = 0;
  //   let totalB = 0;
  //   movimientos.forEach((movimiento) => {
  //     if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Efectivo") {
  //       precio = parseFloat(movimiento.precioNeto);
  //       total += precio;
  //     }
  //     if (movimiento.tipo == "Gasto" && movimiento.entidad == "Efectivo") {
  //       precioG = parseFloat(movimiento.precioNeto);
  //       totalG += precioG;
  //       // setMovimientoGastoBanco(total);
  //     }
  //   });

  //   totalB = total - totalG;
  //   setMostrarTotalEfectivo(totalB.toFixed(2));
  // }, [movimientos]);

  // useEffect(() => {
  //   let precio = 0;
  //   let precioG = 0;
  //   let total = 0;
  //   let totalG = 0;
  //   let totalB = 0;
  //   movimientos.forEach((movimiento) => {
  //     if (movimiento.tipo == "Ingreso" && movimiento.entidad == "Cripto") {
  //       precio = parseFloat(movimiento.precioNeto);
  //       total += precio;
  //     }
  //     if (movimiento.tipo == "Gasto" && movimiento.entidad == "Cripto") {
  //       precioG = parseFloat(movimiento.precioNeto);
  //       totalG += precioG;
  //       // setMovimientoGastoBanco(total);
  //     }
  //   });

  //   totalB = total - totalG;
  //   setMostrarTotalCripto(totalB.toFixed(2));
  // }, [movimientos]);

  return (
    <div className="mt-12">
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title="Banco"
          color="blue"
          icon={<BanknotesIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">$ {mostrarTotalBanco} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Mercado Pago"
          color="pink"
          icon={<CreditCardIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">$ {mostrarTotalMP} </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Efectivo"
          color="green"
          icon={<CurrencyDollarIcon />}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">
                $ {mostrarTotalEfectivo}{" "}
              </strong>
            </Typography>
          }
        />
        <StatisticsCard
          title="Cripto"
          icon={<GlobeAsiaAustraliaIcon />}
          color="orange"
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">
                USD {mostrarTotalCripto}{" "}
              </strong>
            </Typography>
          }
        />
      </div> */}

      {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                {seleccionEntidad == 1 ? (
                  <h1 className=" rounded-lg bg-green-500 p-2 text-white">
                    Banco
                  </h1>
                ) : (
                  ""
                )}
                {seleccionEntidad == 2 ? (
                  <h1 className="rounded-lg bg-green-500 p-2 text-white">
                    Mercado Pago
                  </h1>
                ) : (
                  ""
                )}
                {seleccionEntidad == 3 ? (
                  <h1 className="rounded-lg bg-green-500 p-2 text-white">
                    Caja
                  </h1>
                ) : (
                  ""
                )}
                {seleccionEntidad == 4 ? (
                  <h1 className="rounded-lg bg-green-500 p-2 text-white">
                    Cripto
                  </h1>
                ) : (
                  ""
                )}
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              ></Typography>
            </div> */}
      {/* <Menu placement="left-start"> */}
      {/* <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler> */}

      {/* <div>
              <Button
                className="w-30 mx-2 text-center "
                onClick={(e) => setSeleccionEntidad(1)}
              >
                Banco
              </Button>
              <Button
                className="w-30 mx-2 bg-pink-400  text-center"
                onClick={(e) => setSeleccionEntidad(2)}
              >
                MP
              </Button>
              <Button
                className="w-30 mx-2 bg-green-600  text-center"
                onClick={(e) => setSeleccionEntidad(3)}
              >
                Caja
              </Button>
              <Button
                className="w-30 mx-2 bg-orange-500  text-center"
                onClick={(e) => setSeleccionEntidad(4)}
              >
                Cripto
              </Button>
              <Button
                variant="gradient"
                color="blue"
                className="mt-4h-8 mx-2 w-16"
                onClick={handleModalNuevoMovimiento}
              >
                <PlusIcon />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              {seleccionEntidad == 1 ? (
                <ListadoBanco />
              ) : seleccionEntidad == 2 ? (
                <ListadoMercadoPago />
              ) : seleccionEntidad == 3 ? (
                <ListadoCaja />
              ) : seleccionEntidad == 4 ? (
                <ListadoCripto />
              ) : (
                ""
              )}
            </table>
          </CardBody>
        </Card>
      </div>
      <ModalNuevoMovimiento />
      <ModalEditarMovimiento />
      
      <Cargando/>
      
      */}
    </div>
  );
}

export default Contable;

import { BanknotesIcon, ReceiptPercentIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

const ContableClienteProfile = () => {
  return (
    <>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2 ">
        <Card>
          <Button
            variant="gradient"
            color="pink"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
            // onClick={(e)=> log}
          >
            <BanknotesIcon />
          </Button>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Nueva Factura
            </Typography>
          </CardBody>
        </Card>
        <Card>
          <Button
            variant="gradient"
            color="green"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
            onClick={(e) => setSeleccion(4)}
          >
            <ReceiptPercentIcon />
          </Button>
          <CardBody className="p-4 text-right">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Nuevo Recibo
            </Typography>
          </CardBody>
        </Card>
      </div>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "Comprobante",
                "Numero",
                "Importe",
                "Debe",
                "Haber",
                "Editar",
                "Descargar",
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
        </table>
      </CardBody>
    </>
  );
};

export default ContableClienteProfile;

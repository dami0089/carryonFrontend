import { Button } from "@material-tailwind/react";

import { useState } from "react";

import ListadoViajesProveedores from "./ListadoViajesProveedores";
import ListadoViajesProveedoresChoferes from "./ListadoViajesProveedoresChoferes";

const ProveedorProfileServicio = () => {
  const [viajeOChoferes, setViajeOChoferes] = useState(1);

  return (
    <>
      <div className="mb-12 grid grid-cols-2 gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2 ">
        <Button onClick={(e) => setViajeOChoferes(1)}>Viaje</Button>
        <Button onClick={(e) => setViajeOChoferes(2)}>Choferes</Button>
      </div>

      {viajeOChoferes === 1 ? (
        <>
          <ListadoViajesProveedores />
        </>
      ) : viajeOChoferes === 2 ? (
        <ListadoViajesProveedoresChoferes />
      ) : (
        ""
      )}
    </>
  );
};

export default ProveedorProfileServicio;

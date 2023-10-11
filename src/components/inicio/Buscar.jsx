import useClientes from "@/hooks/useClientes";
import useProveedores from "@/hooks/useProveedores";
import useServicios from "@/hooks/useServicios";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

const Buscar = () => {
  const [buscar, setBuscar] = useState("");

  const {
    busqueda,
    handleCargando,
    paginaLogisticaSelector,
    setPaginaLogisticaSelector,
  } = useServicios();

  const { selectInicio, setSelectInicio, setSeleccion, seleccion } =
    useClientes();

  const { seleccionProveedor, setSeleccionProveedor } = useProveedores();

  const handleSubmit = async () => {
    if (seleccion !== 1 || seleccion == 1) {
      setSeleccion(11);
      handleCargando();
      await busqueda(buscar);
      handleCargando();

      setBuscar("");
    }

    if (selectInicio !== 1 || selectInicio == 1) {
      setSelectInicio(7);
      handleCargando();
      await busqueda(buscar);
      handleCargando();
      setBuscar("");
    }

    if (paginaLogisticaSelector !== 1 || paginaLogisticaSelector == 1) {
      setPaginaLogisticaSelector(7);
      handleCargando();
      await busqueda(buscar);
      handleCargando();
      setBuscar("");
    }

    if (seleccionProveedor !== 1 || seleccionProveedor == 1) {
      setSeleccionProveedor(7);
      handleCargando();
      await busqueda(buscar);
      handleCargando();
      setBuscar("");
    }
  };

  return (
    <div className="mr-auto md:mr-4 md:w-56">
      <Input
        label="Buscar"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
    </div>
  );
};

export default Buscar;

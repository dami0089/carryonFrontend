import useClientes from "@/hooks/useClientes";
import useProveedores from "@/hooks/useProveedores";
import useServicios from "@/hooks/useServicios";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Buscar = () => {
  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();
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
    handleCargando();
    await busqueda(buscar);
    handleCargando();
    navigate("/busqueda");
    setBuscar("");
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

import React, { useEffect, useState } from "react";

import useProveedores from "@/hooks/useProveedores";

import { Button, Typography } from "@material-tailwind/react";

import ChoferesProfileProveedor from "../proveedores/profileProveedor/vehiculos/ChoferesProfileProveedor";
import CamionesProfileProveedor from "../proveedores/profileProveedor/vehiculos/CamionesProfileProveedor";
import SemisProfileProveedor from "../proveedores/profileProveedor/vehiculos/SemisProfileProveedor";
import EquiposProfileProveedor from "../proveedores/profileProveedor/vehiculos/EquiposProfileProveedor";
import AnimacionEquipos from "./AnimacionEquipos";

// import AnimacionEquipos from "./AnimacionEquipos";

const ListadoMisChoferes = () => {
  const {
    editarProveedor,
    cuitEditarProveedor,

    handleModalNuevoChofer,
    handleModalNuevoCamion,
    handleModalNuevoSemi,
    handleModalNuevoEquipo,
  } = useProveedores();

  const [mostrarListado, setMostrarListado] = useState(4);

  const handleClickChofer = async () => {
    setMostrarListado(1);
  };

  const handleClikCamion = async () => {
    setMostrarListado(2);
  };

  const handleClicSemi = async () => {
    setMostrarListado(3);
  };

  const handleClicEquipo = async () => {
    setMostrarListado(4);
  };

  return (
    <>
      <div className="mb-8 mr-10 grid grid-cols-2 gap-28  lg:grid-cols-2 xl:grid-cols-2">
        <div>
          <AnimacionEquipos />
        </div>
        <div className="flex flex-col justify-end">
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-600`}
              onClick={(e) => handleModalNuevoEquipo()}
              fullWidth
            >
              Crear Equipos
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-500`}
              onClick={(e) => handleModalNuevoChofer()}
              fullWidth
            >
              Nuevo Chofer
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-400`}
              onClick={(e) => handleModalNuevoCamion()}
              fullWidth
            >
              Nuevo Camion
            </Button>
          </div>
          <div className="mb-2">
            <Button
              className={`bg-blue-gray-300`}
              onClick={(e) => handleModalNuevoSemi()}
              fullWidth
            >
              Nuevo Semi
            </Button>
          </div>
        </div>
      </div>

      <div className="ml-10 mr-10 flex flex-row justify-between">
        <Typography variant="h6" color="blue-gray" className="mb-1">
          Listado{" "}
          {mostrarListado == 1
            ? "Choferes"
            : mostrarListado == 2
            ? "Camiones"
            : mostrarListado == 3
            ? "Semis"
            : mostrarListado == 4
            ? "Equipos"
            : ""}
        </Typography>

        <Button
          className={`${
            mostrarListado == 4 ? "bg-green-300" : "bg-blue-gray-600"
          }`}
          onClick={(e) => handleClicEquipo()}
        >
          Equipos
        </Button>

        <Button
          className={`${
            mostrarListado == 1 ? "bg-green-300" : "bg-blue-gray-500"
          }`}
          onClick={(e) => handleClickChofer()}
        >
          Choferes
        </Button>

        <Button
          className={`${
            mostrarListado == 2 ? "bg-green-300" : "bg-blue-gray-400"
          }`}
          onClick={(e) => handleClikCamion()}
        >
          Camiones
        </Button>

        <Button
          className={`${
            mostrarListado == 3 ? "bg-green-300" : "bg-blue-gray-300"
          }`}
          onClick={(e) => handleClicSemi()}
        >
          Semis
        </Button>
      </div>

      <div className="ml-10 mr-10">
        {mostrarListado === 1 ? (
          <ChoferesProfileProveedor />
        ) : mostrarListado === 2 ? (
          <CamionesProfileProveedor />
        ) : mostrarListado === 3 ? (
          <SemisProfileProveedor />
        ) : mostrarListado === 4 ? (
          <EquiposProfileProveedor />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ListadoMisChoferes;

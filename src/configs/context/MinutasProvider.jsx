import React from "react";
import { useState, createContext } from "react";
import clienteAxios from "@/configs/clinteAxios";

import { toast } from "react-toastify";

const MinutasContext = createContext();

const MinutasProvider = ({ children }) => {
  const [modalMinutas, setModalMinutas] = useState(false);
  const [tipoMinuta, setTipoMinuta] = useState("");
  const [tituloMinuta, setTituloMinuta] = useState("");
  const [contactoMinuta, setContactoMinuta] = useState("");
  const [minuta, setMinuta] = useState("");
  const [minutasServicio, setMinutasServicio] = useState([]);

  const handleModalMinutas = () => {
    setModalMinutas(!modalMinutas);
  };

  const nuevaMinuta = async (
    idServicio,
    tipo,
    titulo,
    contacto,
    minuta,
    idEntidad
  ) => {
    const minutas = {
      tipo: tipo,
      titulo: titulo,
      contacto: contacto,
      minuta: minuta,
      servicio: idServicio,
      idEntidad: idEntidad,
    };
    const id = idServicio;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/minutas/${id}`,
        minutas,
        config
      );

      toast.success("Minuta creada", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        setTipoMinuta("");
        setTituloMinuta("");
        setContactoMinuta("");
        setMinuta("");
        handleModalMinutas();
      }, 1000);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerMinutasServicio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/minutas/obtener-minutas/${id}`,
        config
      );

      setMinutasServicio(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MinutasContext.Provider
      value={{
        handleModalMinutas,
        modalMinutas,
        nuevaMinuta,
        tipoMinuta,
        setTipoMinuta,
        tituloMinuta,
        setTituloMinuta,
        contactoMinuta,
        setContactoMinuta,
        minuta,
        setMinuta,
        obtenerMinutasServicio,
        minutasServicio,
      }}
    >
      {children}
    </MinutasContext.Provider>
  );
};

export { MinutasProvider };

export default MinutasContext;

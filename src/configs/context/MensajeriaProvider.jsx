import React from "react";
import { useState, createContext } from "react";
import clienteAxios from "@/configs/clinteAxios";

import { toast } from "react-toastify";

const MensajeriaContext = createContext();

const MensajeriaProvider = ({ children }) => {
  const [modalMensajeria, setModalMensajeria] = useState(false);

  const handleModalMensajeria = () => {
    setModalMensajeria(!modalMensajeria);
  };

  return (
    <MensajeriaContext.Provider
      value={{
        handleModalMensajeria,
        modalMensajeria,
      }}
    >
      {children}
    </MensajeriaContext.Provider>
  );
};

export { MensajeriaProvider };

export default MensajeriaContext;

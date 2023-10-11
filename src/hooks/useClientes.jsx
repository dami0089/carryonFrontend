import { useContext } from "react";
import ClientesContext from "@/configs/context/ClientesProvider";

const useClientes = () => {
  return useContext(ClientesContext);
};

export default useClientes;

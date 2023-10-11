import { useContext } from "react";
import ProveedoresContext from "@/configs/context/ProveedoresProvider";

const useProveedores = () => {
  return useContext(ProveedoresContext);
};

export default useProveedores;

import { useContext } from "react";

import ServiciosContext from "@/configs/context/ServiciosProvider";

const useServicios = () => {
  return useContext(ServiciosContext);
};

export default useServicios;

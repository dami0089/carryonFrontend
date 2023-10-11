import { useContext } from "react";

import MinutasContext from "@/configs/context/MinutasProvider";

const useMinutas = () => {
  return useContext(MinutasContext);
};

export default useMinutas;

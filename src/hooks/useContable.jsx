import { useContext } from "react";
import ContableContext from "../configs/context/ContableProvider";

const useContable = () => {
  return useContext(ContableContext);
};

export default useContable;

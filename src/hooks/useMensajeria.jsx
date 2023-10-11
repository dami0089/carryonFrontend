import { useContext } from "react";
import MensajeriaContext from "@/configs/context/MensajeriaProvider";

const useMensajeria = () => {
  return useContext(MensajeriaContext);
};

export default useMensajeria;

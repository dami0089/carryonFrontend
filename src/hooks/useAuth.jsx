import { useContext } from "react";
import AuthContext from "@/configs/context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

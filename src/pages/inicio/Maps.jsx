import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import fondo from "/public/img/logistica-transporte-buques-carga-contenedores-aviones-carga-puente-grua-funcionamiento-astillero-al-amanecer-antecedentes-logisticos-industria-importacion-exportacion-transporte-ai-generativo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "@/configs/clinteAxios";
import useServicios from "@/hooks/useServicios";

export function Maps() {
  const params = useParams();
  const { handleCargando } = useServicios();

  const { token } = params;

  const navigate = useNavigate();

  const [redireccion, setRedireccion] = useState();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        handleCargando();
        console.log(token);
        const { data } = await clienteAxios(`maps/${token}`);

        const url = `https://www.google.com/maps/search/?api=1&query=${data.fantasia} ${data.direccion} ${data.localidad} ${data.provincia} `;
        window.location.href = url;
      } catch (error) {
        toast.error("El link ya no se encuentra disponible", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    comprobarToken();
  }, []);

  return (
    <>
      <h1>Seras Redirigido</h1>
    </>
  );
}

export default Maps;

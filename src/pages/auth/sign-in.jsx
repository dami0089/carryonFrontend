import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import React from "react";
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
import fondo from "/public/img/operacion-contenedores-puerto-serie.jpg";
import clienteAxios from "@/configs/clinteAxios";
import useAuth from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import Cargando from "@/components/deTodos/Cargando";
import useServicios from "@/hooks/useServicios";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();

  const { handleCargando } = useServicios();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if ([email, password].includes("")) {
      toast("⚠️ Todos los campos son obligatorios!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    handleCargando();
    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      window.location.href = "/inicio";
      handleCargando();
    } catch (error) {
      toast.error(error.response.data.msg, {
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

  return (
    <>
      <img
        src={fondo}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <ToastContainer pauseOnFocusLoss={false} />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-1/3 left-2/4 w-full max-w-[24rem] -translate-y-1/3 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white" className="uppercase">
              Ingresar
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Iniciar Sesion
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Olvidaste tu Password?
              <Link to="/olvide-password">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Recuperar
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <Cargando />
    </>
  );
}

export default SignIn;

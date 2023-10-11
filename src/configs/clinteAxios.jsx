import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Agregar interceptor de solicitud
clienteAxios.interceptors.request.use((config) => {
  console.log("Solicitud enviada a:", config.url);
  return config;
});

export default clienteAxios;

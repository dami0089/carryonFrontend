export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));

  const opciones = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

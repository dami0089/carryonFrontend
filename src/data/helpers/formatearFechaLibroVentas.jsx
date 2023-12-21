export const formatearFechaLibroVentas = (fecha) => {
  const nuevaFecha = new Date(fecha.split("T")[0]);

  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

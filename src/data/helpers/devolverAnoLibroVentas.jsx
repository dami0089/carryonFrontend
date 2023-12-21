export const obtenerYear = (fecha) => {
  const nuevaFecha = new Date(fecha.split("T")[0]);
  return nuevaFecha.getFullYear();
};

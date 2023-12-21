export const obtenerNumeroMesLibroVentas = (fecha) => {
  const nuevaFecha = new Date(fecha.split("T")[0]);
  return nuevaFecha.getMonth() + 1;
};

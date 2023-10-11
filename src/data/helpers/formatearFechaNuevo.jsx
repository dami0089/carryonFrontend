export const formatearFechaNuevo = (fecha) => {
  const options = { weekday: "short", day: "numeric", month: "short" };
  const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", options);

  return fechaFormateada;
};

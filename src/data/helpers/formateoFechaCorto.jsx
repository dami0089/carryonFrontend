export const formateoFechaCorto = (fecha) => {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMinutes(
    nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
  );

  const opciones = {
    weekday: "short",
    day: "numeric",
    month: "numeric",
  };

  const fechaFormateada = nuevaFecha.toLocaleDateString("es-ES", opciones);
  const [nombreDia, fechaNumerica] = fechaFormateada.split(", ");
  const [diaNumerico, mesNumerico] = fechaNumerica.split("/");

  return `${nombreDia.substring(0, 3)}, ${diaNumerico}/${mesNumerico}`;
};

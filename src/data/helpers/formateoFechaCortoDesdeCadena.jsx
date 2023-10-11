export const formateoFechaCortoDesdeCadena = (fechaCadena) => {
  const nuevaFecha = new Date(fechaCadena + "T00:00:00");

  const diasSemanaCortos = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const nombreDia = diasSemanaCortos[nuevaFecha.getUTCDay()];

  const diaNumerico = nuevaFecha.getUTCDate();
  const mesNumerico = nuevaFecha.getUTCMonth() + 1; // Los meses en JavaScript empiezan en 0

  return `${nombreDia}, ${diaNumerico}/${mesNumerico}`;
};

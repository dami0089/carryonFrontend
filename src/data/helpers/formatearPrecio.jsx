export const formatearPrecio = (precio) => {
  // Convertir la cadena a un número flotante
  const numero = parseFloat(precio);

  // Verificar si el número es válido
  if (!isNaN(numero)) {
    // Formatear el número a dos decimales y con coma como separador decimal
    return numero.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    // Si no es un número válido, devolver un guion o alguna representación de "no disponible"
    return "-";
  }
};

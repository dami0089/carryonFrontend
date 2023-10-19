import { BellAlertIcon } from "@heroicons/react/24/solid";

import React, { useState, useEffect, useRef } from "react";

const Notificaciones = () => {
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [contenedorFijado, setContenedorFijado] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const notificaciones = ["Notificación 1", "Notificación 2", "Notificación 3"]; // Ejemplo de notificaciones sin leer
  const contenedorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(event.target)
      ) {
        setMostrarNotificaciones(false);
        setContenedorFijado(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleHover = () => {
    if (!contenedorFijado) {
      setMostrarNotificaciones(true);
    }
  };

  const handleClick = () => {
    if (contenedorFijado) {
      setContenedorFijado(false);
      setMostrarNotificaciones(false);
    } else {
      setContenedorFijado(true);
    }
  };

  const handleLeave = () => {
    if (!contenedorFijado) {
      setMostrarNotificaciones(false);
    }
  };

  const handleNotificationEnter = (index) => {
    setHoverIndex(index);
  };

  const handleNotificationLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className="z-09 relative" ref={contenedorRef}>
      <div
        className="group"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <BellAlertIcon className="h-8 w-8 cursor-pointer text-blue-gray-200" />

        {/* Número con círculo rojo */}
        <div className="absolute right-0 top-0">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {notificaciones.length}
          </span>
        </div>
      </div>

      {/* Popover de notificaciones */}
      {(mostrarNotificaciones || contenedorFijado) && (
        <div
          className="absolute right-0 top-10 z-50"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div className="max-h-48 w-80 overflow-y-auto rounded-md bg-white p-2 shadow-lg">
            {notificaciones.map((notificacion, index) => (
              <div
                key={index}
                className={`py-1 text-gray-600 ${
                  hoverIndex === index ? "bg-gray-100" : ""
                }`}
                onMouseEnter={() => handleNotificationEnter(index)}
                onMouseLeave={handleNotificationLeave}
              >
                {notificacion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificaciones;

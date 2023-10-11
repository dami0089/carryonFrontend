import React from "react";
import Lottie from "lottie-react";
import camion from "../pagina-proveedores/Lotties/89834-cargo-truck.json";

const AnimacionEquipos = () => {
  return (
    <div>
      <Lottie
        loop
        autoplay
        style={{ width: "400px", height: "300px" }}
        animationData={camion}
      />
    </div>
  );
};

export default AnimacionEquipos;

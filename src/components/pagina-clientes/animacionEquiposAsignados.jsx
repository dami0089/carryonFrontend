import React from "react";

import Lottie from "lottie-react";
import animationData from "./Lotties/50618-truck.json";

const AnimacionEquiposAsignados = () => {
  return (
    <div>
      <Lottie
        loop
        autoplay
        style={{ width: "400px", height: "300px" }}
        animationData={animationData}
      />
    </div>
  );
};

export default AnimacionEquiposAsignados;

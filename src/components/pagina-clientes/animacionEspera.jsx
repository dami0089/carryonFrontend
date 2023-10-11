import React from "react";

import Lottie from "lottie-react";
import animationData from "./Lotties/50810-forklift-loading-truck.json";

const AnimacionEspera = () => {
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

export default AnimacionEspera;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/configs/context";
import "/public/css/tailwind.css";
import { AuthProvider } from "./configs/context/AuthProvider";
import { ClientesProvider } from "./configs/context/ClientesProvider";
import { ProveedoresProvider } from "./configs/context/ProveedoresProvider";
import { ContableProvider } from "./configs/context/ContableProvider";
import { ServiciosProvider } from "./configs/context/ServiciosProvider";
import { MinutasProvider } from "./configs/context/MinutasProvider";
import { MensajeriaProvider } from "./configs/context/MensajeriaProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <AuthProvider>
            <ServiciosProvider>
              <ClientesProvider>
                <ProveedoresProvider>
                  <ContableProvider>
                    <MinutasProvider>
                      <MensajeriaProvider>
                        <App />
                      </MensajeriaProvider>
                    </MinutasProvider>
                  </ContableProvider>
                </ProveedoresProvider>
              </ClientesProvider>
            </ServiciosProvider>
          </AuthProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
);

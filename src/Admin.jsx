import React from "react";
import { Route } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <Route path="/inicio" element={<RutaProtegida />}>
        <Route index element={<Home />} />
        <Route path="crm" element={<Crm />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="contable" element={<Contable />} />
        <Route path="logistica" element={<Contable />} />
        <Route path="pruebas" element={<Prueba />} />
      </Route>
    </>
  );
};

export default Admin;

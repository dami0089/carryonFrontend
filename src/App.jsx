import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import PrimerPassword from "./pages/auth/PrimerPassword";
import OlvidePassword from "./pages/auth/OlvidePassword";
import NuevoPassword from "./pages/auth/NuevoPassword";
import RutaProtegida from "./layouts/RutaProtegida";
import { Home } from "./pages/inicio/home";
import Crm from "./pages/inicio/crm";
import { Clientes } from "./pages/inicio/clientes";
import Proveedores from "./pages/inicio/proveedores";
import Contable from "./pages/inicio/contable";
import Prueba from "./pages/inicio/pruebas";
import useAuth from "./hooks/useAuth";
import PaginaProveedores from "./pages/inicio/paginaProveedores";
import PaginaClientes from "./pages/inicio/paginaClientes";
import Logistica from "./pages/inicio/logistica";
import Administracion from "./pages/inicio/administracion";
import Comercial from "./pages/inicio/comercial";
import Maps from "./pages/inicio/Maps";
import ListadoOperacionesCoordinadasDiasAnteriores from "./components/inicio/ListadoOperacionesSinCerrarDiasAnteriores";
import ListadoOperacionesCoordinadasProximosDias from "./components/inicio/ListadoOperacionesCoordinadasParaProximosDias";
import ListadoOperacionesCoordinadasParaHoy from "./components/inicio/ListadoOperacionesCoordinadasParaHoy";
import ListadoOperacionesCoordinadasManana from "./components/inicio/ListadoOperacionesCoordinadasManana";
import ProfileServicio from "./components/clientes/servicios/ProfileServicio";
import ListadoDeTodosLosViajes from "./components/logistica/ListadoDeTodosLosViajes";
import Profile from "./components/clientes/Profile";
import ListadodeClientes from "./components/clientes/ListadodeClientes";
import ListadoDeProveedores from "./components/proveedores/ListadodeProveedores";
import ProfileProveedor from "./components/proveedores/ProfileProveedor";
import Buscar from "./components/inicio/Buscar";
import ResultadoBusqueda from "./components/inicio/ResultadoBusqueda";
import ListadoViajesSinNotificar from "./components/inicio/ListadoViajesSinNotificar";

//TODO:FALTA AGREGAR EL BAR AL MENU
function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" index element={<SignIn />} />
      <Route path="/crear-password/:token" element={<PrimerPassword />} />
      <Route path="/olvide-password" element={<OlvidePassword />} />
      <Route path="/olvide-password/:token" element={<NuevoPassword />} />
      <Route path="/maps/:token" element={<Maps />} />

      {auth.rol === "admin" ? (
        <>
          {/* Rutas Home */}
          <Route path="/inicio" element={<RutaProtegida />}>
            <Route index element={<Home />} />
            <Route
              path="listado-viajes-sin-notificar"
              element={<ListadoViajesSinNotificar />}
            />
          </Route>

          {/* Ruta BUscar */}
          <Route path="/busqueda" element={<RutaProtegida />}>
            <Route index element={<ResultadoBusqueda />} />
          </Route>

          {/* Rutas Clientes */}
          <Route path="/clientes" element={<RutaProtegida />}>
            <Route index element={<Comercial />} />
            <Route path="listado-clientes" element={<ListadodeClientes />} />
            <Route path="ficha-cliente" element={<Profile />} />
          </Route>

          {/* Rutas Proveedores */}
          <Route path="/proveedores" element={<RutaProtegida />}>
            <Route index element={<Comercial />} />
            <Route
              path="listado-proveedores"
              element={<ListadoDeProveedores />}
            />
            <Route path="ficha-proveedor" element={<ProfileProveedor />} />
          </Route>

          {/* Rutas de Coordinacion */}
          <Route path="/coordinacion" element={<RutaProtegida />}>
            <Route index element={<Logistica />} />

            <Route
              path="listado-viajes-anteriores"
              element={<ListadoOperacionesCoordinadasDiasAnteriores />}
            />
            <Route
              path="listado-viajes-proximos-dias"
              element={<ListadoOperacionesCoordinadasProximosDias />}
            />

            <Route
              path="listado-viajes-hoy"
              element={<ListadoOperacionesCoordinadasParaHoy />}
            />
            <Route
              path="listado-viajes-manana"
              element={<ListadoOperacionesCoordinadasManana />}
            />
            <Route
              path="listado-viajes-todos"
              element={<ListadoDeTodosLosViajes />}
            />
            <Route path="ficha-servicio" element={<ProfileServicio />} />
          </Route>

          {/* Rutas de Administracion */}
          <Route path="/administracion" element={<RutaProtegida />}>
            <Route index element={<Administracion />} />
          </Route>

          {/* Rutas de Comercial */}
          <Route path="/comercial" element={<RutaProtegida />}>
            <Route index element={<Comercial />} />
          </Route>

          {/* Rutas Contables */}
          <Route path="/contable" element={<RutaProtegida />}>
            <Route index element={<Contable />} />
          </Route>

          {/* Rutas para pruebas */}
          <Route path="/pruebas" element={<RutaProtegida />}>
            <Route index element={<Prueba />} />
          </Route>
        </>
      ) : auth.rol === "cliente" ? (
        <Route path="/inicio" element={<RutaProtegida />}>
          <Route index element={<PaginaClientes />} />
        </Route>
      ) : auth.rol === "proveedor" ? (
        <Route path="/inicio" element={<RutaProtegida />}>
          <Route index element={<PaginaProveedores />} />
        </Route>
      ) : (
        ""
      )}
    </Routes>
  );
}

export default App;

import { Typography, Button } from "@material-tailwind/react";
import useServicios from "@/hooks/useServicios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import useContable from "@/hooks/useContable";
import ContableEditarConcepto from "./ContableEditarConcepto";
import ConceptosAFacturarContableFicha from "./ConceptosAFacturarContableFicha";
import ValorizacionViajeDesdeFicha from "./ValorizacionViajeDesdeFicha";
import FacturasEmitidasServicioFicha from "./FacturasEmitidasServicioFicha";
import ModalAgregarConcepto from "./ModalAgregarConcepto";
import Swal from "sweetalert2";

const ContableFicha = () => {
  const {
    idObtenerServicio,
    handleCargando,
    obtenerConceptos,
    actualizoConceptos,
    setActualizoConceptos,
    seActualizaConceptos,
    setSeActualizaConceptos,
    estadoObtenerServicio,
    obtenerServicio,
  } = useServicios();

  const {
    crearFactura,
    editarConcepto,
    obtenerFacturaEmit,
    obtenerFacturaEmitida,
    handleAgregarConcepto,
    agregarConcepto,
  } = useContable();

  useEffect(() => {
    const obtenerCons = async () => {
      handleCargando();
      await obtenerFacturaEmitida(idObtenerServicio);
      handleCargando();
    };
    obtenerCons();
  }, []);

  useEffect(() => {
    const obtenerFactu = async () => {
      handleCargando();

      await obtenerConceptos(idObtenerServicio);
      handleCargando();
    };
    obtenerFactu();
  }, []);

  useEffect(() => {
    const obtenerCons = async () => {
      if (actualizoConceptos) {
        handleCargando();
        await obtenerConceptos(idObtenerServicio);
        handleCargando();
        setActualizoConceptos(false);
      }
    };
    obtenerCons();
  }, [actualizoConceptos]);

  useEffect(() => {
    const obtenerCons = async () => {
      if (seActualizaConceptos) {
        handleCargando();
        await obtenerFacturaEmitida(idObtenerServicio);
        handleCargando();
        setActualizoConceptos(false);
      }
    };
    obtenerCons();
  }, [seActualizaConceptos]);

  useEffect(() => {
    const actualizar = async () => {
      handleCargando();
      await obtenerServicio(idObtenerServicio);
      setActualizoConceptos(false);
      handleCargando();
    };
    actualizar();
  }, [actualizoConceptos]);

  useEffect(() => {
    const obtenerCons = async () => {
      if (seActualizaConceptos) {
        handleCargando();
        await obtenerConceptos(idObtenerServicio);
        handleCargando();
        setSeActualizaConceptos(false);
      }
    };
    obtenerCons();
  }, [seActualizaConceptos]);

  const facturar = async (e) => {
    e.preventDefault();
    if (estadoObtenerServicio !== "Por Facturar") {
      return toast.error(
        "Para facturar, el servicio tiene que tener estado -Por Facturar-",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
    Swal.fire({
      title: "CONFIRMAR",
      text: "Emitimos la factura?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await crearFactura(idObtenerServicio);
        setSeActualizaConceptos(true);
        handleCargando();
      } else {
      }
    });
  };

  const handleAgregarConcp = (e) => {
    e.preventDefault();
    handleAgregarConcepto();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="ml-4 mr-4 flex justify-between">
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-1 uppercase text-orange-600"
        >
          {obtenerFacturaEmit.length > 0
            ? "Servicio facurado - FC " + obtenerFacturaEmit[0].numeroFactura
            : ""}
        </Typography>
        <div>
          {estadoObtenerServicio === "Por Facturar" ? (
            <>
              <Button className="mr-5" onClick={(e) => handleAgregarConcp(e)}>
                Agregar Concepto
              </Button>
              <Button className="bg-green-700" onClick={(e) => facturar(e)}>
                Facturar
              </Button>
            </>
          ) : estadoObtenerServicio === "Facturado" ? (
            <Button disabled={true}>Facturar Complemento</Button>
          ) : (
            ""
          )}
        </div>
      </div>

      {obtenerFacturaEmit.length > 0 ? (
        <FacturasEmitidasServicioFicha />
      ) : (
        <>
          <ValorizacionViajeDesdeFicha />
          <ConceptosAFacturarContableFicha />
        </>
      )}

      {editarConcepto ? <ContableEditarConcepto /> : ""}
      {agregarConcepto ? <ModalAgregarConcepto /> : ""}
    </>
  );
};

export default ContableFicha;

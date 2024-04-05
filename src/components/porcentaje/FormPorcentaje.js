import React, { useState, useEffect } from "react";
import { CgAddR } from "react-icons/cg";

const FromPorcentaje = ({
  arregloAlmacenPorcentajeEfectivo,
  almacenPorcentEfectivo,
}) => {
  const [descuento, setDescuento] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);

  /* const traerPorcentajeEfectivo = almacenPorcentEfectivo.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );/*/

  useEffect(() => {
    // funcion para desactivar el input
    if (descuento > 0) {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  }, [almacenPorcentEfectivo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    arregloAlmacenPorcentajeEfectivo({ descuento });
    setDescuento("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="formulario">
        <label className="yellow">
          % Desc. Pago Efectivo
          <input
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            disabled={inputDisabled}
          />
        </label>

        <button
          type="submit"
          className="my-button_agregar"
          disabled={inputDisabled}
        >
          <CgAddR />
        </button>
      </form>
    </>
  );
};

export default FromPorcentaje;

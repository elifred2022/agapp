import React from "react";
import { useState, useEffect } from "react";

const CalcInformeFinal = ({
  dispatch,
  resultado,
  resultadoEfectivo,
  comidas,
  bebidas,
}) => {
  const [totalFinalGral, setTotalFinalGral] = useState(0);
  const [acumDebito, setAcumDebito] = useState(0);
  const [acumEfectivo, setAcumEfectivo] = useState(0);

  // funcion acumuladores
  const traerImporteDebito = resultado.reduce(
    (acc, elem) => acc + parseInt(elem.importePorPersonaDebitoRef.current),
    0
  );

  useEffect(() => {
    setAcumDebito(traerImporteDebito);
  }, [traerImporteDebito]);

  const traerImporteEfectivo = resultadoEfectivo.reduce(
    (acc, elem) => acc + parseInt(elem.importePorPersonaEfectivotoRef.current),
    0
  );

  useEffect(() => {
    setAcumEfectivo(traerImporteEfectivo);
  }, [traerImporteEfectivo]);

  return (
    <>
      <h3 className="yellow">
        Total general a pagar con debito: $ {acumDebito.toLocaleString()}
      </h3>
      <h3 className="yellow">
        Total general a pagar con efectivo: $ {acumEfectivo.toLocaleString()}
      </h3>
    </>
  );
};

export default CalcInformeFinal;

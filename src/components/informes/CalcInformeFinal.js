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
  const [acumTotal, setAcumTotal] = useState(0);

  // funcion acumuladores
  const traerImporteDebito = resultado.reduce(
    (acc, elem) => acc + parseInt(elem.importePorPersonaDebitoRef.current),
    0
  );
  /*
  useEffect(() => {
    setAcumDebito(traerImporteDebito);
  }, [traerImporteDebito]);*/

  const traerImporteEfectivo = resultadoEfectivo.reduce(
    (acc, elem) => acc + parseInt(elem.importePorPersonaEfectivotoRef.current),
    0
  );

  const calcTotalApagar =
    parseInt(traerImporteDebito) + parseInt(traerImporteEfectivo);

  function botonCalculoTotal() {
    setAcumDebito(traerImporteDebito);
    setAcumEfectivo(traerImporteEfectivo);
    setAcumTotal(calcTotalApagar);
  }

  return (
    <>
      <h3 className="yellow">Total debito: $ {acumDebito.toLocaleString()}</h3>
      <h3 className="yellow">
        Total efectivo: $ {acumEfectivo.toLocaleString()}
      </h3>
      <h3 className="yellow">
        Total general a pagar: $ {acumTotal.toLocaleString()}
      </h3>

      <button className="btn-calc" onClick={botonCalculoTotal}>
        Calcular totales
      </button>
    </>
  );
};

export default CalcInformeFinal;

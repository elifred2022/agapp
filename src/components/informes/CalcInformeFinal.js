import React from "react";
import { useState, useEffect } from "react";

const CalcInformeFinal = ({ dispatch, resultado, comidas, bebidas }) => {
  const [totalFinalGral, setTotalFinalGral] = useState(0);
  const [acumDebito, setAcumDebito] = useState(0);
  const [acumEfectivo, setAcumEfectivo] = useState(0);

  // funcion acumuladores

  const traerValoresDebito = resultado.reduce(
    (acc, elem) => acc + parseInt(elem.importePorPersonaDebitoRef),
    0
  );

  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setAcumDebito(traerValoresDebito);
  }, [traerValoresDebito]);

  const traerValoresEfectivo = resultado.reduce(
    (acc, elem) => (acc = parseInt(elem.importePorPersonaEfectivo)),
    0
  );

  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setAcumEfectivo(traerValoresEfectivo);
  }, [traerValoresEfectivo]);

  return (
    <>
      <h2 className="yellow">
        Total general a pagar con debito: ${" "}
        {traerValoresDebito.toLocaleString()}
      </h2>
    </>
  );
};

export default CalcInformeFinal;

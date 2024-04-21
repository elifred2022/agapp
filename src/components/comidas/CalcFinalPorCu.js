import React from "react";
import { useState, useEffect } from "react";

const CalcInformeFinal = ({ dispatch, resultado, comidas, bebidas }) => {
  const [totalFinalGral, setTotalFinalGral] = useState(0);

  const totalFinalGralString = totalFinalGral.toLocaleString();

  const trarMontoComidaPorPersona = comidas.reduce(
    (acc, elem) => (acc = parseInt(elem.ValorComida)),
    0
  );

  const trarMontoBebidaPorPersona = bebidas.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const totalPagarPorPersona =
    trarMontoComidaPorPersona + trarMontoBebidaPorPersona;

  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setTotalFinalGral(totalPagarPorPersona);

    dispatch({
      type: "AGREGAR_COMIDA",
      payload: { totalFinalGralString },
    });
  }, [totalFinal, totalFinalGral]);

  return (
    <h2 className="yellow">
      Total general a pagar: $ {totalFinalGral.toLocaleString()}
    </h2>
  );
};

export default CalcInformeFinal;

import React from "react";
import { useState, useEffect } from "react";

const CalcInformeFinal = ({
  dispatch,
  resultado,
  comidas,
  arregloAlmacentotalComidas,
}) => {
  const [totalFinalGral, setTotalFinalGral] = useState(0);

  const totalFinal = resultado.reduce(
    (acc, elem) => acc + parseInt(elem.resCu),
    0
  );
  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setTotalFinalGral(totalFinal);

    // arregloAlmacentotalComidas({ totalComidas, totalComidasGral });
  }, [totalFinal, totalFinalGral]);

  return (
    <h2 className="yellow">
      Total general a pagar: $ {totalFinalGral.toLocaleString()}
    </h2>
  );
};

export default CalcInformeFinal;

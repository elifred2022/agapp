import { useState, useEffect, useRef } from "react";

const TotalApagar = ({
  resultado,
  dispatch,
  bebidas,
  indicesComidas,
  comidas,
  montoBebidaCu,
}) => {
  const [totalImportePorPersona, setTotalImportePorPersona] = useState(0);

  const traerTotal = resultado.reduce((acc, elem) => {
    return acc + parseInt(elem.importePorPersona);
  }, 0);

  useEffect(() => {
    setTotalImportePorPersona(traerTotal);
  }, [traerTotal]);

  return (
    <>
      <div>
        <h2>Total a pagar: total bebidas + total comidas</h2>
        <p>${totalImportePorPersona}</p>
      </div>
    </>
  );
};

export default TotalApagar;

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
        <h2>Total a pagar: </h2>
        <p>$ falta funcion{/*totalImportePorPersona*/}</p>
      </div>
    </>
  );
};

export default TotalApagar;

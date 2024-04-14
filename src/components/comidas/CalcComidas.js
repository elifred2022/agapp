import React from "react";
import { useState, useEffect } from "react";

const TotalComidas = ({ comidas, dispatch }) => {
  const [totalComidasGral, setTotalComidasGral] = useState(0);

  const totalComidasGralString = totalComidasGral.toString();

  const totalComidas = comidas.reduce(
    (acc, elem) => acc + parseInt(elem.valorComida),
    0
  );
  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setTotalComidasGral(totalComidas);

    dispatch({
      type: "AGREGAR_MONTOTOTALCOMIDA",
      payload: { totalComidasGralString },
    });
  }, [totalComidasGralString, totalComidas]);

  return (
    <h3 className="yellow">
      Total general en comidas: $ {totalComidasGralString.toLocaleString()}
    </h3>
  );
};

export default TotalComidas;

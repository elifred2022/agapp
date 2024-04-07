import React from "react";
import { useState, useEffect } from "react";

const TotalComidas = ({ comidas, arregloAlmacentotalComidas }) => {
  const [totalComidasGral, setTotalComidasGral] = useState(0);

  const totalComidas = comidas.reduce(
    (acc, elem) => acc + parseInt(elem.valorComida),
    0
  );
  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setTotalComidasGral(totalComidas);

    // arregloAlmacentotalComidas({ totalComidas, totalComidasGral });
  }, [totalComidas, totalComidasGral]);

  return (
    <h3 className="yellow">
      Total general en comidas: $ {totalComidasGral.toLocaleString()}
    </h3>
  );
};

export default TotalComidas;

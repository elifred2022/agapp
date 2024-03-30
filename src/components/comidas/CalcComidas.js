import React from "react";
import { useState, useEffect } from "react";

const TotalComidas = ({ elementos, arregloAlmacentotalComidas }) => {
  const [totalComidasGral, setTotalComidasGral] = useState(0);

  const totalComidas = elementos.reduce(
    (acc, elem) => acc + parseInt(elem.valorComida),
    0
  );
  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setTotalComidasGral(totalComidas);

    // arregloAlmacentotalComidas({ totalComidas, totalComidasGral });
  }, [totalComidas, totalComidasGral]);

  return (
    <h2 className="yellow">
      Total general en comidas: $ {totalComidasGral.toLocaleString()}
    </h2>
  );
};

export default TotalComidas;

import React from "react";
import { useState, useEffect } from "react";

const CalcBebidas = ({
  dispatch,
  bebidas,
  indicesComidas,
  arregloAlmacentotalComidas,
}) => {
  const [totalBebidasGral, setTotalBebidasGral] = useState(0);
  const [totalBebidasCu, setTotalBebidaCu] = useState(0);

  const totalBebidasCuString = totalBebidasCu.toString(); // codigo para convertir el dato numerico a string

  const acumTotalBebidas = bebidas.reduce(
    (acc, elem) => acc + parseInt(elem.totalBebida),
    0
  );

  useEffect(() => {
    const totalAsistentes = indicesComidas.reduce(
      (acc, elem) => (acc = parseInt(elem.totalIndex)),
      0
    ); // quitando el + y dejando el = el contador de totalindex empieza en 1
    const totalBebidasCu1 =
      totalAsistentes > 0 ? acumTotalBebidas / totalAsistentes : 0; // asi co este codigo se evita inicializar en null totalAsistentes > 0 ? totalBebidas / totalAsistentes : 0;

    setTotalBebidaCu(parseInt(totalBebidasCu1)); // tolocalstring para unidades de miles
    // arregloCu({totalBebidasCu, totalBebidasTodas});

    setTotalBebidasGral(acumTotalBebidas);

    dispatch({ type: "AGREGAR_BEBIDACU", payload: totalBebidasCuString });

    // arregloAlmacentotalComidas({ totalComidas, totalComidasGral });
  }, [totalBebidasCu, totalBebidasGral, acumTotalBebidas, indicesComidas]);

  return (
    <>
      <h3 className="yellow">
        Total general en bebidas: $ {totalBebidasGral.toFixed(2)}
      </h3>
      <h3 className="yellow">
        Cada persona paga por bebidas: $ {totalBebidasCu.toFixed(2)}
      </h3>
    </>
  );
};

export default CalcBebidas;

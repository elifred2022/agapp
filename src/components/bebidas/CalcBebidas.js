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

    setTotalBebidaCu(totalBebidasCu1); // tolocalstring para unidades de miles
    // arregloCu({totalBebidasCu, totalBebidasTodas});

    setTotalBebidasGral(acumTotalBebidas);

    dispatch({ type: "AGREGAR_BEBIDACU", payload: totalBebidasCu });

    // arregloAlmacentotalComidas({ totalComidas, totalComidasGral });
  }, [totalBebidasCu, totalBebidasGral, acumTotalBebidas, indicesComidas]);

  return (
    <>
      <h2 className="yellow">
        Total general en bebidas: $ {totalBebidasGral.toLocaleString()}
      </h2>
      <h2 className="yellow">
        Cada persona paga por bebidas: $ {totalBebidasCu.toLocaleString()}
      </h2>
    </>
  );
};

export default CalcBebidas;

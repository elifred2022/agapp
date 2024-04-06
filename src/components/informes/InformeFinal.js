import { useState, useEffect } from "react";

export default function InformeFinal({
  state,
  dispatch,
  montoPorcentaje,
  onChangeComidas,
  onDeleteComidas,
  resultadoFinal,
}) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Importe plato</th>
            <th>Importe bebidas</th>
            <th>Paga en efectivo?</th>
            <th>Importe a pagar</th>
          </tr>
        </thead>
        <tbody>
          {state.comidas.map((comida, index) => (
            <Foods
              key={comida.id}
              comida={comida}
              onChangeComidas={onChangeComidas}
              onDelete={onDeleteComidas}
              state={state}
              index={index}
              dispatch={dispatch}
              bebidas={state.bebidas}
              indicesComidas={state.indicesComidas}
              montoPorcentaje={montoPorcentaje}
              resultadoFinal={resultadoFinal}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Foods({
  onChangeComidas,
  comida,
  index,
  bebidas,
  indicesComidas,
  montoPorcentaje,
  dispatch,
  resultadoFinal,
}) {
  const [isEfectivoCheck, setIsEfectivoCheck] = useState(false);
  const [resCu, setResCu] = useState("");
  const [totalBebidasCu, setTotalBebidaCu] = useState(0);

  useEffect(() => {
    dispatch({ type: "AGREGAR_RESULTADO", payload: { resCu } }); // aqui fue q pude pasar  el valor de resCu al state
  }, [resCu]);

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
  }, [totalBebidasCu, acumTotalBebidas, indicesComidas, resCu]);

  useEffect(() => {
    const pagoDebito = parseInt(comida.valorComida) + parseInt(totalBebidasCu);

    setResCu(pagoDebito.toFixed(2));
  }, [totalBebidasCu, acumTotalBebidas, indicesComidas]);

  useEffect(() => {
    const pagoDebito = parseInt(comida.valorComida) + parseInt(totalBebidasCu);

    setResCu(pagoDebito.toFixed(2));
  }, [totalBebidasCu, acumTotalBebidas, indicesComidas]);

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  const handleChangeModoPago = (checked) => {
    setIsEfectivoCheck(checked);

    if (checked) {
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);
      const pagoEfectivo =
        pagoDebito - (pagoDebito * traerPorcentajeEfectivo) / 100;

      setResCu(pagoEfectivo.toFixed(2));
    } else {
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);

      setResCu(pagoDebito.toFixed(2));
    }
  };

  let infoContent;
  infoContent = (
    <>
      <tr key={comida.id}>
        <td>{index + 1}.- </td>
        <td>{comida.nombre}</td>
        <td>$ {comida.valorComida}</td>
        <td>
          <p>$ {totalBebidasCu}</p>
        </td>
        <td>
          <div className="botonera">
            <input
              value={isEfectivoCheck}
              className="efectivo"
              type="checkbox"
              onChange={(e) => handleChangeModoPago(e.target.checked)}
              checked={isEfectivoCheck}
            />
            <p>Si</p>
          </div>
        </td>
        <td>
          <p> $ {resCu}</p>
        </td>
      </tr>
    </>
  );

  return <>{<>{infoContent}</>}</>;
}

import { useState, useEffect } from "react";

export default function InformeFinal({
  state,
  dispatch,
  montoPorcentaje,
  onChangeComidas,
  onDeleteComidas,
  resultado,
}) {
  const [totalFinalGral, setTotalFinalGral] = useState(0);

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
              comidas={state.comidas}
              indicesComidas={state.indicesComidas}
              montoPorcentaje={montoPorcentaje}
              resultado={state.resultado}
            />
          ))}
        </tbody>
      </table>
      <div>
        <h2 className="yellow">Total a pagar: </h2>
      </div>
    </>
  );
}

function Foods({
  state,
  onChangeComidas,
  comida,
  index,
  bebidas,
  comidas,
  indicesComidas,
  montoPorcentaje,
  dispatch,
  resultado,
}) {
  const [isEfectivoCheck, setIsEfectivoCheck] = useState(false);
  const [resCuDeb, setResCuDeb] = useState(0);
  const [resCuEfec, setResCuEfec] = useState(0);
  const [resCuStore, setResCuStore] = useState(0);
  const [totalBebidasCu, setTotalBebidaCu] = useState(0);
  const [totalComidasCu, setTotalComidasCu] = useState(0);

  const acumTotalBebidas = bebidas.reduce(
    (acc, elem) => acc + parseInt(elem.totalBebida),
    0
  );

  const acumTotalComidas = comidas.reduce(
    (acc, elem) => acc + parseInt(elem.valorComida),
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
  }, [totalBebidasCu, acumTotalBebidas, indicesComidas, resCuDeb, resCuEfec]);

  useEffect(() => {
    const pagoDebito = parseInt(comida.valorComida) + parseInt(totalBebidasCu);

    setResCuStore(pagoDebito.toFixed(2));
    dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
  }, [indicesComidas]);

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  const handleChangeModoPago = (checked) => {
    setIsEfectivoCheck(checked);

    if (checked) {
      // si paga en efectivo
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);
      const pagoEfectivo =
        pagoDebito - (pagoDebito * traerPorcentajeEfectivo) / 100;

      setResCuStore(pagoEfectivo.toFixed(2));
      dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
    } else {
      // si paga en debito
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);

      setResCuStore(pagoDebito.toFixed(2));
      dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
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
          <p>$ {totalBebidasCu.toFixed(2)}</p>
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
          <p> $ {resCuStore}</p>
        </td>
      </tr>
    </>
  );

  return <>{<>{infoContent}</>}</>;
}

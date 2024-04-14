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

  const traerResCuStore = resultado.reduce(
    (acc, elem) => acc + parseInt(elem.resCuStore),
    0
  );

  function incrementTotalFinalGral() {
    setTotalFinalGral((prevTotal) => (prevTotal = parseFloat(traerResCuStore)));
  }

  const handleIncrementTotal = () => {
    incrementTotalFinalGral();
  };

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
        <h2 className="yellow">Total a pagar: {totalFinalGral} </h2>
        <button onClick={handleIncrementTotal}>Increment Total</button>
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
  montoBebidaCu,
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

  const totalBebidasCuString = totalBebidasCu.toString();

  const acumTotalBebidas = bebidas.reduce(
    (acc, elem) => acc + parseInt(elem.totalBebidasString),
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
  }, [totalBebidasCu, acumTotalBebidas, indicesComidas, resCuEfec, resCuDeb]);

  useEffect(() => {
    const pagoDebito =
      parseInt(comida.valorComida) + parseInt(totalBebidasCuString);

    setResCuStore(pagoDebito.toFixed(2));
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { resCuStore, totalBebidasCuString },
    });
  }, [montoPorcentaje, bebidas]); //totalBebidasCu

  const handleChangeModoPago = (checked, resCuStore) => {
    setIsEfectivoCheck(checked);

    if (checked) {
      // si paga en efectivo
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCuString);

      let pagoEfectivo = 0;

      if (traerPorcentajeEfectivo > 0) {
        pagoEfectivo =
          pagoDebito - (pagoDebito * traerPorcentajeEfectivo) / 100;
        setResCuStore(pagoEfectivo.toFixed(2));
        dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
      } else {
        alert("Debe ingresar porcentaje");
        setIsEfectivoCheck(false);
      }
    } else {
      // si paga en debito

      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);

      setResCuStore(pagoDebito.toFixed(2));
      dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
    }
  };

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  let infoContent;
  infoContent = (
    <>
      <tr key={comida.id}>
        <td>{index + 1}.- </td>
        <td>{comida.nombre}</td>
        <td>$ {comida.valorComida}</td>
        <td>
          <p>{} </p>
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

// OJO  ESTE CODIGO ABAJO ES PARA MODAL EDITING
/*
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function InformeFinal({
  state,
  dispatch,
  montoPorcentaje,
  onChangeComidas,
  onDeleteComidas,
  resultado,
  resCuStore,
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
        <button>Calcular pago total</button>
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
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const totalAsistentes = indicesComidas.reduce(
      (acc, elem) => (acc = parseInt(elem.totalIndex)),
      0
    ); // quitando el + y dejando el = el contador de totalindex empieza en 1
    const totalBebidasCu1 =
      totalAsistentes > 0 ? acumTotalBebidas / totalAsistentes : 0; // asi co este codigo se evita inicializar en null totalAsistentes > 0 ? totalBebidas / totalAsistentes : 0;

    setTotalBebidaCu(totalBebidasCu1); // tolocalstring para unidades de miles
  }, [totalBebidasCu, acumTotalBebidas, indicesComidas, resCuEfec, resCuDeb]);

  const uniqueId = uuidv4();

  useEffect(() => {
    const pagoDebito = parseInt(comida.valorComida) + parseInt(totalBebidasCu);

    setResCuDeb(pagoDebito.toFixed(2));
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { id: uniqueId, resCuDeb },
    });
  }, [montoPorcentaje, totalBebidasCu]); //totalBebidasCu

  const handleChangeModoPago = (checked) => {
    setIsEfectivoCheck(checked);

    if (checked) {
      // si paga en efectivo
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);

      let pagoEfectivo = 0;

      if (traerPorcentajeEfectivo > 0) {
        pagoEfectivo =
          pagoDebito - (pagoDebito * traerPorcentajeEfectivo) / 100;
        setResCuEfec(pagoEfectivo.toFixed(2));
        dispatch({
          type: "AGREGAR_RESULTADO",
          payload: { resCuEfec },
        });
      } else {
        alert("Debe ingresar porcentaje");
        setIsEfectivoCheck(false);
      }
    } else {
      // si paga en debito
      const pagoDebito =
        parseInt(comida.valorComida) + parseInt(totalBebidasCu);

      setResCuDeb(pagoDebito.toFixed(2));
      dispatch({
        type: "AGREGAR_RESULTADO",
        payload: { resCuDeb },
      });
    }
  };

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  let informeFianl;

  if (isEditing) {
    informeFianl = (
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
                onChange={
                  (e) =>
                    setIsEditing(
                      false
                    ) 
                }
                checked={isEfectivoCheck}
              />
              <p>Si</p>
            </div>
          </td>
          <td>
            <p> $ {resCuEfec}</p>
          </td>
        </tr>
      </>
    );
  } else {
    informeFianl = (
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
                onChange={
                  (e) => setIsEditing(true) //handleChangeModoPago(e.target.checked)
                }
                checked={isEfectivoCheck}
              />
              <p>Si</p>
            </div>
          </td>
          <td>
            <p> $ {resCuDeb}</p>
          </td>
        </tr>
      </>
    );
  }

  return <>{<>{informeFianl}</>}</>;
}*/

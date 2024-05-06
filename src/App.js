import { useReducer, useEffect, useState } from "react";
import Reducer, { initialState } from "./reducer/Reducer.js";
import Header from "./components/header/Header.js";
import FormComidas from "./components/comidas/FormComidas.js";
import ListaComidas from "./components/comidas/ListaComidas.js";
import CalcComidas from "./components/comidas/CalcComidas.js";
import FormBebidas from "./components/bebidas/FormBebidas.js";
import ListaBebidas from "./components/bebidas/ListaBebidas.js";
import CalcBebidas from "./components/bebidas/CalcBebidas.js";
import InformeFinal from "./components/informes/InformeFinal.js";
import CalcInformeFinal from "./components/informes/CalcInformeFinal.js";
import FormPorcentaje from "./components/porcentaje/FormPorcentaje.js";
import ListaPorcentaje from "./components/porcentaje/ListaPorcentaje.js";
import TotalApagar from "./components/comidas/TotalApagar.js";

export default function TaskApp() {
  const storedAlmacenPorcentajeEfectivo =
    JSON.parse(localStorage.getItem("almacenPorcentEfectivo")) || [];

  const [storedState, setStoredState] = useState(() => {
    // funcion para recuperar datos del localstorage del state general
    const stored = JSON.parse(localStorage.getItem("state"));
    return stored || initialState;
  });

  const [state, dispatch] = useReducer(Reducer, storedState);

  const [almacenPorcentEfectivo, setAlmacenPorcentEfectivo] = useState(
    storedAlmacenPorcentajeEfectivo
  );

  useEffect(() => {
    // funcion para enviar los datos del state general al localstorage
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  /* ESTE REDUCER LO ESTOY PASANDO CON DISPATCH EN EL componente FormComidas
  function handleAddComidas(index, nombre, comida, valorComida) {
    dispatch({
      type: "AGREGAR_COMIDA",

      payload: { id: index, nombre, comida, valorComida },
    });
  } */

  // FUNCION PARA RESETEAR EL RESULTADO
  const [resetResults, setResetResults] = useState(false);
  const [resetStateRender, setResetStateRender] = useState(false);

  useEffect(() => {
    if (resetResults) {
      window.location.reload();
    }
  }, [resetResults]);

  useEffect(() => {
    if (resetStateRender) {
      window.location.reload();
    }
  }, [resetStateRender]);
  /////////////////////////////////////////////////////////////////////

  function handleChangeComidas(comidaId) {
    dispatch({
      type: "EDITAR_COMIDA",
      payload: comidaId,
    });
  }

  function handleDeleteComidas(comidasId) {
    dispatch({
      type: "ELIMINAR_COMIDA",
      id: comidasId,
    });
  }

  function handleChangeBebidas(bebidaId) {
    dispatch({
      type: "EDITAR_BEBIDA",
      payload: bebidaId,
    });
  }

  function handleDeleteBebidas(bebidasId) {
    dispatch({
      type: "ELIMINAR_BEBIDA",
      id: bebidasId,
    });
  }

  function handleChangePorcentaje(porcent) {
    dispatch({
      type: "EDITAR_PORCENTAJE",
      payload: porcent,
    });
  }

  function resetState() {
    dispatch({ type: "RESET" });
  }

  function resetResultado() {
    dispatch({ type: "RESET_RESULTADOS" });
  }

  return (
    <>
      <Header />

      <main>
        <h2 className="verde">Ingrese asistentes y consumo individual</h2>
        <FormComidas
          dispatch={dispatch}
          montoBebidaCu={state.montoBebidaCu}
          comidas={state.comidas}
          state={state}
        />
        <ListaComidas
          state={state}
          dispatch={dispatch}
          onDeleteComidas={handleDeleteComidas}
          onChangeComidas={handleChangeComidas}
          montoBebidaCu={state.montoBebidaCu}
          montoComidaGral={state.montoComidaGral}
          montoPorcentaje={state.montoPorcentaje}
          resultado={state.resultado}
          comidas={state.comidas}
        />
        <CalcComidas
          comidas={state.comidas}
          dispatch={dispatch}
          montoComidaGral={state.montoComidaGral}
        />

        <h2 className="verde">Ingrese bebidas y consumo compartido</h2>
        <FormBebidas dispatch={dispatch} />
        <ListaBebidas
          state={state}
          dispatch={dispatch}
          onChangeBebidas={handleChangeBebidas}
          onDeleteBebidas={handleDeleteBebidas}
        />
        <CalcBebidas
          indicesComidas={state.indicesComidas}
          bebidas={state.bebidas}
          dispatch={dispatch}
          state={state}
        />
        <h2 className="verde">Ingrese porcentaje de descuento</h2>
        <FormPorcentaje
          dispatch={dispatch}
          montoPorcentaje={state.montoPorcentaje}
        />
        <ListaPorcentaje
          state={state}
          montoPorcentaje={state.montoPorcentaje}
          dispatch={dispatch}
          resultadoFinal={state.resultadoFinal}
          onChangePorcentaje={handleChangePorcentaje}
        />
        <h2 className="verde">Informe final</h2>
        <h3 className="red">
          Por favor, solo use esta seccion si ya termino de cargar todo el
          consumo.
        </h3>
        <InformeFinal
          state={state}
          dispatch={dispatch}
          onDeleteComidas={handleDeleteComidas}
          onChangeComidas={handleChangeComidas}
          montoBebidaCu={state.montoBebidaCu}
          montoComidaGral={state.montoComidaGral}
          montoPorcentaje={state.montoPorcentaje}
          resultado={state.resultado}
          resultadoEfectivo={state.resultadoEfectivo}
          comidas={state.comidas}
        />
        <CalcInformeFinal
          comidas={state.comidas}
          cuantoPago={state.cuantoPago}
          montoTotal={state.total}
          dispatch={dispatch}
          state={state}
          resultado={state.resultado}
          resultadoEfectivo={state.resultadoEfectivo}
        />
        <button
          className="btn-calc"
          onClick={() => {
            if (window.confirm("¿Estás seguro de borrar calculo?")) {
              resetResultado();
              setResetResults(true);
            }
          }}
        >
          Reset resultados
        </button>

        <button
          className="btn-calc"
          onClick={() => {
            if (window.confirm("¿Estás seguro de borrar todo?")) {
              resetState();
              setResetStateRender(true);
            }
          }}
        >
          Limpiar todo
        </button>
      </main>
    </>
  );
}

let nextId = 0;

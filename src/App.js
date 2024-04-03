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

export default function TaskApp() {
  const [storedState, setStoredState] = useState(() => {
    // funcion para recuperar datos del localstorage del state general
    const stored = JSON.parse(localStorage.getItem("state"));
    return stored || initialState;
  });

  const [state, dispatch] = useReducer(Reducer, storedState);

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

  return (
    <>
      <Header />

      <main>
        <h2 className="verde">Ingrese asistentes y consumo individual</h2>
        <FormComidas dispatch={dispatch} />
        <ListaComidas
          state={state}
          dispatch={dispatch}
          onDeleteComidas={handleDeleteComidas}
          onChangeComidas={handleChangeComidas}
        />
        <CalcComidas comidas={state.comidas} />
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
        <h2 className="verde">Informe Final</h2>
        <p>Porcentaje; 15%</p>
        <InformeFinal
          state={state}
          montoBebidaCu={state.montoBebidaCu}
          dispatch={dispatch}
          bebidas={state.bebidas}
          indicesComidas={state.indicesComidas}
        />
      </main>
    </>
  );
}

let nextId = 0;

/*const initialState = {
  comidas: [],
  bebidas: [],
};*/

//const initialState = JSON.parse(localStorage.getItem("state")) || [];

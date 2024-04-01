import { useReducer, useEffect, useState } from "react";
import Reducer from "./reducer/Reducer.js";
import Header from "./components/header/Header.js";
import FormComidas from "./components/comidas/FormComidas.js";
import ListaComidas from "./components/comidas/ListaComidas.js";
import CalcComidas from "./components/comidas/CalcComidas.js";
import FormBebidas from "./components/bebidas/FormBebidas.js";
import ListaBebidas from "./components/bebidas/ListaBebidas.js";

export default function TaskApp() {
  const storedComidas = JSON.parse(localStorage.getItem("state")) || [];

  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    // Almacena los elementos en localStorage cada vez que cambien
    localStorage.setItem("comidas", JSON.stringify(state));
  }, [state]);

  // nno se estan usando estas funciones, estoy usando el dispatch de reducer en los compnentes
  function handleAddComidas(nombre, comida, valorComida) {
    dispatch({
      type: "AGREGAR_COMIDA",
      payload: { id: nextId++, nombre, comida, valorComida },
    });
  }

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

  return (
    <>
      <Header />

      <main>
        <h1 className="verde">Ingrese asistentes y consumo individual</h1>
        <FormComidas dispatch={dispatch} />
        <ListaComidas
          state={state}
          dispatch={dispatch}
          onAddComidas={handleAddComidas}
          onDeleteComidas={handleDeleteComidas}
          onChangeComidas={handleChangeComidas}
        />
        <CalcComidas comidas={state.comidas} />
      </main>
    </>
  );
}

let nextId = 0;
const initialState = {
  comidas: [],
  bebidas: [],
};

//const initialState = JSON.parse(localStorage.getItem("state")) || [];

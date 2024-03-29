import { useReducer, useEffect, useState } from "react";
import FormComidas from "./components/comidas/FormComidas.js";
import ListaComidas from "./components/comidas/ListaComidas.js";
import Reducer from "./reducer/Reducer.js";
import Header from "./components/header/Header.js";

export default function TaskApp() {
  // const storedElementos = JSON.parse(localStorage.getItem("elementos")) || [];

  const [elementos, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    // Almacena los elementos d comida en localStorage cada vez que cambien
    localStorage.setItem("elementos", JSON.stringify(elementos));
  }, [elementos]);

  function handleAddTask(nombre, comida, valorComida) {
    dispatch({
      type: "added",
      id: nextId++,
      nombre: nombre,
      comida: comida,
      valorComida: valorComida,
    });
  }

  function handleChangeTask(elementos) {
    dispatch({
      type: "changed",
      elementos: elementos,
    });
  }

  function handleDeleteTask(elementosId) {
    dispatch({
      type: "deleted",
      id: elementosId,
    });
  }

  return (
    <>
      <Header />
      <h1 className="verde">Ingrese asistentes y consumo individual</h1>
      <FormComidas onAddTask={handleAddTask} />
      <ListaComidas
        elementos={elementos}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 0;
const initialState = JSON.parse(localStorage.getItem("elementos")) || [];

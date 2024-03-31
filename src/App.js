import { useReducer, useEffect, useState } from "react";
import Reducer from "./reducer/Reducer.js";
import Header from "./components/header/Header.js";
import FormComidas from "./components/comidas/FormComidas.js";
import ListaComidas from "./components/comidas/ListaComidas.js";
import CalcComidas from "./components/comidas/CalcComidas.js";
import FormBebidas from "./components/bebidas/FormBebidas.js";
import ListaBebidas from "./components/bebidas/ListaBebidas.js";

export default function TaskApp() {
  // const storedElementos = JSON.parse(localStorage.getItem("elementos")) || [];

  const [foods, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    // Almacena los elementos d comida en localStorage cada vez que cambien
    localStorage.setItem("elementos", JSON.stringify(foods));
  }, [foods]);

  function handleAddFoods(nombre, comida, valorComida) {
    dispatch({
      type: "food_added",
      id: nextId++,
      nombre: nombre,
      comida: comida,
      valorComida: valorComida,
    });
  }

  function handleChangeFoods(foods) {
    dispatch({
      type: "food_changed",
      foods: foods,
    });
  }

  function handleDeleteFoods(foodsId) {
    dispatch({
      type: "food_deleted",
      id: foodsId,
    });
  }

  return (
    <>
      <Header />

      <main>
        <h1 className="verde">Ingrese asistentes y consumo individual</h1>
        <FormComidas onAddFoods={handleAddFoods} />
        <ListaComidas
          foods={foods}
          onChangeFoods={handleChangeFoods}
          onDeleteFoods={handleDeleteFoods}
        />
        <CalcComidas foods={foods} />
      </main>
    </>
  );
}

let nextId = 0;
const initialState = JSON.parse(localStorage.getItem("elementos")) || [];

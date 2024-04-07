import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaComidas({
  state,
  dispatch,
  onChangeComidas,
  onDeleteComidas,
}) {
  const [totalIndex, setTotalIndex] = useState(state.comidas.length);

  useEffect(() => {
    dispatch({ type: "AGREGAR_INDICE", payload: { totalIndex } }); // aqui fue q pude pasar  el valor de totalIndex al padre en el estado de indice en App
  }, [totalIndex]);

  useEffect(() => {
    setTotalIndex(state.comidas.length);
  }, [state.comidas]);

  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Plato</th>
            <th>Valor/plato</th>
            <th>Act.</th>
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
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Foods({ onChangeComidas, comida, index, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);

  let foodContent;
  if (isEditing) {
    foodContent = (
      <>
        <tr className="formulario">
          <td>{index + 1}.-</td>
          <td>
            <input
              value={comida.nombre}
              onChange={(e) => {
                onChangeComidas({
                  type: "EDITAR_COMIDA",
                  ...comida,
                  nombre: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={comida.comida}
              onChange={(e) => {
                onChangeComidas({
                  type: "EDITAR_COMIDA",
                  ...comida,
                  comida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={comida.valorComida}
              onChange={(e) => {
                onChangeComidas({
                  type: "EDITAR_COMIDA",
                  ...comida,
                  valorComida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <button
              className="my-button_agregar"
              onClick={() => setIsEditing(false)}
            >
              <BiSolidSave />
            </button>
          </td>
        </tr>
      </>
    );
  } else {
    foodContent = (
      <>
        <tr key={comida.id}>
          <td>{index + 1}.- </td>
          <td>{comida.nombre}</td>
          <td>{comida.comida}</td>
          <td>${comida.valorComida}</td>

          <td>
            <div className="botonera">
              <button
                className="my-button_editar"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
              </button>

              <button
                className="my-button_eliminar"
                onClick={() =>
                  dispatch({ type: "ELIMINAR_COMIDA", payload: comida })
                }
              >
                <MdAutoDelete />
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{foodContent}</>}</>;
}

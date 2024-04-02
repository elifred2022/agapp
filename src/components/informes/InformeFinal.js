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
  //const [totalIndex, setTotalIndex] = useState(state.comidas.length);

  /* useEffect(() => {
    dispatch({ type: "AGREGAR_INDICE", payload: { totalIndex } }); // aqui fue q pude pasar  el valor de totalIndex al padre en el estado de indice en App
  }, [totalIndex]);

  useEffect(() => {
    setTotalIndex(state.comidas.length);
  }, [state.comidas]); */

  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Importe plato</th>
            <th>Importe bebidas</th>
            <th>Importe si paga en debito</th>
            <th>Importe si paga en efectivo</th>
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

function Foods({
  onChangeComidas,
  comida,
  index,
  dispatch,
  state,
  montoBebidaCu,
}) {
  const [isEditing, setIsEditing] = useState(false);

  let foodContent;
  if (isEditing) {
    foodContent = (
      <>
        <tr>
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
          <td>${comida.valorComida}</td>

          <td>
            <p>aca debe ir importe de bebidas cu</p>
          </td>
          <td>
            <p>boton select efec/debit</p>
          </td>
          <td>
            <p>importe a pagar</p>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{foodContent}</>}</>;
}

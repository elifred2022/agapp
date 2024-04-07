import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaBebidas({
  state,
  dispatch,
  onChangeBebidas,
  onDeleteBebidas,
}) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Bebida</th>
            <th>Cantidad</th>
            <th>Valor bebida</th>
            <th>Total bebida</th>
            <th>Act.-</th>
          </tr>
        </thead>
        <tbody>
          {state.bebidas.map((bebida, index) => (
            <Bebidas
              key={bebida.id}
              bebida={bebida}
              onChangeBebidas={onChangeBebidas}
              onDelete={onDeleteBebidas}
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

function Bebidas({ state, bebidas, onChangeBebidas, bebida, index, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [totalBebida, setTotalBebida] = useState(bebida.totalBebida);

  useEffect(() => {
    if (bebida.cantidadBebida && bebida.valorUnitBebida) {
      setTotalBebida(
        parseFloat(bebida.cantidadBebida) * parseFloat(bebida.valorUnitBebida)
      );
    } else {
      setTotalBebida("");
    }

    onChangeBebidas({
      type: "EDITAR_BEBIDA",
      ...bebida,
      totalBebida: totalBebida,
    });
  }, [isEditing, totalBebida]);

  let drinkContent;
  if (isEditing) {
    drinkContent = (
      <>
        <tr className="formulario">
          <td>{index + 1}.-</td>
          <td>
            <input
              value={bebida.bebida}
              onChange={(e) => {
                onChangeBebidas({
                  type: "EDITAR_BEBIDA",
                  ...bebida,
                  bebida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={bebida.cantidadBebida}
              onChange={(e) => {
                onChangeBebidas({
                  type: "EDITAR_BEBIDA",
                  ...bebida,
                  cantidadBebida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={bebida.valorUnitBebida}
              onChange={(e) => {
                onChangeBebidas({
                  type: "EDITAR_BEBIDA",
                  ...bebida,
                  valorUnitBebida: e.target.value,
                });
              }}
            />
          </td>
          <td>{totalBebida}</td>
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
    drinkContent = (
      <>
        <tr>
          <td>{index + 1}.- </td>
          <td>{bebida.bebida}</td>
          <td>{bebida.cantidadBebida}</td>
          <td>${bebida.valorUnitBebida}</td>
          <td>{totalBebida}</td>

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
                  dispatch({ type: "ELIMINAR_BEBIDA", payload: bebida })
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
  return <>{<>{drinkContent}</>}</>;
}

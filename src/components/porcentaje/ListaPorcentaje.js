import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaComidas({ state, dispatch, onChangePorcentaje }) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>% descuento por pago efectivo</th>
            <th>Act.</th>
          </tr>
        </thead>
        <tbody>
          {state.montoPorcentaje.map((porcent, index) => (
            <Porcentaje
              key={porcent.id}
              porcent={porcent}
              state={state}
              index={index}
              dispatch={dispatch}
              montoPorcentaje={state.montoPorcentaje}
              onChangePorcentaje={onChangePorcentaje}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Porcentaje({
  dispatch,
  porcent,
  index,
  descuento,
  bebidas,
  indicesComidas,
  onChangePorcentaje,
}) {
  const [isEditing, setIsEditing] = useState(false);

  let porcentContent;
  if (isEditing) {
    porcentContent = (
      <>
        <tr className="formulario">
          <td>{index + 1}.-</td>
          <td>
            <input
              value={porcent.descuento}
              onChange={(e) => {
                onChangePorcentaje({
                  type: "EDITAR_PORCENTAJE",
                  ...porcent,
                  descuento: e.target.value,
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
    porcentContent = (
      <>
        <tr key={porcent.id}>
          <td>{porcent.descuento}</td>

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
                  dispatch({ type: "ELIMINAR_PORCENTAJE", payload: porcent })
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

  return <>{<>{porcentContent}</>}</>;
}

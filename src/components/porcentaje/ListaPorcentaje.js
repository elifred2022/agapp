import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaComidas({ state, dispatch }) {
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
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Porcentaje({ dispatch, porcent, index, bebidas, indicesComidas }) {
  let porcentContent;
  porcentContent = (
    <>
      <tr key={porcent.id}>
        <td>{porcent.descuento}</td>
        <td>
          <div className="botonera">
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

  return <>{<>{porcentContent}</>}</>;
}

import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaComidas({
  state,
  dispatch,
  onChangeComidas,
  onDeleteComidas,
  montoBebidaCu,
  montoComidaGral,
}) {
  const [totalIndex, setTotalIndex] = useState(state.comidas.length);

  useEffect(() => {
    dispatch({ type: "AGREGAR_INDICE", payload: { totalIndex } }); // aqui fue q pude pasar  el valor de totalIndex al padre en el estado de indice en App
  }, [totalIndex]);

  useEffect(() => {
    setTotalIndex(state.comidas.length);
  }, [state.comidas]);

  const traerMontoGralComida = montoComidaGral.reduce(
    (acc, elem) => (acc = parseInt(elem.totalComidasGralString)),
    0
  );

  const traerMontoGralBebida = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasGralString)),
    0
  );

  const calcTotalFinalGral =
    parseInt(traerMontoGralComida) + parseInt(traerMontoGralBebida);

  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Plato</th>
            <th>Valor/plato</th>
            <th>Importe por bebida</th>
            <th>Importe total</th>
            <th>Edit/Elim</th>
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
              montoBebidaCu={montoBebidaCu}
            />
          ))}
        </tbody>
        <br></br>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Totales</th>
            <th>$ {traerMontoGralComida} </th>
            <th>$ {traerMontoGralBebida}</th>
            <th> $ {calcTotalFinalGral} </th>
            <th> </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

function Foods({
  onChangeComidas,
  comida,
  index,
  dispatch,
  montoBebidaCu,
  bebidas,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [importePorPersona, setImportePorPersona] = useState(0);

  const importePorPersonaString = importePorPersona.toString();

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const calcImportePorPersona =
    parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

  useEffect(() => {
    setImportePorPersona(calcImportePorPersona);
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { importePorPersonaString },
    }); // aqui fue q pude pasar  el valor de totalIndex al padre en el estado de indice en App
  }, [importePorPersona]);

  let foodContent;
  if (isEditing) {
    foodContent = (
      <>
        <tr key={comida.id}>
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
          <td>${traerTotalBebidasCu}</td>
          <td>${calcImportePorPersona}</td>
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
          <td>${traerTotalBebidasCu}</td>
          <td>${calcImportePorPersona}</td>

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

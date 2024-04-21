import { useState, useEffect, useRef } from "react";
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
  montoPorcentaje,
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
            <th>Paga en efectivo?</th>
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
              montoPorcentaje={montoPorcentaje}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function Foods({
  onChangeComidas,
  comida,
  index,
  dispatch,
  montoBebidaCu,
  montoPorcentaje,
  bebidas,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [importePorPersona, setImportePorPersona] = useState(0);
  const [importePorPersonaChecked, setImportePorPersonaChecked] =
    useState(importePorPersona);

  // PARA QUE SE ACTUALICE AL MISMO TIEMPO LA INTERFACE Y EL LOCALSOTRAGE valor de imorteporpersona
  const importePorPersonaCheckedRef = useRef(importePorPersonaChecked); // SE USA EL HOOKS DE useRef para que la intarface y el localstorage se actualicen al mismp tiempo

  const importePorPersonaCheckedString = importePorPersonaChecked.toString();

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const calcImportePorPersona =
    parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

  useEffect(() => {
    setImportePorPersona(
      (importePorPersonaCheckedRef.current = calcImportePorPersona.toFixed(2))
    );
  }, [calcImportePorPersona]);

  useEffect(() => {
    setImportePorPersonaChecked(
      (importePorPersonaCheckedRef.current = importePorPersona)
    );
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { importePorPersonaCheckedRef },
    }); // aqui fue q pude pasar  el valor de totalIndex al padre en el estado de indice en App
  }, [importePorPersona]);

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  const handleChangeModoPago = (checked) => {
    setIsChecked(checked);

    if (checked) {
      // si paga en efectivo
      const pagoDebito = calcImportePorPersona;

      let pagoEfectivo = 0;

      if (traerPorcentajeEfectivo > 0) {
        pagoEfectivo =
          pagoDebito - (pagoDebito * traerPorcentajeEfectivo) / 100;
        setImportePorPersona(
          (importePorPersonaCheckedRef.current = pagoEfectivo.toFixed(2))
        );

        //  dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
      } else {
        alert("Debe ingresar porcentaje");
        setIsChecked(false);
      }
    } else {
      // si paga en debito
      const pagoDebito = calcImportePorPersona;
      // parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

      setImportePorPersona(
        (importePorPersonaCheckedRef.current = pagoDebito.toFixed(2))
      );

      //  dispatch({ type: "AGREGAR_RESULTADO", payload: { resCuStore } });
    }
  };

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
          <td>${importePorPersonaChecked}</td>
          <td></td>
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
          <td>${importePorPersona}</td>
          <td>
            <div className="botonera">
              <input
                value={isChecked}
                className="efectivo"
                type="checkbox"
                onChange={(e) => handleChangeModoPago(e.target.checked)}
                checked={isChecked}
              />
            </div>
          </td>

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

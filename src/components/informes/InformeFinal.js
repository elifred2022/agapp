import { useState, useEffect, useRef } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";
import Toggle from "react-toggle";

export default function ListaComidas({
  state,
  dispatch,
  onChangeComidas,
  onDeleteComidas,
  montoBebidaCu,
  montoComidaGral,
  montoPorcentaje,
  resultado,
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
            <th>Pago?</th>
            <th>Nº</th>
            <th>Nombre</th>

            <th>Valor/plato</th>
            <th>Importe por bebida</th>
            <th>Importe total</th>
            <th>Forma de pago</th>
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
              resultado={resultado}
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
  state,
  resultado,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [importePorPersona, setImportePorPersona] = useState(0);
  const [importePorPersonaChecked, setImportePorPersonaChecked] = useState(0);

  // PARA QUE SE ACTUALICE AL MISMO TIEMPO LA INTERFACE Y EL LOCALSOTRAGE valor de imorteporpersona
  const importePorPersonaCheckedRef = useRef(importePorPersona); // SE USA EL HOOKS DE useRef para que la intarface y el localstorage se actualicen al mismp tiempo

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const calcImportePorPersona =
    parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

  useEffect(() => {
    setImportePorPersona(calcImportePorPersona);
  }, [calcImportePorPersona]);

  useEffect(() => {
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { importePorPersona },
    });
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
    }
  };

  // funcion del toggle switch

  //// FUNCION CHECKBOX PARA TACHAR LA LINEA

  const [checkedItems, setCheckedItems] = useState(false);
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
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
          <td>${importePorPersona}</td>
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
          <td>
            <label>
              <input
                type="checkbox"
                name="line"
                autoComplete="new-checkbox"
                checked={checkedItems.line || false}
                onChange={handleCheckboxChange}
              />
            </label>
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            {index + 1}.-{" "}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            {comida.nombre}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            ${comida.valorComida}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            ${traerTotalBebidasCu}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            ${importePorPersona}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            <div>
              <p>Debito / Efectivo</p>

              <label className="toggle-switch">
                <input
                  id="toggle-switch-input"
                  value={isChecked}
                  className="efectivo"
                  type="checkbox"
                  onChange={(e) => handleChangeModoPago(e.target.checked)}
                  checked={isChecked}
                />
                <span className="toggle-switch-slider"></span>
              </label>
            </div>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{foodContent}</>}</>;
}

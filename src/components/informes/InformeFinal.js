import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiSolidSave } from "react-icons/bi";

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
  const [importePorPersonaDebito, setImportePorPersonaDebito] = useState(0);
  const importePorPersonaDebitoString = importePorPersonaDebito.toString();
  const [importePorPersonaEfectivo, setImportePorPersonaEfectivo] = useState(0);
  const importePorPersonaEfectivoString = importePorPersonaEfectivo.toString();

  // PARA QUE SE ACTUALICE AL MISMO TIEMPO LA INTERFACE Y EL LOCALSOTRAGE valor de imorteporpersona
  const importePorPersonaDebitoRef = useRef(importePorPersonaDebito); // SE USA EL HOOKS DE useRef para que la intarface y el localstorage se actualicen al mismp tiempo
  const importePorPersonaEfectivotoRef = useRef(importePorPersonaEfectivo);

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const calcImportePorPersona =
    parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

  useEffect(() => {
    setImportePorPersonaDebito(
      (importePorPersonaDebitoRef.current = calcImportePorPersona.toFixed(2))
    );
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { importePorPersonaDebitoRef },
    });
  }, [calcImportePorPersona]);

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  const handleChangeModoPago = (checked) => {
    setIsChecked(checked);

    if (checked) {
      // si paga en efectivo
      const calcImportePorPersona =
        parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

      //const pagoDebito = importePorPersonaDebitoCheckedRef;

      let pagoEfectivo = 0;

      if (traerPorcentajeEfectivo > 0) {
        pagoEfectivo =
          calcImportePorPersona -
          (calcImportePorPersona * traerPorcentajeEfectivo) / 100;
        setImportePorPersonaEfectivo(
          (importePorPersonaEfectivotoRef.current = pagoEfectivo.toFixed(2))
        );
        dispatch({
          type: "AGREGAR_RESULTADO",
          payload: { importePorPersonaEfectivotoRef },
        });
      } else {
        alert("Debe ingresar porcentaje");
        setIsChecked(false);
      }
    } else {
      setImportePorPersonaDebito(
        (importePorPersonaDebitoRef.current = calcImportePorPersona.toFixed(2))
      );
    }
  };

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
  let modoPago;

  if (isChecked) {
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
            {importePorPersonaEfectivo}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            <div>
              <p>Deb / Efec</p>

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
            {importePorPersonaDebito}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            <div>
              <p>Deb / Efec</p>

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

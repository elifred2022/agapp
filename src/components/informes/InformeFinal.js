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
  resultadoEfectivo,
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
            <th>Cambio</th>
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
              resultadoEfectivo={resultadoEfectivo}
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
  resultadoEfectivo,
  handleClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [importePorPersonaDebito, setImportePorPersonaDebito] = useState(0);

  const [importePorPersonaEfectivo, setImportePorPersonaEfectivo] = useState(0);

  const [metodoPago, setMetodoPago] = useState("vacio");

  //const uniqueId = uuidv4();

  // PARA QUE SE ACTUALICE AL MISMO TIEMPO LA INTERFACE Y EL LOCALSOTRAGE valor de imorteporpersona
  const importePorPersonaDebitoRef = useRef(importePorPersonaDebito); // SE USA EL HOOKS DE useRef para que la intarface y el localstorage se actualicen al mismp tiempo

  const importePorPersonaEfectivotoRef = useRef(importePorPersonaEfectivo);

  // const importePorPersonaDebitoString = importePorPersonaDebitoRef.toString();

  // const importePorPersonaEfectivoString = importePorPersonaEfectivotoRef.toString();

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const traerPorcentajeEfectivo = montoPorcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  const calcImportePorPersona =
    parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

  const calcImportePorPersonaPorcentaje =
    (calcImportePorPersona * traerPorcentajeEfectivo) / 100;

  const cambioDebito = 0;

  function calcDebito() {
    let pagoDebito = 0;

    pagoDebito = calcImportePorPersona;

    setImportePorPersonaDebito(
      parseInt((importePorPersonaDebitoRef.current = pagoDebito))
    );
    dispatch({
      type: "AGREGAR_RESULTADO",
      payload: { importePorPersonaDebitoRef },
    });

    // update the comidas state with the new values valorBebidaCuString, and cambioString

    //const newNombre = comida.nombre;
    //const newComida = comida.comida;
    //const newValorComida = comida.valorComida;
    //const newValorBebidaCu = traerTotalBebidasCu;
    const newImporteTotalCu = calcImportePorPersona;
    const newCambioDebito = cambioDebito;
    const newFormaPago = "debito";
    // const newCambioString = 1;

    dispatch({
      type: "EDITAR_COMIDA",
      payload: {
        id: comida.id,
        nombre: comida.nombre,
        comida: comida.comida,
        valorComida: comida.valorComida,
        //valorBebidaCuString: montoBebidaCu.totalBebidasCuString,
        changes: {
          ...comida,

          valorBebidaCu: traerTotalBebidasCu,
          importeTotalCu: newImporteTotalCu,
          cambio: newCambioDebito,
          formaPago: newFormaPago,
        },
      },
    });
  }

  const cambioEfectivo = "formula de cambio";

  function calcEfectivo() {
    let pagoEfectivo = 0;

    if (traerPorcentajeEfectivo > 0) {
      let porcentaje = (calcImportePorPersona * traerPorcentajeEfectivo) / 100;

      pagoEfectivo = calcImportePorPersona - porcentaje;

      setImportePorPersonaEfectivo(
        parseInt((importePorPersonaEfectivotoRef.current = pagoEfectivo))
      );
      dispatch({
        type: "AGREGAR_RESULTADOEFECTIVO",
        payload: { importePorPersonaEfectivotoRef },
      });

      // UPDATE ESTADOS EFECTIVOS

      const newImporteTotalCuEfectivo =
        calcImportePorPersona - calcImportePorPersonaPorcentaje;
      const newCambioEfectivo = cambioEfectivo;
      const newFormaPagoEfectivo = "efectivo";

      dispatch({
        type: "EDITAR_COMIDA",
        payload: {
          id: comida.id,
          nombre: comida.nombre,
          comida: comida.comida,
          valorComida: comida.valorComida,

          changes: {
            ...comida,

            valorBebidaCu: traerTotalBebidasCu,
            importeTotalCuString: newImporteTotalCuEfectivo,
            cambio: newCambioEfectivo,
            formaPago: newFormaPagoEfectivo,
          },
        },
      });
    } else {
      alert("Debe ingresar porcentaje");
      setMetodoPago("vacio");
    }
  }

  const handleChangeModoPago = (event) => {
    const newMetodoPago = event.target.value; // asi se actualiza inmediatamente al sellecionar debito o efectivo
    setMetodoPago(newMetodoPago);

    switch (newMetodoPago) {
      case "debito":
        // si paga en debito

        calcDebito();

        break;
      case "efectivo":
        // si paga en efectivo

        calcEfectivo();

        break;
      default:
        break;
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

  if (metodoPago === "efectivo") {
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
            $ {traerTotalBebidasCu}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            $ {importePorPersonaEfectivo}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            {comida.cambio}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            <div>
              <td>
                <label>
                  <select
                    className="selector"
                    value={metodoPago}
                    onChange={handleChangeModoPago}
                  >
                    <option className="yellow" value="debito">
                      Débito
                    </option>
                    <option className="yellow" value="efectivo">
                      Efectivo
                    </option>
                  </select>
                </label>
              </td>
            </div>
          </td>
        </tr>
      </>
    );
  } else if (metodoPago === "debito") {
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
            $ {comida.valorComida}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            $ {traerTotalBebidasCu}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            $ {importePorPersonaDebito}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            $ {cambioDebito}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            <div>
              <td>
                <label>
                  <select
                    className="selector"
                    value={metodoPago}
                    onChange={handleChangeModoPago}
                  >
                    <option className="yellow" value="debito">
                      Débito
                    </option>
                    <option className="yellow" value="efectivo">
                      Efectivo
                    </option>
                  </select>
                </label>
              </td>
            </div>
          </td>
        </tr>
      </>
    );
  } else if (metodoPago === "vacio") {
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
            $ {traerTotalBebidasCu}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            $ {calcImportePorPersona}
          </td>
          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            {comida.cambio}
          </td>

          <td
            style={{
              textDecoration: checkedItems.line ? "line-through" : "none",
            }}
          >
            <div>
              <td>
                <label>
                  <select
                    className="selector"
                    value={metodoPago}
                    onChange={handleChangeModoPago}
                  >
                    <option className="yellow" value="vacio"></option>
                    <option className="yellow" value="debito">
                      Débito
                    </option>
                    <option className="yellow" value="efectivo">
                      Efectivo
                    </option>
                  </select>
                </label>
              </td>
            </div>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{foodContent} </>}</>;
}

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // biblioteca para generar ID unico
import { BiSolidSave } from "react-icons/bi";

export default function FormComidas({
  dispatch,
  index,
  state,
  montoBebidaCu,
  comidas,
  bebidas,
}) {
  const [nombre, setNombre] = useState("");
  const [comida, setComida] = useState("");
  const [valorComida, setValorComida] = useState("");
  const [valorBebidaCu, setValorBebidaCu] = useState(0);
  const valorBebidaCuString = valorBebidaCu.toString();
  const [importeTotalCu, setImporteTotalCu] = useState(0);
  const importeTotalCuString = importeTotalCu.toString();
  const [cambio, setCambio] = useState("");
  // const cambioString = cambio.toString();
  const [formaPago, setFormarPAgo] = useState("inicial");

  const uniqueId = uuidv4(); // gegera un unico ID

  const importePorPersonaDebitoRef = useRef(importeTotalCu);

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const traerValorComidaCu = comidas.reduce(
    (acc, elem) => (acc = parseInt(elem.valorComida)),
    0
  );

  const calcImportePorPersona = parseInt() + parseInt(traerTotalBebidasCu);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "AGREGAR_COMIDA",
        payload: {
          id: uniqueId,
          nombre,
          comida,
          valorComida,
          valorBebidaCu: valorBebidaCuString,
          importeTotalCu: importeTotalCuString,
          cambio,
          formaPago,
        }, // id: uniqueId genera id unico
      });
      setNombre("");
      setComida("");
      setValorComida("");
      setValorBebidaCu("");
      setImporteTotalCu("");
      setCambio("");
      setFormarPAgo("inicial");
    }
  };

  return (
    <>
      <div className="formulario">
        <input
          placeholder="Agregar nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          placeholder="Agregar comida"
          value={comida}
          onChange={(e) => setComida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Agregar costo comida"
          value={valorComida}
          onChange={(e) => setValorComida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="my-button_agregar"
          onClick={() => {
            dispatch({
              type: "AGREGAR_COMIDA",
              payload: {
                id: uniqueId,
                nombre,
                comida,
                valorComida,
                valorBebidaCu,
                importeTotalCu,
                cambio,
                formaPago,
              },
            });
            setNombre("");
            setComida("");
            setValorComida("");
            setValorBebidaCu("");
            setImporteTotalCu("");
            setCambio("");
            setFormarPAgo("");
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

let nextId = 0;

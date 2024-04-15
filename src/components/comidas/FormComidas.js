import { useState, useEffect } from "react";
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
  const [importePorBebida, setImportePorBebida] = useState("");
  const [importePorPersona, setImportePorPersona] = useState("");

  const importePorBebidaString = importePorBebida.toString();

  const importePorPersonaString = importePorPersona.toString();

  const uniqueId = uuidv4(); // gegera un unico ID

  const traerTotalBebidasCu = montoBebidaCu.reduce(
    (acc, elem) => (acc = parseInt(elem.totalBebidasCuString)),
    0
  );

  const traerValorComida = comidas.reduce(
    (acc, elem) => (acc = parseInt(elem.valorComida)),
    0
  );

  const calcImportePorPersona =
    parseInt(traerValorComida) + parseInt(traerTotalBebidasCu);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "AGREGAR_COMIDA",
        payload: {
          id: uniqueId,
          nombre,
          comida,
          valorComida,
          importePorBebidaString,
          importePorPersonaString,
        }, // id: uniqueId genera id unico
      });
      setNombre("");
      setComida("");
      setValorComida("");
      setImportePorBebida(traerTotalBebidasCu);
      setImportePorPersona(calcImportePorPersona);
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
                importePorBebidaString,
                importePorPersonaString,
              },
            });
            setNombre("");
            setComida("");
            setValorComida("");
            setImportePorBebida(traerTotalBebidasCu);
            setImportePorPersona(calcImportePorPersona);
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

let nextId = 0;

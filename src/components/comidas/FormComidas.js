import { useState } from "react";
import { BiSolidSave } from "react-icons/bi";

export default function FormComidas({ dispatch }) {
  const [nombre, setNombre] = useState("");
  const [comida, setComida] = useState("");
  const [valorComida, setValorComida] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "AGREGAR_COMIDA",
        payload: { id: nextId++, nombre, comida, valorComida },
      });
      setNombre("");
      setComida("");
      setValorComida("");
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
              payload: { id: nextId++, nombre, comida, valorComida },
            });
            setNombre("");
            setComida("");
            setValorComida("");
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

let nextId = 0;

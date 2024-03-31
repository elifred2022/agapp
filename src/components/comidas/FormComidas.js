import { useState } from "react";
import { BiSolidSave } from "react-icons/bi";

export default function FormComidas({ onAddFoods }) {
  const [nombre, setNombre] = useState("");
  const [comida, setComida] = useState("");
  const [valorComida, setValorComida] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAddFoods(nombre, comida, valorComida);
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
            setNombre("");
            setComida("");
            setValorComida("");

            onAddFoods({
              nombre,
              comida,
              valorComida,
            });
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

import { useState } from "react";
import { BiSolidSave } from "react-icons/bi";

export default function FormComidas({ onAddComidas }) {
  const [nombre, setNombre] = useState("");
  const [comida, setComida] = useState("");
  const [valorComida, setValorComida] = useState("");
  const [porcentaje, setPorcentaje] = useState(0);
  const [calcPorcentaje, setCalcPorcentaje] = useState(0);
  const [valorcomidaConPorcentaje, setValorComidaConPorcentaje] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAddComidas(nombre, comida, valorComida);
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
            setPorcentaje(0);
            setCalcPorcentaje(calcPorcentaje);
            setValorComidaConPorcentaje(valorcomidaConPorcentaje);
            onAddComidas({
              nombre,
              comida,
              valorComida,
              porcentaje,
              calcPorcentaje: (valorComida * porcentaje) / 100,
              valorComidaConPorcentaje:
                parseInt((valorComida * porcentaje) / 100) +
                parseInt(valorComida),
            });
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

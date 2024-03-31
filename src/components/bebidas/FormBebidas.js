import { useEffect, useState } from "react";
import { BiSolidSave } from "react-icons/bi";

export default function FormBebidas({ onAddComidas }) {
  const [bebida, setBebida] = useState("");
  const [cantidadBebida, setCantidadBebida] = useState("");
  const [valorUnitBebida, setValorUnitBebida] = useState("");
  const [totalBebida, setTotalBebida] = useState("");

  useEffect(() => {
    if (cantidadBebida && valorUnitBebida) {
      setTotalBebida(parseFloat(cantidadBebida) * parseFloat(valorUnitBebida));
    } else {
      setTotalBebida("");
    }
  }, [cantidadBebida, valorUnitBebida]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAddComidas(bebida, cantidadBebida, valorUnitBebida, totalBebida);
      setBebida("");
      setCantidadBebida("");
      setValorUnitBebida("");
      setTotalBebida("");
    }
  };

  return (
    <>
      <div className="formulario">
        <input
          placeholder="Bebida"
          value={bebida}
          onChange={(e) => setBebida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          placeholder="Cantidad"
          value={cantidadBebida}
          onChange={(e) => setCantidadBebida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          placeholder="Costo"
          value={valorUnitBebida}
          onChange={(e) => setValorUnitBebida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="my-button_agregar"
          onClick={() => {
            setBebida("");
            setCantidadBebida("");
            setValorUnitBebida("");
            setTotalBebida("");
            onAddComidas(bebida, cantidadBebida, valorUnitBebida, totalBebida);
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

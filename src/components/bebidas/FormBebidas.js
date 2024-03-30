import { useState } from "react";
import { BiSolidSave } from "react-icons/bi";

export default function FormBebidas({ onAddBebidas }) {
  const [bebida, setBebida] = useState("");
  const [cantidadBebida, setCantidadBebida] = useState("");
  const [valorUnitBebida, setValorUnitBebida] = useState("");
  const [totalBebida, setTotalBebida] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAddBebidas(bebida, cantidadBebida, valorUnitBebida, totalBebida);
      setBebida("");
      setCantidadBebida("");
      setValorUnitBebida("");
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
            onAddBebidas({
              bebida,
              cantidadBebida,
              valorUnitBebida,
              totalBebida: valorUnitBebida * cantidadBebida,
            });
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

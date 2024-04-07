import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiSolidSave } from "react-icons/bi";

export default function FormBebidas({ onAddComidas, dispatch }) {
  const [bebida, setBebida] = useState("");
  const [cantidadBebida, setCantidadBebida] = useState("");
  const [valorUnitBebida, setValorUnitBebida] = useState("");
  const [totalBebida, setTotalBebida] = useState("");

  const uniqueId = uuidv4();

  useEffect(() => {
    if (cantidadBebida && valorUnitBebida) {
      setTotalBebida(parseFloat(cantidadBebida) * parseFloat(valorUnitBebida));
    } else {
      setTotalBebida("");
    }
  }, [cantidadBebida, valorUnitBebida]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "AGREGAR_BEBIDA",
        payload: {
          id: uniqueId,
          bebida,
          cantidadBebida,
          valorUnitBebida,
          totalBebida,
        },
      });
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
          placeholder="Agregar Bebida"
          value={bebida}
          onChange={(e) => setBebida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidadBebida}
          onChange={(e) => setCantidadBebida(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
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
            dispatch({
              type: "AGREGAR_BEBIDA",
              payload: {
                id: uniqueId,
                bebida,
                cantidadBebida,
                valorUnitBebida,
                totalBebida,
              },
            });
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

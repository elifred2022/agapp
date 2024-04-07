import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiSolidSave } from "react-icons/bi";

export default function FormPorcentaje({ dispatch, montoPorcentaje }) {
  const [descuento, setDescuento] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const uniqueId = uuidv4();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "AGREGAR_PORCENTAJE",
        payload: {
          descuento,
          id: uniqueId,
        },
      });
      setDescuento("");
      setIsDisabled(true);
    }
  };

  const disableInputAndButton = () => {
    setIsDisabled(true);
  };

  return (
    <>
      <div className="formulario">
        <input
          type="number"
          placeholder="Ingrese Porcentaje por efectivo"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
        />

        <button
          className="my-button_agregar"
          onClick={() => {
            setDescuento("");

            dispatch({
              type: "AGREGAR_PORCENTAJE",
              payload: {
                descuento,
                id: uniqueId,
              },
            });
            setIsDisabled(true);
          }}
          disabled={isDisabled}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

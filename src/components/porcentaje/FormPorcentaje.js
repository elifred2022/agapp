import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiSolidSave } from "react-icons/bi";

export default function FormPorcentaje({ dispatch, montoPorcentaje }) {
  const [descuento, setDescuento] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);

  const uniqueId = uuidv4();

  useEffect(() => {
    // funcion para desactivar el input
    if (descuento > 0) {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  }, [montoPorcentaje]);

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
    }
  };

  return (
    <>
      <div className="formulario">
        <input
          placeholder="Ingrese Porcentaje por efectivo"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={inputDisabled}
        />

        <button
          disabled={inputDisabled}
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
          }}
        >
          <BiSolidSave />
        </button>
      </div>
    </>
  );
}

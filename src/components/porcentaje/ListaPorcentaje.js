import React, { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";

const ListaDescuento = ({
  almacenPorcentEfectivo,
  arregloAlmacenPorcentajeEfectivo,
  eliminarPorcentaje,
}) => {
  //  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    //arregloAlmacenPorcentajeEfectivo({ descuento });
  }, []);

  return (
    <>
      <table className="styled-table-bebida">
        <thead>
          <tr>
            <th>% Desc. Pago Efectivo</th>
            <th>Act.</th>
          </tr>
        </thead>

        <tbody>
          {almacenPorcentEfectivo.map((elem, index) => (
            <tr key={index}>
              <td>{`${elem.descuento}`} %</td>
              <td>
                <button
                  className="my-button_eliminar"
                  onClick={() => eliminarPorcentaje(index)}
                >
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListaDescuento;

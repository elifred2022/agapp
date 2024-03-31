import { useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaBebidas({
  elementos,
  onChangeComida,
  onDeleteComida,
}) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Bebida</th>
            <th>Cantidad</th>
            <th>Valor bebida</th>
            <th>Total bebida</th>
            <th>Act.-</th>
          </tr>
        </thead>
        <tbody>
          {elementos.map((bebi, index) => (
            <Bebidas
              key={bebi.id}
              bebi={bebi}
              onChange={onChangeComida}
              onDelete={onDeleteComida}
              elementos={elementos}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Bebidas({ bebi, onChange, onDelete, index }) {
  const [isEditing, setIsEditing] = useState(false);

  let bebiContent;
  if (isEditing) {
    bebiContent = (
      <>
        <tr>
          <td>{index + 1}.-</td>
          <td>
            <input
              value={bebi.bebida}
              onChange={(e) => {
                onChange({
                  ...bebi,
                  bebida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={bebi.cantidad}
              onChange={(e) => {
                onChange({
                  ...bebi,
                  cantidad: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={bebi.valorUnitBebida}
              onChange={(e) => {
                onChange({
                  ...bebi,
                  valorUnitBebida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <button
              className="my-button_agregar"
              onClick={() => setIsEditing(false)}
            >
              <BiSolidSave />
            </button>
          </td>
        </tr>
      </>
    );
  } else {
    bebiContent = (
      <>
        <tr>
          <td>{index + 1}.- </td>
          <td>{bebi.bebida}</td>
          <td>{bebi.cantidad}</td>
          <td>${bebi.valorUnitBebida}</td>
          <td>{bebi.totalBebida}</td>

          <td>
            <div className="botonera">
              <button
                className="my-button_editar"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
              </button>
              <button
                className="my-button_eliminar"
                onClick={() => onDelete(bebi.id)}
              >
                <MdAutoDelete />
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{bebiContent}</>}</>;
}

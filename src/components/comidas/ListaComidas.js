import { useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaComidas({ foods, onChangeFoods, onDeleteFoods }) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Plato</th>
            <th>Valor/plato</th>
            <th>Act.</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <Foods
              key={food.id}
              food={food}
              onChange={onChangeFoods}
              onDelete={onDeleteFoods}
              foods={foods}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Foods({ food, onChange, onDelete, index }) {
  const [isEditing, setIsEditing] = useState(false);

  let foodContent;
  if (isEditing) {
    foodContent = (
      <>
        <tr>
          <td>{index + 1}.-</td>
          <td>
            <input
              value={food.nombre}
              onChange={(e) => {
                onChange({
                  ...food,
                  nombre: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={food.comida}
              onChange={(e) => {
                onChange({
                  ...food,
                  comida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={food.valorComida}
              onChange={(e) => {
                onChange({
                  ...food,
                  valorComida: e.target.value,
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
    foodContent = (
      <>
        <tr>
          <td>{index + 1}.- </td>
          <td>{food.nombre}</td>
          <td>{food.comida}</td>
          <td>${food.valorComida}</td>

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
                onClick={() => onDelete(food.id)}
              >
                <MdAutoDelete />
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{foodContent}</>}</>;
}

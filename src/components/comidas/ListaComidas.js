import { useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";

export default function ListaComidas({
  elementos,
  onChangeTask,
  onDeleteTask,
}) {
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
          {elementos.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              onChange={onChangeTask}
              onDelete={onDeleteTask}
              elementos={elementos}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Task({ task, onChange, onDelete, index }) {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <tr>
          <td>{index + 1}.-</td>
          <td>
            <input
              value={task.nombre}
              onChange={(e) => {
                onChange({
                  ...task,
                  nombre: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={task.comida}
              onChange={(e) => {
                onChange({
                  ...task,
                  comida: e.target.value,
                });
              }}
            />
          </td>
          <td>
            <input
              value={task.valorComida}
              onChange={(e) => {
                onChange({
                  ...task,
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
    taskContent = (
      <>
        <tr>
          <td>{index + 1}.- </td>
          <td>{task.nombre}</td>
          <td>{task.comida}</td>
          <td>${task.valorComida}</td>

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
                onClick={() => onDelete(task.id)}
              >
                <MdAutoDelete />
              </button>
            </div>
          </td>
        </tr>
      </>
    );
  }
  return <>{<>{taskContent}</>}</>;
}

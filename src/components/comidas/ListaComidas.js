import { useState } from "react";

export default function ListaComidas({
  elementos,
  onChangeTask,
  onDeleteTask,
}) {
  return (
    <>
      {elementos.map((task, index) => (
        <h2 key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
            elementos={elementos}
            index={index}
          />
        </h2>
      ))}
    </>
  );
}

function Task({ task, onChange, onDelete, elementos, index }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.nombre}
          onChange={(e) => {
            onChange({
              ...task,
              nombre: e.target.value,
            });
          }}
        />
        <input
          value={task.comida}
          onChange={(e) => {
            onChange({
              ...task,
              comida: e.target.value,
            });
          }}
        />
        <input
          value={task.valorComida}
          onChange={(e) => {
            onChange({
              ...task,
              valorComida: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Guardar</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.nombre}
        {task.comida}
        {task.valorComida}
        <button onClick={() => setIsEditing(true)}>Editar</button>
      </>
    );
  }
  return (
    <>
      {
        <>
          <span>{index + 1}.- </span> {taskContent}
          <button onClick={() => onDelete(task.id)}>Borrar</button>
        </>
      }
    </>
  );
}

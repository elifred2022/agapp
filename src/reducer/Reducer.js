export default function tasksReducer(elementos, action) {
  switch (action.type) {
    case "added": {
      return [
        ...elementos,
        {
          id: action.id,
          nombre: action.nombre,
          comida: action.comida,
          valorComida: action.valorComida,
          done: false,
        },
      ];
    }
    case "changed": {
      return elementos.map((t) => {
        if (t.id === action.elementos.id) {
          return action.elementos;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return elementos.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

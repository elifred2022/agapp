export default function Reducer(state, action) {
  switch (action.type) {
    case "AGREGAR_COMIDA":
      return {
        ...state,
        comidas: [...state.comidas, action.payload],
      };

    case "EDITAR_COMIDA": {
      return {
        ...state,
        comidas: state.comidas.map((comida) =>
          comida.id === action.payload.id ? action.payload : comida
        ),
      };
    }

    case "ELIMINAR_COMIDA": {
      return {
        ...state,
        comidas: state.comidas.filter(
          (comida) => comida.nombre !== action.payload.nombre
        ),
      };

      /* return state.comidas.filter((f) => f.id !== action.id);*/
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

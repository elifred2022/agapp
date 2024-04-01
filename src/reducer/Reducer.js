export const initialState = {
  comidas: [],
  bebidas: [],
};
/*
export const actionTypes = {
  AGREGAR_COMIDA: "AGREGAR_COMIDA",
};*/

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
    }

    case "AGREGAR_BEBIDA":
      return {
        ...state,
        bebidas: [...state.bebidas, action.payload],
      };

    case "EDITAR_BEBIDA": {
      return {
        ...state,
        bebidas: state.bebidas.map((bebida) =>
          bebida.id === action.payload.id ? action.payload : bebida
        ),
      };
    }

    case "ELIMINAR_BEBIDA": {
      return {
        ...state,
        bebidas: state.bebidas.filter(
          (bebida) => bebida.bebida !== action.payload.bebida
        ),
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

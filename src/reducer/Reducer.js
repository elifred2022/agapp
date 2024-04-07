export const initialState = {
  comidas: [],
  bebidas: [],
  montoPorcentaje: [],
  indicesComidas: [],
  montoBebidaCu: [],
  resultado: [],
};

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

    case "AGREGAR_PORCENTAJE":
      return {
        ...state,
        montoPorcentaje: [...state.montoPorcentaje, action.payload],
      };

    case "EDITAR_PORCENTAJE": {
      return {
        ...state,
        montoPorcentaje: state.montoPorcentaje.map((porcent) =>
          porcent.id === action.payload.id ? action.payload : porcent
        ),
      };
    }

    case "ELIMINAR_PORCENTAJE": {
      return {
        ...state,
        montoPorcentaje: state.montoPorcentaje.filter(
          (porcent) => porcent.descuento !== action.payload.descuento
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

    case "AGREGAR_INDICE":
      return {
        ...state,
        indicesComidas: [...state.indicesComidas, action.payload],
      };

    case "AGREGAR_RESULTADO":
      return {
        ...state,
        resultado: [...state.resultado, action.payload],
      };

    case "AGREGAR_BEBIDACU":
      return {
        ...state,
        montoBebidaCu: [...state.montoBebidaCu, action.payload],
      };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

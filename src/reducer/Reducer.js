export const initialState = {
  comidas: [],
  bebidas: [],
  montoComidaGral: [],
  montoPorcentaje: [],
  indicesComidas: [],
  montoBebidaCu: [],
  resultado: [],
  resultadoEfectivo: [],
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

    case "EDITAR_RESULTADO": {
      return {
        ...state,
        resultado: state.resultado.map((result) =>
          result.id === action.payload.id ? action.payload : result
        ),
      };
    }

    case "AGREGAR_RESULTADOEFECTIVO":
      return {
        ...state,
        resultadoEfectivo: [...state.resultadoEfectivo, action.payload],
      };

    case "AGREGAR_MONTOTOTALCOMIDA":
      return {
        ...state,
        montoComidaGral: [...state.montoComidaGral, action.payload],
      };

    case "AGREGAR_BEBIDACU":
      return {
        ...state,
        montoBebidaCu: [...state.montoBebidaCu, action.payload],
      };

    case "RESET":
      return initialState;
    // other action types...

    case "RESET_RESULTADOS":
      return { ...state, resultado: [], resultadoEfectivo: [] };
    // other action types...

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

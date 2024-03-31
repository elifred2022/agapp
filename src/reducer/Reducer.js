export default function foodReducer(foods, action) {
  switch (action.type) {
    case "food_added": {
      return [
        ...foods,
        {
          id: action.id,
          nombre: action.nombre,
          comida: action.comida,
          valorComida: action.valorComida,
          done: false,
        },
      ];
    }
    case "food_changed": {
      return foods.map((f) => {
        if (f.id === action.foods.id) {
          return action.foods;
        } else {
          return f;
        }
      });
    }
    case "food_deleted": {
      return foods.filter((f) => f.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

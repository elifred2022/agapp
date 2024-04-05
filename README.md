const storeChecked =
JSON.parse(localStorage.getItem("isEfectivoCheck")) || [];

     useEffect(() => {
    if (isEfectivoCheck) {
      // Almacena los elementos d descuento por pago efectivo
      localStorage.setItem("isEfectivoCheck", JSON.stringify(isEfectivoCheck));
    } else {
      localStorage.setItem("isEfectivoCheck", JSON.stringify(false));
    }

}, [isEfectivoCheck, resCu]);

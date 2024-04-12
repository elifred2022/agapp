11ABR24
TRATAR DE MODIFICAR EL CODIGO DE INFORME FINAL Y HACER ISEDITING CON USEFECT PARA QUE AL CLICKEAR EL CEHCKBOX CAMBIE DE ISEDITING A NO ISEDITING

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

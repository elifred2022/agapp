useEffect(() => {
if (isChecked) {
// agrega resultado efectivo solo cuando es checked
dispatch({
type: "AGREGAR_RESULTADOEFECTIVO",
payload: { importePorPersonaEfectivotoRef },
});
}
}, [isChecked]);

const traerPorcentajeEfectivo = montoPorcentaje.reduce(
(acc, elem) => (acc = parseInt(elem.descuento)),
0
);

const handleChangeModoPago = (checked) => {
setIsChecked(checked);

    if (checked) {
      // si paga en efectivo
      const calcImportePorPersona =
        parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

      //const pagoDebito = importePorPersonaDebitoCheckedRef;

      let pagoEfectivo = 0;

      if (traerPorcentajeEfectivo > 0) {
        let porcentaje =
          (calcImportePorPersona * traerPorcentajeEfectivo) / 100;

        pagoEfectivo = calcImportePorPersona - porcentaje;

        setImportePorPersonaEfectivo(
          (importePorPersonaEfectivotoRef.current = pagoEfectivo.toFixed(2))
        );

        setImportePorPersonaDebito(
          (importePorPersonaDebitoRef.current =
            importePorPersonaDebitoRef.current -
            importePorPersonaDebitoRef.current)
        );
      } else {
        alert("Debe ingresar porcentaje");
        setIsChecked(false);
      }
    } else {
      setImportePorPersonaDebito(
        (importePorPersonaDebitoRef.current = calcImportePorPersona.toFixed(2))
      );

      setImportePorPersonaEfectivo(
        (importePorPersonaEfectivotoRef.current =
          importePorPersonaEfectivotoRef.current -
          importePorPersonaEfectivotoRef.current)
      );
    }

};

FUNCION SELECCION CALCULOS

const handleChangeModoPago = (event) => {
const newMetodoPago = event.target.value; // asi se actualiza inmediatamente al sellecionar debito o efectivo
setMetodoPago(newMetodoPago);

    switch (newMetodoPago) {
      case "debito":
        // si paga en debito

        calcDebito();

        /*  setImportePorPersonaEfectivo(
          (importePorPersonaEfectivotoRef.current =
            importePorPersonaEfectivotoRef.current -
            importePorPersonaEfectivotoRef.current)
        );*/

        break;
      case "efectivo":
        // si paga en efectivo

        calcEfectivo();

        /*  setImportePorPersonaDebito(
          (importePorPersonaDebitoRef.current =
            importePorPersonaDebitoRef.current -
            importePorPersonaDebitoRef.current)
        );*/

        break;
      default:
        break;
    }

    /*
    if (checked) {
      // si paga en efectivo
      const calcImportePorPersona =
        parseInt(comida.valorComida) + parseInt(traerTotalBebidasCu);

      let pagoEfectivo = 0;

      if (traerPorcentajeEfectivo > 0) {
        let porcentaje =
          (calcImportePorPersona * traerPorcentajeEfectivo) / 100;

        pagoEfectivo = calcImportePorPersona - porcentaje;

        setImportePorPersonaEfectivo(
          (importePorPersonaEfectivotoRef.current = pagoEfectivo.toFixed(2))
        );

        dispatch({
          type: "AGREGAR_RESULTADOEFECTIVO",
          payload: { importePorPersonaEfectivotoRef },
        });

        setImportePorPersonaDebito(
          (importePorPersonaDebitoRef.current =
            importePorPersonaDebitoRef.current -
            importePorPersonaDebitoRef.current)
        );
      } else {
        alert("Debe ingresar porcentaje");
        setIsChecked(false);
      }
    } else {
      setImportePorPersonaDebito(
        (importePorPersonaDebitoRef.current = calcImportePorPersona.toFixed(2))
      );

      dispatch({
        type: "AGREGAR_RESULTADO",
        payload: { importePorPersonaDebitoRef },
      });

      setImportePorPersonaEfectivo(
        (importePorPersonaEfectivotoRef.current =
          importePorPersonaEfectivotoRef.current -
          importePorPersonaEfectivotoRef.current)
      );
    }*/

};

function calcDebito() {
let pagoDebito = 0;

    pagoDebito = calcImportePorPersonaString;

    setImportePorPersonaDebito(calcImportePorPersonaString);
    // calculate the new values for cambioString, formaPago, importeTotalCuString, valorBebidaCuString, and cambioString
    const newNombre = comida.nombre;
    const newComida = comida.comida;
    const newValorComida = comida.valorComida;
    const newValorComidaString = newValorComida;
    const newValorBebidaCu = traerTotalBebidasCu;
    const newImporteTotalCu = calcImportePorPersona;
    const newCambioString = 1;
    const newFormaPago = "debito";
    // const newCambioString = 1;

    // update the comidas state with the new values
    dispatch({
      type: "EDITAR_COMIDA",
      payload: {
        id: comida.id,
        changes: {
          nombre: newNombre,
          comida: newComida,
          valorComida: newValorComidaString,
          cambioString: newCambioString,
          formaPago: newFormaPago,
          importeTotalCuString: calcImportePorPersona,
          valorBebidaCuString: newValorBebidaCu,
          cambioString: newCambioString,
        },
      },
    });
    /*
    if (traerPorcentajeEfectivo > 0) {
      pagoDebito = calcImportePorPersona;

      setImportePorPersonaDebito(
        (importePorPersonaDebitoRef.current = pagoDebito)
      );
    } /* else {
      alert("Debe ingresar porcentaje");
      setMetodoPago("vacio");
    }*/
    //setMetodoPago("debito");

}

function calcEfectivo() {
let pagoEfectivo = 0;

    if (traerPorcentajeEfectivo > 0) {
      let porcentaje = (calcImportePorPersona * traerPorcentajeEfectivo) / 100;

      pagoEfectivo = calcImportePorPersona - porcentaje;

      setImportePorPersonaEfectivo(
        parseInt((importePorPersonaEfectivotoRef.current = pagoEfectivo))
      );
      // calculate the new values for cambioString, formaPago, importeTotalCuString, valorBebidaCuString, and cambioString
      const newNombreEfectivo = comida.nombre;
      const newComidaEfectivo = comida.comida;
      const newValorComidaEfectivo = comida.valorComida;
      const newCambioStringEfectivo = 2;
      const newFormaPagoEfectivo = "efectivo";

      const newImporteTotalCuStringEfectivo = importePorPersonaEfectivo;
      const newValorBebidaCuStringEfectivo = traerTotalBebidasCu;

      // const newCambioStringEfectivo = 2;

      // update the comidas state with the new values
      dispatch({
        type: "EDITAR_COMIDA",
        payload: {
          id: comida.id,
          changes: {
            nombre: newNombreEfectivo,
            comida: newComidaEfectivo,
            valorComida: newValorComidaEfectivo,
            cambioString: newCambioStringEfectivo,
            formaPago: newFormaPagoEfectivo,
            importeTotalCuString: newImporteTotalCuStringEfectivo,
            valorBebidaCuString: newValorBebidaCuStringEfectivo,
            cambioString: newCambioStringEfectivo,
          },
        },
      });
    } else {
      alert("Debe ingresar porcentaje");
      setMetodoPago("vacio");
    }
    //setMetodoPago("vacio");

}

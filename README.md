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

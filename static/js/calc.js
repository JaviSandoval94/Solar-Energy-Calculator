d3.select("#calcButton").on("click", (_) => {
  var payment = d3.select("#pay");
  var consume = d3.select("#consume");
  var location = d3.select("#location");
  var ubi = location.property("value");
  var pay = payment.property("value");
  var con = consume.property("value");

  if (ubi == "North") {
    var sProd = 1625;
  } else if (ubi == "Downtown & South") {
    var sProd = 1587;
  } else if (ubi == "West") {
    var sProd = 1603;
  } else if (ubi == "East") {
    var sProd = 1597;
  }

  var watt_price = 2 * 22; // Precio de instalación por Watt
  var watt_paid = pay / con; // Pago por Kilo Watt hora (KWh) consumido en el último año
  var size = (con / sProd) * 1000; // Capacidad de generación (en Kilo Watts) necesaria, basada en el consumo del usuario y la producción específica del lugar
  var panelNum = size / 260; // Número de páneles de 260 Watts necesarios para cubrir el consumo del usuario
  var downPay = watt_price * size; // Inversión inicial basada en el precio de instalación y el consumo del usuario
  var yearlyReturn = watt_paid * con; // Retorno Anual basado en el consumo del usuario
  var breakeven = downPay / yearlyReturn; // Tiempo para recuperar la inversión

  console.log(panelNum);
  console.log(downPay);
  console.log(breakeven);

  d3.select("#panels").text(
    `Optimal Number of Panels (260 Watt): ${panelNum.toFixed(2)}`
  );
  d3.select("#dpayment").text(`Down Payment: ${downPay.toFixed(2)} MXN`);
  d3.select("#breakeven").text(
    `Time for Breakeven: ${breakeven.toFixed(1)} years`
  );
});

url = "/api/solar";
var data = d3.json(url);
var plant = d3.select("#plant_id");
var compare = d3.select("#comparison");
// console.log(plant);
plant.on("change", bubblePlot);
compare.on("change", bubblePlot);
function bubblePlot() {
  var bubble = d3.select("#bubble"); // Select the bubble chart
  bubble.html(""); // Clear bubble chart HTML
  var id = plant.property("value");
  // console.log(id);
  var eval = compare.property("value");
  var spec = "specific_prod(kWh/kWp)";
  var pes = [];
  var evalist = [];
  var text = [];
  if (eval == "sunHour") {
    var x_label = "Sunlight Exposure [hours]";
    var title = "Specific Production vs Sunlight Exposure";
  } else if (eval == "uvIndex") {
    var x_label = "Ultraviolet Radiation Index";
    var title = "Specific Production vs Ultraviolet Radiation Index";
  } else if (eval == "cloudcover") {
    var x_label = "Cloud Coverage [%]";
    var title = "Specific Production vs Cloud Coverage";
  } else if (eval == "maxtempC") {
    var x_label = "Maximum Temperature [°C]";
    var title = "Specific Production vs Maximum Temperature";
  }
  data.then((info) => {
    Object.entries(info).forEach(([key, value]) => {
      if (value.id == id) {
        pes.push(value[spec]);
        evalist.push(value[eval]);
        text.push(
          `Specific Production: ${value[spec]} | ${x_label}: ${value[eval]}`
        );
      }
    });
    var bubble = d3.select("#bubble"); // Select the bubble chart
    bubble.html(""); // Clear bubble chart HTML
    var bData = [
      {
        // Create the data for the chart
        type: "scatter",
        x: evalist,
        y: pes,
        text: text,
        mode: "markers",
        marker: {
          size: 30,
          color: evalist,
          colorscale: "Viridis",
        },
      },
    ];
    var bLayout = {
      title: title,
      hovermode: "closest",
      xaxis: { title: x_label },
      yaxis: { title: " Specific Production [kWh/kWp]" },
      // plot_bgcolor: "#001845",
      // paper_bgcolor:"#001233",
      font: {
        // color: "rgb(220,220,220)",
      },
    };
    Plotly.newPlot("bubble", bData, bLayout);
  });
}

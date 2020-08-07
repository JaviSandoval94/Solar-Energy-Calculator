url = "/api/line";

var api = d3.json(url);

var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 60, right: 60, bottom: 60, left: 60 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");

var svg = d3
  .select("#lineplot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3.scaleTime().range([0, width]);
var xAxis = d3
  .axisBottom()
  .scale(x)
  .tickFormat(d3.timeFormat("%Y"))
  .ticks(d3.timeYear);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis");

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis");

api.then((data) => {
  // update(data, 1);
  var plant = d3.select("#plant_id");

  plant.on("change", (_) => {
    var id = plant.property("value");
    console.log(id);

    newdata = [];
    data.forEach(function (obj) {
      if (obj.id == id) {
        newdata.push(obj);
      }
    });

    console.log(newdata);

    newdata.forEach(function (obj) {
      obj.year = parseTime(obj.year);
      obj["specific_prod(kWh/kWp)"] = +obj["specific_prod(kWh/kWp)"];
    });

    // Create the X axis:
    x.domain(d3.extent(newdata, (elmnt) => elmnt.year));

    svg.selectAll(".myXaxis").transition().duration(3000).call(xAxis);

    // create the Y axis
    y.domain([
      d3.min(newdata, (elmnt) => elmnt["specific_prod(kWh/kWp)"]),
      d3.max(newdata, (elmnt) => elmnt["specific_prod(kWh/kWp)"]),
    ]);

    svg.selectAll(".myYaxis").transition().duration(3000).call(yAxis);

    // Create a update selection: bind to the new data
    var u = svg.selectAll(".lineTest").data([newdata], function (d) {
      return d.year;
    });

    // Updata the line
    u.enter()
      .append("path")
      .attr("class", "lineTest")
      .merge(u)
      .transition()
      .duration(3000)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.year);
          })
          .y(function (d) {
            return y(d["specific_prod(kWh/kWp)"]);
          })
      )
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5);
  });
});

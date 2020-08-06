url = "/api/solar"
var data = d3.json(url)

data.then(info => {
    console.log(info)
    // console.log(info[0])

    var id = "1";
    var eval = "sunHour";
    var spec = "specific_prod(kWh/kWp)";
    var pes = [];
    var evalist = [];
    var text = [];

    if(eval == "sunHour"){
        var x_label = "Sunlight Exposure [hours]";
        var title = "Specific Production vs Sunlight Exposure";
    }
    else if(eval == "uvIndex"){
        var x_label = "Ultraviolet Radiation Index";
        var title = "Specific Production vs Ultraviolet Radiation Index";
    }
    else{
        var x_label = "Cloud Coverage [%]";
        var title = "Specific Production vs Cloud Coverage";
    }

    Object.entries(info).forEach(([key, value])=>{
        if(value.id == id){
            pes.push(value[spec])
            evalist.push(value[eval])
            text.push(value[spec], value[eval])
        }
    });

    var bubble = d3.select("#bubble"); // Select the bubble chart
    bubble.html("");  // Clear bubble chart HTML

    var bData = [{ // Create the data for the chart
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
    }];

    var bLayout = {
        title: title,
        // margin: {t: 0},
        hovermode: "closest",
        xaxis: {title: x_label},
        yaxis: {title: " Specific Production [kWh/kWp]"},
        // margin: {t: 30},
        // plot_bgcolor: "#001845",
        // paper_bgcolor:"#001233",
        font: {
            // color: "rgb(220,220,220)",
        }
    };

    Plotly.newPlot("bubble", bData, bLayout);

    // info.filter(selected=>selected.id=id)
    
});
url = "/api/solar"
var data = d3.json(url)

data.then(info => {
    // console.log(info)
    console.log(info[0])
});
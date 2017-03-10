
InitChart();

function InitChart() {

    var lineData = [{
        'x': 1,
        'y': 5
    }, {
        'x': 20,
        'y': 20
    }, {
        'x': 40,
        'y': 10
    }, {
        'x': 60,
        'y': 40
    }, {
        'x': 80,
        'y': 5
    }, {
        'x': 100,
        'y': 60
    }];

    var vis = d3.select("#visualisation"),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
            return d.x;
        }),
            d3.max(lineData, function (d) {
                return d.x;
            })
        ]),

        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
            return d.y;
        }),
            d3.max(lineData, function (d) {
                return d.y;
            })
        ]),

        xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(5)
            .tickSubdivide(true),

        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(5)
            .orient("left")
            .tickSubdivide(true);


    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);


}


var jsondisease = [
    {"name": "arrhythmia", "value": 88, "cx": 20, "cy": 20},
    {"name": "bradycardia", "value": 88, "cx": 20, "cy": 20},
    {"name": "tachycardia", "value": 88, "cx": 20, "cy": 20},
    {"name": "ischemia", "value": 88, "cx": 20, "cy": 20}];



// InitChart();
//
//
// function InitChart() {
//
//     // var lineData = [{
//     //     'x': 1,
//     //     'y': 5
//     // }, {
//     //     'x': 20,
//     //     'y': 20
//     // }, {
//     //     'x': 40,
//     //     'y': 10
//     // }, {
//     //     'x': 60,
//     //     'y': 40
//     // }, {
//     //     'x': 80,
//     //     'y': 5
//     // }, {
//     //     'x': 100,
//     //     'y': 60
//     // }];
//
//
//
//
//
//     var vis = d3.select("#visualisation"),
//         WIDTH = 1000,
//         HEIGHT = 500,
//         MARGINS = {
//             top: 20,
//             right: 20,
//             bottom: 20,
//             left: 50
//         },
//         xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(jsondisease, function (d) {
//             return d.cy;
//         }),
//             d3.max(jsondisease, function (d) {
//                 return d.cx;
//             })
//         ]),
//
//         yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(jsondisease, function (d) {
//             return d.cy;
//         }),
//             d3.max(jsondisease, function (d) {
//                 return d.cx;
//             })
//         ]),
//
//         xAxis = d3.svg.axis()
//             .scale(xRange)
//             .tickSize(5)
//             .tickSubdivide(true),
//
//         yAxis = d3.svg.axis()
//             .scale(yRange)
//             .tickSize(5)
//             .orient("left")
//             .tickSubdivide(true);
//
//
//     vis.append("svg:g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
//         .call(xAxis);
//
//     vis.append("svg:g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(" + (MARGINS.left) + ",0)")
//         .call(yAxis);
//
//
// }


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

    {"name": "arrhythmia", "value": 0.88, "cx": 20, "cy": 20},
    {"name": "bradycardia", "value": 0.88, "cx": 20, "cy": 20},
    {"name": "tachycardia", "value": 0.88, "cx": 20, "cy": 20},
    {"name": "ischemia", "value": 0.88, "cx": 20, "cy": 20}];


//
//
// var svg = d3.select("svg"),
//     margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;
//
// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([height, 0]);
//
// var g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// d3.json("disease.json", function(d) {
//     d.frequency = +d.frequency;
//     return d;
// }, function(error, data) {
//     if (error) throw error;
//
//     x.domain(data.map(function(d) { return d.letter; }));
//     y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
//
//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
//
//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y).ticks(10, "%"))
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Frequency");
//
//     g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return x(d.letter); })
//         .attr("y", function(d) { return y(d.frequency); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return height - y(d.frequency); });
// });

//InitChart();


// function InitChart() {
//
//     var lineData = [{
//         'x': 1,
//         'y': 5
//     }, {
//         'x': 20,
//         'y': 20
//     }, {
//         'x': 40,
//         'y': 10
//     }, {
//         'x': 60,
//         'y': 40
//     }, {
//         'x': 80,
//         'y': 5
//     }, {
//         'x': 100,
//         'y': 60
//     }];
//     var jsondisease = [
//         {"name": "arrhythmia", "value": 0.88, "cx": 20, "cy": 20},
//         {"name": "bradycardia", "value": 0.88, "cx": 20, "cy": 20},
//         {"name": "tachycardia", "value": 0.88, "cx": 20, "cy": 20},
//         {"name": "ischemia", "value": 0.88, "cx": 20, "cy": 20}];
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
//         xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
//             return d.y;
//         }),
//             d3.max(lineData, function (d) {
//                 return d.x;
//             })
//         ]),
//
//         yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
//             return d.y;
//         }),
//             d3.max(lineData, function (d) {
//                 return d.x;
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
// }


InitChart();

function InitChart() {

    var barData = [{
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

    var vis = d3.select('#visualisation'),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
            return d.x;
        })),


        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
            d3.max(barData, function (d) {
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


    vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
        .call(xAxis);

    vis.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
        .call(yAxis);

    vis.selectAll('rect')
        .data(barData)
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return xRange(d.x);
        })
        .attr('y', function (d) {
            return yRange(d.y);
        })
        .attr('width', xRange.rangeBand())
        .attr('height', function (d) {
            return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
        })
        .attr('fill', 'grey')
        .on('mouseover',function(d){
            d3.select(this)
                .attr('fill','blue');
        })
        .on('mouseout',function(d){
            d3.select(this)
                .attr('fill','grey');
        });

}

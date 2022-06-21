currentFile = "TSLA.csv"

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 1400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%Y-%m-%d");


var area = d3.area()
    .x(function(d) {return x(d.Date);})
    .y0(height)
    .y1(function(d) {return y(d.AdjClose);});

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

// Define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.AdjClose); });
    
// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*
const brush = d3.brushX()
    .extent([[margin.left, margin.top], [width-margin.right, height-margin.bottom]])
    .on("start brush", brushed)
    .on("end", finishedBrushing)
*/

// Get the data
d3.csv(currentFile).then(function(data) {
    data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.AdjClose = +d.AdjClose;
    });

    // Scale the range of the data
    x.domain([parseDate('2019-10-30'), parseDate('2020-10-30')]).range([0, width]);
    y.domain([0, d3.max(data, function(d) { return d.AdjClose; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline(data));
        //.datum(data)
        //.attr("class", "area")
        //.attr("d", area);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .call(yAxis);
    
    /*
    svg.append("g")
        .call(brush)
        .call(brush.move, [3,5].map(x));
    */
});

// ** Update data section (Called from the onclick)
function updateData() {

    // Get the data again
    if(currentFile === "TSLA.csv") {
        d3.csv("XOM.csv").then(function(data) {
            data.forEach(function(d) {
                d.Date = parseDate(d.Date);
                d.AdjClose = +d.AdjClose;
            });


            currentFile = "XOM.csv";
            console.log(currentFile);
            // Scale the range of the data again 
            x.domain(d3.extent(data, function(d) { return d.Date; }));
            y.domain([0, d3.max(data, function(d) { return d.AdjClose; })]);

            // Select the section we want to apply our changes to
            var svg = d3.select("body").transition();

            // Make the changes
            svg.select(".line")   // change the line
                .duration(750)
                .attr("d", valueline(data));
                //.datum(data)
                //.attr("class", "area")
                //.attr("d", area);
            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);
            //svg.select(".brush")
                //.call(brush);
        });
    }
    else {
        d3.csv("TSLA.csv").then(function(data) {
            data.forEach(function(d) {
                d.Date = parseDate(d.Date);
                d.AdjClose = +d.AdjClose;
            }); 
            
    
            currentFile = "TSLA.csv";
            console.log(currentFile);
            // Scale the range of the data again 
            x.domain(d3.extent(data, function(d) { return d.Date; }));
            y.domain([0, d3.max(data, function(d) { return d.AdjClose; })]);

            // Select the section we want to apply our changes to
            var svg = d3.select("body").transition();

            // Make the changes
            svg.select(".line")   // change the line
                .duration(750)
                .attr("d", valueline(data));
                //.datum(data)
                //.attr("class", "area")
                //.attr("d", area);
            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);
            //svg.select(".brush")
                //.call(brush);

        }); 
    }
}
/*
function finishedBrushing(event) {
    if(event.selection === null) {
        const dx = x(1) - x(0);
        const [[cx]] = d3.pointers(event);
        const [x0, x1] = [cx - dx / 2, cx + dx /2];
        const [X0, X1] = x.range();
        d3.select(this)
            .call(brush.move, x1 > X1 ? [X1 - dx, X1]
                : x0 < X0 ? [X0, X0 + dx]
                : [x0, x1]);
    }
    else {
        var [brushL, brushR] = d3.brushSelection(this);
        if (brushL-brushR < 50) {
            d3.select(this)
                .call(brush.move, [brushL-25, brushR+25]);
        }
    }
}

function brushed(event) {
    const selection = event.selection;
    console.log(event.type);
    if(selection === null) {
        path.attr("stroke", null);
    }
    else {
        const [x0, x1] = selection.map(x.invert);
        path.attr("stroke", d => x0 <= d && d <= x1 ? "orange" : null);
    }
}
*/

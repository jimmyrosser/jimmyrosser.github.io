//Variable to keep track of which file is being displayed
var currentFile = "TSLA.csv";

//Variables for the TSLA data and the XOM data after they have been parsed
var XOMData = null
var TSLAData = null

//Set the margin dimensions and dimensions for other objects
var margin = {top: 15, right: 10, bottom: 20, left: 25},
    width = 1000,
    height = 250,
    contextHeight = 100,
    svgHeight = 1000;

//Function to parse the date from the data files
var parseDate = d3.timeParse("%Y-%m-%d");

//Create the svg
const svg = d3.select("body")
    .append("svg")
    .attr("viewBox", [0, 0, width, svgHeight]);

//Create the focus
const focus = svg.append("g");

//Create the context
const context = svg.append("g")
    .attr("transform", `translate(0, ${height})`);

//Parse the data
d3.csv(currentFile).then(function(data) {
    data.forEach(function(d) {
        //Read in date and adjclose
        d.Date = parseDate(d.Date);
        d.AdjClose = +d.AdjClose;
    });
    drawFocus(data);
    drawContext(data);
    TSLAData = data

    d3.csv("XOM.csv").then(function(data) {
        data.forEach(function(d) {
            //Read in date and adjclose
            d.Date = parseDate(d.Date);
            d.AdjClose = +d.AdjClose;
        });
        XOMData = data
    });
});

//DRAWFOCUS
    //Function to draw the focus and add relavent data to it
function drawFocus(data) {
    //Remove all elements currently on the focus
    focus.selectAll("*").remove()

    //Add the x axis to g
    xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    //Add the y axis to g
    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())

    //Define the scale of the x axis
    x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date))
        .range([margin.left, width - margin.right])

    //Define the scale of the y axis
    y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.AdjClose)]).nice()
        .range([height - margin.bottom, margin.top])

    //Create the area
    area = d3.area()
        .x(d => x(d.Date))
        .y0(y(0))
        .y1(d => y(d.AdjClose))

    //Add the path to the focus
    focus.append("path")
        .datum(data)
        .attr("fill", "lightcoral")
        .attr("d", area);

    //Call the x axis
    focus.append("g")
        .call(xAxis);

    //Call the y axis
    focus.append("g")
        .call(yAxis);
}

//DRAWCONTEXT
    //Function to draw the context and add relavent data to it
function drawContext(data){
    //Remove all elements currently on the context
    context.selectAll("*").remove()

    //Add the x axis to g
    contextxAxis = g => g
        .attr("transform", `translate(0,${contextHeight - margin.bottom})`)
        .call(d3.axisBottom(contextx).ticks(width / 80).tickSizeOuter(0))

    //Define the scale of the x axis
    contextx = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date))
        .range([margin.left, width - margin.right])

    //Define the scale of the y axis
    contexty = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.AdjClose)]).nice()
        .range([contextHeight - margin.bottom, margin.top])

    //Create the area
    contextarea = d3.area()
        .x(d => contextx(d.Date))
        .y0(contexty(0))
        .y1(d => contexty(d.AdjClose))

    //Add the path to the context
     context.append("path")
        .datum(data)
        .attr("fill", "wheat")
        .attr("d", contextarea);

    //Call the x axis
    context.append("g")
        .call(contextxAxis);

    //Create the brush
    const brush = d3.brushX()
        .extent([[margin.left, 0.5], [width - margin.right, contextHeight -margin.bottom + 0.5]])
        .on("start brush", brushed)
        .on("end", finishedBrushing);

    //Call the brush
    const contextBrush = context.append("g")
        .call(brush)

    //BRUSHED
        //Function to handle the "start" and "brush" brush event
    function brushed(event) {
        if (event.selection != null) {
            const [x0, x1] = event.selection.map(contextx.invert);
            filterData = data.filter(d => x0 <= d.Date && x1 >= d.Date);
            drawFocus(filterData);
        }
    }
    //FINISHEDBRUSHING
        //Function to handle the "end" brush event
    function finishedBrushing(event){
        if(event.selection != null){
            var [brushL, brushR] = d3.brushSelection(this);
            if(brushR - brushL < 50) {
                d3.select(this)
                .call(brush.move, [brushL-25,brushR+25]);
            }
        }
        else {
            drawFocus(data)
        }
    }
}
//UPDATE DATA//
    //Function to update the data when the button is clicked 
    //and handle multiple data switches
function updateData() {
    var svg = d3.select("body").transition();
    if(currentFile === "TSLA.csv") {
        //I don't know why this doesnt work but it doesnt 
        // d3.csv("XOM.csv").then(function(data) {
        //     data.forEach(function(d) {
        //         d.Date = parseDate(d.Date);
        //         d.AdjClose = +d.AdjClose;
        //     });

            currentFile = "XOM.csv";
            drawFocus(XOMData);
            drawContext(XOMData);
        
    }
    else {
        //I don't know why this doesnt work but it doesnt
        // d3.csv("TSLA.csv").then(function(data) {
        //     data.forEach(function(d) {
        //         d.Date = parseDate(d.Date);
        //         d.AdjClose = +AdjClose;
        //     });
            currentFile = "TSLA.csv";
            drawFocus(TSLAData);
            drawContext(TSLAData);
    }
}


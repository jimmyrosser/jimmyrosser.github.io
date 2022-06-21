margin = ({top: 10, right: 20, bottom: 20, left: 20});
height = 200;
width = 1000;
currentColor = 'red';

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

x = d3.scaleLinear([0, 10], [margin.left, width - margin.right]);
rx = d3.randomUniform(...x.domain())
ry = d3.randomNormal(height / 2, height / 12);

const svg = d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 200);

const brush = d3.brushX()
    .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
    .on("start brush", brushed)
    .on("end", finishedBrushing)

const circle = svg.append("g")
    .attr("fill-opacity", 0.2)
    .selectAll("circle")
    .data(Float64Array.from({length: 800}, rx))
    .join("circle")
        .attr("transform", d => `translate(${x(d)},${ry()})`)
        .attr("r", 3.5);

svg.append("g")
    .call(xAxis);

svg.append("g")
    .call(brush)
    .call(brush.move, [3,5].map(x));

function finishedBrushing(event) {
    if(event.selection === null) {
        const dx = x(1) - x(0);
        const[[cx]] = d3.pointers(event);
        const [x0, x1] = [cx - dx / 2, cx + dx / 2];
        const [X0, X1] = x.range();
        d3.select(this)
            .call(brush.move, x1 > X1 ? [X1 - dx, X1]
                : x0 < X0 ? [X0, X0 + dx]
                : [x0, x1]);           
    }
    else {
        var [brushL, brushR] = d3.brushSelection(this);
        if (brushR - brushL < 50) {
            d3.select(this)
                .call(brush.move, [brushL-25,brushR+25]);
        }
    }
}

function brushed(event) {
    const selection = event.selection;
    console.log(event.type);
    if(selection === null) {
        circle.attr("stroke", null);
    }
    else {
        const [x0, x1] = selection.map(x.invert);
        circle.attr("stroke", d => x0 <= d && d <= x1 ? currentColor : null);
    }
}

function updateViz(colorName) {
    if(colorName === 'green') {
        currentColor = 'green';
        svg.selectAll('circle')
            .filter(function(d) { return d3.select(this).attr('stroke') != null;})
            .attr('stroke', 'green');
    }
    else if (colorName === 'blue') {
        currentColor = 'blue';
        svg.selectAll('circle')
            .filter(function(d) { return d3.select(this).attr('stroke') != null;})
            .attr('stroke', 'blue');
    }
    else {
        tempColor = 'red';
        svg.selectAll('circle')
            .filter(function(d) {
                currStroke = d3.select(this).attr('stroke');
                if (currStroke === 'red') tempColor = 'green';
                if (currStroke === 'green') tempColor = 'blue';
                if (currStroke === 'blue') tempColor = 'red';
                return currStroke != null;
            })
            .attr('stroke', tempColor);
            currentColor = tempColor;
    }
}























//Website Link:
//http://cs.trinity.edu/~jrosser/DataViz/FinalProject/firstViz.html
var margin = {top: 10, right: 20, bottom: 75, left:47},
    width = 1500 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var positionMap = new Map();
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
var banData = null;
var partData = null;

var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-5,0])
      .html(function(d) {
        console.log(d);
        return ("Champion Name: " + (d.target.__data__.name) + "<br>" + "Ban Count: " + (d.target.__data__.countBans));
      });

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
svg.call(tip);

d3.csv("usableParticipants.csv").then(function(data){
    data.forEach(function(d) {
      d.championid = +d.championid;
      positionMap.set(d.championid, d.position);
    });
    partData = data;
    d3.csv("banCount.csv").then(function(otherData){
      otherData.forEach(function(d) {
        d.id = +d.id;
        d.countBans = +d.countBans;
      });
      banData = otherData;
    buildViz(banData);
  });
});
    //console.log(data);

function buildViz(otherData){
  svg.selectAll("*").remove();
    var x = d3.scaleBand().rangeRound([width, 0]);
    var y = d3.scaleLinear().range([height, 0]);

    //Set axis and locations
    var xAxis = d3.axisBottom(x)
      .scale(x)
      .ticks(otherData.length);
    var yAxis = d3.axisLeft(y)
      .scale(y)
      .ticks(10);

    //Set domain of x and y
    x.domain(otherData.map(function(d) {return d.name;}));
    y.domain([0, d3.max(otherData, function(d) { return d.countBans; })]);

    //Add x axis to svg
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-70)");
     
    //Add y axis to svg
    svg.append("g")
      .call(yAxis);
 
    //creating bars
    svg.selectAll(".bar")
      .data(otherData)
      .enter().append("rect")
      .attr("class", "bar")
      .style("fill", d3.rgb(0, 49, 83))
      .attr("x", function(d) {return x(d.name);})
      .attr("width", width / otherData.length - 3)
      .attr("y", function(d) { return y(d.countBans); })
      .attr("height", function(d) { return height - y(d.countBans); })
      .on("mouseover", tip.show);
}
  

function selectionChanged() {
  var x = document.getElementById("lanes");
  if(x.value === "All") {
    buildViz(banData);
    return;
  }
  var newData = banData.filter(function (d) {
    var lane = positionMap.get(d.id);
    console.log(lane);
    console.log(d);
    return (lane === x.value);
  });
  buildViz(newData);
  console.log(x.value);
}
    

var svg = d3.select("svg");
//var circle = svg.selectAll("circle").data([32,64,100,115]);

//circle.attr("r", 30);
//circle.attr("cx",function() {return Math.random() * 650;});
//circle.attr("cx", function(d, i){return i*200+30;});
//var circleEnter = circle.enter().append("circle");
//circleEnter.attr("cy",60);
//circleEnter.attr("cx",500);
//circleEnter.attr("r",20);

svg.selectAll("circle")
    .data([32,64,100,215])
    .enter().append("circle")
    .attr("cy",60)
    .attr("cx", function (d,i) { return i * 200 + 30; })
    .attr("r", function (d) { return Math.sqrt(d); });

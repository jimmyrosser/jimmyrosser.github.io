"use-strict";
//import {context, tone} from 'tone';

//const x1, y1;

var clicks = 0;
var lastClick = [0, 0];

document.getElementById('canvas').addEventListener('click', drawCurve, false);

function getCursorPosition(event) {
    var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    var y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    
    return [x, y];
}

function drawCurve(event) {
    context = this.getContext('2d');

    x = getCursorPosition(event)[0] - this.offsetLeft;
    y = getCursorPosition(event)[1] - this.offsetTop;

    rand = [(Math.floor(Math.random() * 1001)), (Math.floor(Math.random() * 501))];
    
    if (clicks != 1) {
        clicks++;
    } else {
        context.beginPath();
        context.moveTo(lastClick[0], lastClick[1]);
        context.bezierCurveTo(lastClick[0], lastClick[1], rand[0], rand[1], x, y);
        var d = getDistance(lastClick[0], lastClick[1], x, y);
        context.lineWidth = 7;
        context.strokeStyle = getCurveColor(parseInt(d));
        console.log(parseInt(d));
        context.stroke();
        
        clicks = 0;
    }
    
    lastClick = [x, y];
};

function getDistance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return(Math.sqrt(a*a + b*b))
}

function getCurveColor(d) {
    if(d >= 0 && d <= 83) {
        console.log(d)
        return("#FF0000"); //red
    }
    else if(d > 83 && d <= 166) return("#FF4500"); //red orange
    else if(d > 166 && d <= 249) return("#FFA500"); //orange
    else if(d > 249 && d <= 332) return("#F8D568"); //orange yellow
    else if(d > 332 && d <= 415) return("#FFFF00"); //yellow
    else if(d > 415 && d <= 498) return("#9ACD32"); //yellow green
    else if(d > 498 && d <= 581) return("#00FF00"); //green
    else if(d > 581 && d <= 664) return("#0D98BA"); //blue green
    else if(d > 664 && d <= 747) return("#0000FF"); //blue
    else if(d > 747 && d <= 830) return("#8A2BE2"); //blu violet
    else if(d > 830 && d <= 913) return("#7F00FF"); //violet
    else if(d > 913 && d <= 996) return("#C71585"); //red violet
    else return("#000000");
}

//x coordinated determines note
//divide x axis randomly at the start of each page reload
//y coordinate determines sharp, flat, etc
//redivid y axis at the start of each page load

//make array with note values
//randomly draw one (and remove it) each reload

//draw curved lines from each click
//right click to end line
//color is based on length of line
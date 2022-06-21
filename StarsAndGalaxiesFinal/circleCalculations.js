//define the canvas and context variables to draw on
let canvas1, context1;
let canvas2, context2;

//define mouse position and painting flag variables
let coord = {x:0, y:0};
let painting = false;

//define image data variables
let imageData1;
let imageData2;

//init function that happens on load
//grabs the canvas from HTML document and assings it to canvas variable
//defines contexts for both canvases
function init() {
    canvas1 = document.getElementById("canvas1");
    context1 = canvas1.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    context2 = canvas2.getContext("2d");
}
//call init on load
document.addEventListener("DOMContentLoaded", init);

//add event listeners for mouse movements
window.addEventListener('load', () => {
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});

//get current position of mouse
function getPosition(event) {
    coord.x = event.pageX - canvas2.offsetLeft;
    coord.y = event.pageY - canvas2.offsetTop;
}

//function to begin drawing on the canvas
function startPainting(event) {
    //change flag to true
    painting = true;
    //get current mouse position
    getPosition(event);
}

//function to stop painting on the canvas
function stopPainting() {
    //change flag to false
    painting = false;
}

//function to continue drawing while mouseclick is held down
function sketch(event) {
    //check painting flag
    if(!painting) return;

    //start the drawing on the canvas
    context2.beginPath();
    //set line width
    context2.lineWidth = 3;
    //set line style
    context2.lineCap = 'round';
    //set line color
    context2.strokeStyle = "#c414ff";
    //move drawing to where player moved mouse
    context2.moveTo(coord.x, coord.y);
    //get new mouse position
    getPosition(event);
    //drawe a line to that point
    context2.lineTo(coord.x, coord.y);
    //add the line to the canvas
    context2.stroke();
}

//loop through the pixel array and find the top-most pixel to get top edge of drawn shape
function findTopEdge(pixels) {
    let topFound = [false, 0, 0];
    for(let i = pixels.length-1; i > 0; i--) {
        for(let j = pixels[i].length-1; j > 0; j--) {
            if(pixels[j][i] !== 0) {
                topFound = [true, j, i];
            }
        }
    }
    return [topFound[1], topFound[2]];
}

//loop through the pixel array and find the bottom-most pixel to get bottom edge of drawn shape
function findBotEdge(pixels) {
    let botFound = [false, 0, 0];
    for(let i = 0; i < pixels.length; i++) {
        for(let j = 0; j < pixels[i].length; j++) {
            if(pixels[j][i] !== 0) {
                botFound = [true, j, i];
            }
        }
    }
    return [botFound[1], botFound[2]];
}

//loop through the pixel array and find the left-most pixel to get left edge of drawn shape
function findLeftEdge(pixels) {
    let leftFound = [false, 0, 0];
    for(let i = pixels.length-1; i > 0; i--) {
        for(let j = pixels[i].length-1; j > 0; j--) {
            if(pixels[i][j] !== 0) {
                leftFound = [true, i, j];
            }
        }
    }
    return [leftFound[1], leftFound[2]];
}

//loop through the pixel array and find the right-most pixel to get right edge of drawn shape
function findRightEdge(pixels) {
    let rightFound = [false, 0, 0];
    for(let i = 0; i < pixels.length; i++) {
        for(let j = 0; j < pixels[i].length; j++) {
            if(pixels[i][j] !== 0) {
                rightFound = [true, i, j];
            }
        }
    }
    return [rightFound[1], rightFound[2]];
}

//get image data from the canvases
function getCircle() {
    //get image data of left canvas
    imageData1 = context1.getImageData(0, 0, canvas1.width, canvas1.height).data;
    //get image data of right canvas
    imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height).data;

    //define circles
    let circle1 = findCircleDims(imageData1, canvas1);
    let circle2 = findCircleDims(imageData2, canvas2);

    //define areas of circles based on prior calculations
    let circle1Area = calculateArea(circle1);
    let circle2Area = calculateArea(circle2);

    //define diff variable to store ratio between two circles
    let diff;
    //if the pre-drawn circle is larger than the player-drawn circle
    if(circle1Area > circle2Area) {
        //divide the pre-drawn circle by the player-drawn circle
        diff = circle1Area / circle2Area;
    }
    //if the player-drawn circle is larger than the pre-drawn circle
    else if(circle2Area > circle1Area) {
        //divide the player-drawn circle by the pre-drawn circle
        diff = circle2Area / circle1Area;
    }
    //if the circles are equal
    else {
        //an error has occured, set diff to 0
        diff = 0;
    }

    //calculate the closeness ratio between 
    //the target ratio (between the pre-defined areas in the level functions)
    //and the diff (between the pre-drawn circle and the player-drawn circle)
    let ratio = diff / targetRatio;
    
    //check if the ratio is within the following threshold to be considered "correct"
    if(ratio < 1.20 && ratio > 0.80) {
        //call the update function with true (for correct answer) and the area of the circle, and the diff variable
        updateAnswerText(true, circle1Area, ratio);
    }
    else {
        //call the update function with false (for incorrect answer) and the area of the circle, and the diff variable
        updateAnswerText(false, circle1Area, ratio);
    }

}

//find the dimensions (top, left, bottom right) of the player-drawn circle from the image data
//there are 4 values in the image data for each pixel (red, green, blue, and alpha)
function findCircleDims(imageData, canvas) {
    //create an 1d array to store the pixels in a 2d representation
    let canvasPixels = new Array(canvas.width);
    //loop through the image data
    for(let p = 0, k = -1, c = 0; p < imageData.length && k < canvasPixels.length; p+=4) {
        //split pixels into columns by the width of the canvas
        if(c % canvas.width === 0) {
            //increment column counter
            k++;
            //add array to canvasPixels array to get 2d array
            canvasPixels[k] = [];
        }
        //add the red value of each pixel to the 2d array
        canvasPixels[k].push(imageData[p])
        //increment the row counter
        c++;
    }
    //call functions with canvasPixels to get each edge of the player-drawn circle
    let top = findTopEdge(canvasPixels);
    let bot = findBotEdge(canvasPixels);
    let left = findLeftEdge(canvasPixels);
    let right = findRightEdge(canvasPixels);

    //return the arrays in a readable and useful fashion
    return [[top[0], top[1]],[bot[0], bot[1]],[left[0], left[1]],[right[0], right[1]]];
}

//calculate the area of an ellipse from four points on the edges
function calculateArea([top, bot, left, right]) {
    let a = Math.abs(top[1] - bot[1]) / 2;
    let b = Math.abs(left[0]- right[0]) / 2;

    return (a * b * Math.PI);
}
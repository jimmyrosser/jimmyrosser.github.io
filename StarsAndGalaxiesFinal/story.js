//global variables

//current level number
let level = 1;
//total number of levels
let numLevels = 18;
//HTML title elemnt
let levelTitle = document.getElementById("levelTitleText");
//HTML description element
let levelDescription = document.getElementById("levelDescriptionText");
//HTML combobox element
let comboBox = document.getElementById("level");
//HTML answer element
let answerResult = document.getElementById("answerResult");
//the ratio between areas that the user is trying to achieve
let targetRatio;
//the area of the first object
let area1;
//the area of the second object 
let area2;
//the physical radius of the first object's circle on the canvas
let exampleRadius;
//the name of the first object
let object1;
//the name of the second object
let object2;
//boolean flag to signal that the game has begun
let beginFlag = false;
//color of pre-drawn circles
let exampleColor = "#58C4C6";
//add listener to the combobox to update the level when it is changed
document.getElementById("level").addEventListener('change', updateLevel);

//function that begins the game
function begin() {
    //add all hiden elemnts onto the canvas
    comboBox.style.display = "inline";
    document.getElementById("levelSelectorPrev").style.display = "inline";
    document.getElementById("levelSelectorNext").style.display = "inline";
    document.getElementById("clearCanvasButton").style.display = "inline";
    document.getElementById("checkAnswerButton").style.display = "inline";
    //begin the first level
    levelOne();
}

//update the level variable with the value selected in the combobox
function updateFromSelection() {
    level = document.getElementById("level").value
}

//begins the level that is specified by the level variable
function updateLevel() {
    if(level == 1) {
        levelOne();
    }
    else if(level == 2) {
        levelTwo();
    }
    else if(level == 3) {
        levelThree();
    }
    else if(level == 4) {
        levelFour();
    }
    else if(level == 5) {
        levelFive();
    }
    else if(level == 6) {
        levelSix();
    }
    else if(level == 7) {
        levelSeven();
    }
    else if(level == 8) {
        levelEight();
    }
    else if(level == 9) {
        levelNine();
    }
    else if(level == 10) {
        levelTen();
    }
    else if(level == 11) {
        levelEleven();
    }
    else if(level == 12) {
        levelTwelve();
    }
    else if(level == 13) {
        levelThirteen();
    }
    else if(level == 14) {
        levelFourteen();
    }
    else if(level == 15) {
        levelFifteen();
    }
    else if(level == 16) {
        levelSixteen();
    }
    else if(level == 17) {
        levelSeventeen();
    }
    else if(level == 18) {
        levelEighteen();
    }
    //start from beginning if end is reached
    else if(level > numLevels) {
        levelOne();
        level = 1;
    }
    //go to end if beginning is reached
    else if(level < 1) {
        levelEighteen();
        level = 18;
    }
}


//increases the level variable when the "next" button is clicked
function nextLevel() {
    level++;
    updateLevel();
}

//decreases the level variable when the "previous" button is clicked
function previousLevel() {
    level--;
    updateLevel();
}

//completely clears both canvases
function clearBothCanvases() {
    context1.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
}

//clears the player's drawing canvas to let them start over
function clearCanvas() {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
}

//level function
function levelOne() {
    //hide the begin button
    document.getElementById("beginButton").style.display = "none";
    //set answer result to empty because there is no answer yet
    answerResult.innerHTML = "";
    //area of object 1
    area1 = 0.004;
    //area of object 2
    area2 = 0.97;
    //object 1
    object1 = "a House";
    //object 2
    object2 = "a Neighborhood";
    //set physical radius of pre-drawn circle
    exampleRadius = 4
    //set target ratio based on area1 and area2
    targetRatio = getTargetRatio(area1, area2);
    //set the combobox value to the correct number
    comboBox.value = 1;
    //change the title text
    levelTitle.innerHTML = "Level One";
    //remove any drawings left on either canvas
    clearBothCanvases();

    //update level description for player to read
    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    //draw pre-drawn circle for player to observe
    context1.beginPath();
    //set line thickness
    context1.lineWidth = 3;
    //set color
    context1.strokeStyle = exampleColor;
    //draw physical circle with example radius in the middle of the cavas
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    //draw the circle
    context1.stroke();
}

function levelTwo() {
    answerResult.innerHTML = "";
    area1 = 0.97;
    area2 = 783.73;
    object1 = "a Neighborhood";
    object2 = "New York City";
    exampleRadius = 6;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 2;
    levelTitle.innerHTML = "Level Two";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2  + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelThree() {
    answerResult.innerHTML = "";
    area1 = 783.73;
    area2 = 695663;
    object1 = "New York City";
    object2 = "Texas";
    exampleRadius = 3;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 3;
    levelTitle.innerHTML = "Level Three";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelFour() {
    answerResult.innerHTML = "";
    area1 = 695663;
    area2 = 9147420;
    object1 = "Texas";
    object2 = "the United States";
    exampleRadius = 16;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 4;
    levelTitle.innerHTML = "Level Four";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelFive() {
    answerResult.innerHTML = "";
    area1 = 9147420;
    area2 = 509968658.925;
    object1 = "the United States";
    object2 = "the Earth";
    exampleRadius = 7;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 5;
    levelTitle.innerHTML = "Level Five";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelSix() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(3474.8);
    object1 = "the Earth";
    object2 = "the Moon";
    exampleRadius = 200;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 6;
    levelTitle.innerHTML = "Level Six";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelSeven() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(4879.4);
    object1 = "the Earth";
    object2 = "Mercury";
    exampleRadius = 200;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 7;
    levelTitle.innerHTML = "Level Seven";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelEight() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(12104);
    object1 = "the Earth";
    object2 = "Venus";
    exampleRadius = 200;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 8;
    levelTitle.innerHTML = "Level Eight";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelNine() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(6779);
    object1 = "the Earth";
    object2 = "Mars";
    exampleRadius = 200;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 9;
    levelTitle.innerHTML = "Level Nine";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelTen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(116460);
    object1 = "the Earth";
    object2 = "Saturn";
    exampleRadius = 20;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 10;
    levelTitle.innerHTML = "Level Ten";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelEleven() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(49244);
    object1 = "the Earth";
    object2 = "Neptune";
    exampleRadius = 40;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 11;
    levelTitle.innerHTML = "Level Eleven";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelTwelve() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(50724);
    object1 = "the Earth";
    object2 = "Uranus";
    exampleRadius = 40;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 12;
    levelTitle.innerHTML = "Level Twelve";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelThirteen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(2376.6);
    object1 = "the Earth";
    object2 = "Pluto";
    exampleRadius = 200;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 13;
    levelTitle.innerHTML = "Level Thirteen";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelFourteen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(12742);
    area2 = getAreaFromDiameter(139820);
    object1 = "the Earth";
    object2 = "Jupiter";
    exampleRadius = 20;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 14;
    levelTitle.innerHTML = "Level Fourteen";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelFifteen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(139820);
    area2 = getAreaFromDiameter(1392700);
    object1 = "Jupiter";
    object2 = "the Sun";
    exampleRadius = 20;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 15;
    levelTitle.innerHTML = "Level Fifteen";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelSixteen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(149600000*2);
    area2 = getAreaFromDiameter(778000000*2);
    object1 = "Earth's Orbit";
    object2 = "Jupiter's Orbit";
    exampleRadius = 20;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 16;
    levelTitle.innerHTML = "Level Sixteen";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelSeventeen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(778000000*2);
    area2 = getAreaFromDiameter(5906380000*2);
    object1 = "Jupiter's Orbit";
    object2 = "Pluto's Orbit";
    exampleRadius = 25;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 17;
    levelTitle.innerHTML = "Level Seventeen";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

function levelEighteen() {
    answerResult.innerHTML = "";
    area1 = getAreaFromDiameter(5906380000*2);
    area2 = getAreaFromDiameter(287460000000);
    object1 = "Pluto's Orbit";
    object2 = "the Solar System";
    exampleRadius = 8;
    targetRatio = getTargetRatio(area1, area2);
    comboBox.value = 18;
    levelTitle.innerHTML = "Level Eighteen";
    clearBothCanvases();

    levelDescription.innerHTML = "If the circle on the left is " + object1 + ", draw a circle on the right that would be the size of " + object2 + ".";

    context1.beginPath();
    context1.lineWidth = 3;
    context1.strokeStyle = exampleColor;
    context1.arc(canvas1.width / 2, canvas1.height / 2, exampleRadius, 0, 2 * Math.PI);
    context1.stroke();
}

//change the answer text based on the result from the player's circle comparison to the pre-drawn circle
function updateAnswerText(correct, circ1, percentage) {
    //if thir circle is within the threshold
    if(correct) {
        //update answer text
        answerResult.innerHTML = "Correct! " + object1 + " is " + area1 + " square kilometers and " + object2 + " is " + area2 + " square kilometers. You drew " + (percentage*100).toFixed(1) + "% of the area of " + object2 + "!";
        //calculte the area of the circle that they should have drawn 
        let correctArea = circ1 * (area2 / area1);
        //get the radius of that circle based on the area
        let r = Math.sqrt(correctArea / Math.PI);
        //draw the "perfect" circle
        context2.beginPath();
        //set line width
        context2.lineWidth = 3;
        //set color
        context2.strokeStyle = "#1be028";
        //actually draw the circle based on r in the center of the cavas
        context2.arc(canvas2.width / 2, canvas2.height / 2, r, 0, 2 * Math.PI);
        //add the circle to the canvas
        context2.stroke();

        //superimpose the pre-drawn circle on top of the player-drawn circle for comparison
        context2.beginPath();
        //set line width
        context2.lineWidth = 3;
        //set color
        context2.strokeStyle = "#38A3A5";
        //actually draw the circle based on example radius in the center of the canvas
        context2.arc(canvas2.width / 2, canvas2.height / 2, exampleRadius, 0, 2 * Math.PI);
        //add circle to the canvas
        context2.stroke();
    }
    else {
        //same steps as aboveif statement besides answer text
        answerResult.innerHTML = "Incorrect! " + object1 + " is " + area1 + " square kilometers and " + object2 + " is " + area2 + " square kilometers. You drew " + (percentage*100).toFixed(1) + "% of the area of " + object2 + "!";
        //clearCanvas();
        let correctArea = circ1 * (area2 / area1);
        console.log("Correct Area: " + correctArea);
        let r = Math.sqrt(correctArea / Math.PI);
        context2.beginPath();
        context2.lineWidth = 3;
        context2.strokeStyle = "#1be028";
        context2.arc(canvas2.width / 2, canvas2.height / 2, r, 0, 2 * Math.PI);
        context2.stroke();
        context2.beginPath();
        context2.lineWidth = 3;
        context2.strokeStyle = "#38A3A5";
        context2.arc(canvas2.width / 2, canvas2.height / 2, exampleRadius, 0, 2 * Math.PI);
        context2.stroke();
    }
}

//get the area of a circle/ellipse from only the diameter
function getAreaFromDiameter(d) {
    return Math.round((4 * Math.PI * Math.pow((d/2), 2)));
}

//process target ratio and calculate it correctly based on their sizes
function getTargetRatio(a1, a2) {
    if(a1 > a2) {
        return a1/a2;
    }
    else if(a2 > a1) {
        return a2/a1;
    }
    else {
        return 0;
    }
}

//get the area of an ellipse
function getEllipseArea(a, b) {
    return (Math.PI * a * b);
}

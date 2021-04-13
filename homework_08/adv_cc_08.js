var detector;
var cameraVid;
var yesCounter = 0;
var noCounter = 0;
var textCounter = "";
var thingsID = "";
var objectList = [];

function preload(){
  detector = ml5.objectDetector("cocossd");
}

function setup() {
    createCanvas(windowHeight, windowWidth);
    cameraVid = createCapture(VIDEO, videoLoaded);
    var guessButton = select('#guess');
    guessButton.mousePressed(guessFunction);
    var yesButton = select('#yes');
    yesButton.mousePressed(yesFunction);
    var noButton = select('#no');
    noButton.mousePressed(noFunction);
}

function videoLoaded(){
    cameraVid.size(640, 480);
    cameraVid.hide();
    detector.detect(cameraVid, objectsIDed);
}

function objectsIDed(error, results){
    if(error){
        console.error(error);
    } 
    else {
        objectList = results;
        detector.detect(cameraVid, objectsIDed);
    }
}

function counterText() {
    stroke(0);
    textSize(20);
    fill('white');
    text("Number of correct guesses: " + yesCounter, 0, 550);
    text("Number of incorrect guesses: " + noCounter, 0, 580);
}

function guessFunction() {
    background(0);
    textSize(20);
    fill('white');
    for (var i = 0; i < objectList.length; i++){
        thingsID = objectList[i].label;
        textCounter = textCounter + thingsID + ", ";
    }
}

function draw() {
    background(0)
    image(cameraVid, 0, 0, 640, 480);
    text("Spotted objects are: " + textCounter + "  ", 0, 520);
    counterText();
}

function yesFunction()  {
    yesCounter++
}

function noFunction()  {
    noCounter++
}
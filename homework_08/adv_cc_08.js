var detector;
var cameraVid;
var yesCounter = 0;
var noCounter = 0;
var textCounter = "";
var objectResults = [];

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
        objectResults = results;
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
    for (var i = 0; i < objectResults.length; i++){
        textCounter = textCounter + objectResults[i];
    }
}

function draw() {
    background(0)
    image(cameraVid, 0, 0, 640, 480);
    text("Spotted objects are: " + textCounter, 0, 520);
    counterText();
}

function yesFunction()  {
    yesCounter++
}

function noFunction()  {
    noCounter++
}













// var detector;
// var cameraVid;
// var yesCounter = 0;
// var noCounter = 0;
// var textCounter = "";
// // var randomHeight = (0, 1000);
// // var randomWidth = (0, 1000);
// // var thingsID = "";
// //var ran = random(50, 200);
// var objectResults = [];

// function preload(){
//   detector = ml5.objectDetector("cocossd");
// }

// function setup() {
//     createCanvas(windowHeight, windowWidth);
//     cameraVid = createCapture(VIDEO, videoLoaded);
//     var guessButton = select('#guess');
//     guessButton.mousePressed(guessFunction);
//     var yesButton = select('#yes');
//     yesButton.mousePressed(yesFunction);
//     var noButton = select('#no');
//     noButton.mousePressed(noFunction);
//     // counterText();
// }

// function videoLoaded(){
//     cameraVid.size(640, 480);
//     cameraVid.hide();
//     detector.detect(cameraVid, objectsIDed);
// }

// // callbacks on ml5 functions are error first
// function objectsIDed(error, results){
//     if(error){
//         console.error(error);
//     } 
//     else {
//         //console.log(results);
//         objectResults = results;
//         // function calling itself is called a recursive function
//         detector.detect(cameraVid, objectsIDed);
//         // for(var i = 0; i < results.length; i++){
//         //     textSize(20);
//         //     fill('white');
//         //     thingsID = results[i].label;
//         //     text(thingsID, results[i].x, results[i].y);
//         //     //image(cameraVid, randomHeight, randomWidth, ran, ran);
//         // }
//     }
// }

// function counterText() {
//     stroke(0);
//     textSize(20);
//     fill('white');
//     // for (var i = 0; i < thingsID.length; i++){
//     //     textCounter = textCounter + thingsID[i];
//     // }
//     // text("Spotted objects are: " + textCounter, 0, 520);
//     text("Number of correct guesses: " + yesCounter, 0, 550);
//     text("Number of incorrect guesses: " + noCounter, 0, 580);
// }

// function draw() {
//     background(0)
//     // filter(BLUR, 1);
//     // cameraVid.size(640, 480);
//     image(cameraVid, 0, 0, 640, 480);
//     counterText();
// }

// function guessFunction() {
//     background(0);
//     textSize(20);
//     fill('white');
//     // for(var i = 0; i < objectResults.length; i++){
//     //     thingsID = objectResults[i].label;
//     //     //text(thingsID, objectResults[i].x, objectResults[i].y);
//     // }
//     for (var i = 0; i < objectResults.length; i++){
//         textCounter = textCounter + objectResults[i];
//     }
//     text("Spotted objects are: " + textCounter, 0, 520);
// //     // // cameraVid.size(ran, ran);
// //     // image(cameraVid, randomHeight, randomWidth, ran, ran);
// //     // for(var i = 0; i < objectResults.length; i++){
// //     //     // stroke(0);
// //     //     textSize(20);
// //     //     fill('white');
// //     //     text("Spotted object is: " + objectResults[i].label, objectResults[i].x, objectResults[i].y);
// //     //     // draw bounding box
// //     //     // stroke(0,255,0);
// //     //     // strokeWeight(5);
// //     //     // noFill();
// //     //     // rect(objectResults[i].x, objectResults[i].y, objectResults[i].width, objectResults[i].height);
// //     //     // write object label
// //     //     // stroke(0);
// //     //     // textSize(32);
// //     //     // strokeWeight(1);
// //     //     // text(obj.label, obj.x + 10, obj.y + 10);
// //     // }
// }

// function yesFunction()  {
//     yesCounter++
//     // console.log(yesCounter);
// }

// function noFunction()  {
//     noCounter++
//     // console.log(noCounter);
// }
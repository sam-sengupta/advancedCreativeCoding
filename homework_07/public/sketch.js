
var socket;
var trianglebutton, colorbutton, concbutton, clearbutton;
var patternType;
var slider;
function setup() {
    createCanvas(1000,1000);
    socket = io.connect('http://localhost:3000');
    background('black');

    socket.on('pattern', newDrawing);

    patternType = 0;
    trianglebutton = select('#triangle');
    colorbutton = select('#color');
    concbutton = select('#conc');

    trianglebutton.mousePressed(makeTriangles);
    colorbutton.mousePressed(makeColors);
    concbutton.mousePressed(makeConcs);

    slider = createSlider(2,100,0);
}

function makeTriangles(){
    patternType = 1;
}
  
function makeColors(){
    patternType = 2;
}
  
function makeConcs(){
    patternType = 3;
}

function newDrawing(data){
    if(patternType == 1) {
        push(); 
        translate(data.x, data.y);  
        noStroke(); 
        for (var i = 0; i < random(100); i++) { 
            fill(random(255), random(255), random(255));
            var b = random(80); 
            rotate(radians(data.size)); 
            triangle(0, 20, b, 20, 20, 20);
        } 
        pop();
    }
    else if(patternType == 2) {
        push(); 
        for (var i = 1; i < 5; i++) { 
            stroke(random(255), random(255), random(255));
            noFill();
            ellipse(data.x, data.y, data.size, data.size)
        } 
        pop();
    }
    else if(patternType == 3) {
        push();
        translate(data.x, data.y);
        noFill(); 
        for (var i = 1; i < random(5); i++) {
            stroke('#FD0D79');
            ellipse(0, 0, i * data.size, i * data.size);
        } 
        pop();
    }
}

function draw() {
}

function mouseDragged(){
    if(patternType == 1) {
        push(); 
        translate(mouseX, mouseY); 
        noStroke(); 
        for (var i = 0; i < random(100); i++) { 
            fill(random(255), random(255), random(255));
            var b = random(80); 
            rotate(radians(slider.value())); 
            triangle(0, 20, b, 20, 20, 20);
        } 
        pop();
    }
    else if(patternType == 2) {
        push(); 
        for (var i = 1; i < 5; i++) { 
            stroke(random(255), random(255), random(255));
            noFill();
            ellipse(mouseX, mouseY, slider.value(), slider.value());
        } 
        pop();
    }
    else if(patternType == 3) {
        push();
        translate(mouseX, mouseY);
        noFill(); 
        for (var i = 1; i < random(5); i++) {
            stroke('#FD0D79');
            ellipse(0, 0, i * slider.value(), i * slider.value());
        } 
        pop();
    }

    var data = {
        x: mouseX,
        y: mouseY,
        size: slider.value()
    };

    socket.emit('pattern', data);
}

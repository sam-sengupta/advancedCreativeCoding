var numberofPoints = 20;
var trianglegridSize;
var triangleshape = [];
var slider1;
var slider2;
var startStop = false;
function setup() {
	createCanvas(windowWidth, windowHeight);
  var myButton = select('#first');
  myButton.mousePressed(startTriangles);
  trianglegridSize = width/numberofPoints;
	for (var i = 0; i < width; i += trianglegridSize){
    for (var j = 0; j < height; j += trianglegridSize){
      triangleshape.push(new Triangles(i, j))
    }
  }
  createP("pixelify!")
  slider1 = createSlider(0, 100, 0);
  createP("adjust flash speed (at your own risk)")
  slider2 = createSlider(-2, 2, 0);
}

function startTriangles() {
  startStop =! startStop
}
function draw() {
  background(0);
  noStroke();
  for(var i = 0; i < triangleshape.length; i++){
    if (startStop){
      triangleshape[i].colorchange();
    }
    triangleshape[i].render();
  }
}
class Triangles{
  constructor(x,y){
    this.x = x;
    this.y = y;
		this.trstartingCol = color(random(255), random(255), random(255));
    this.trendingCol = color(random(255), random(255), random(255));
    this.bgValue = random();
    this.newCosValue = random(0.01, 0.9);
  }

  render() {
    var backgroundColor = lerpColor(this.trstartingCol, this.trendingCol, cos(this.bgValue));
    fill(backgroundColor);
    triangle(this.x, this.y, (this.x + trianglegridSize + slider1.value()), this.y, this.x, (this.y + trianglegridSize + slider1.value()));
  }

  colorchange(){
    this.bgValue = this.bgValue + this.newCosValue + slider2.value();
  }
}




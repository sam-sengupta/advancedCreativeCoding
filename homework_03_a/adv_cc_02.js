var numberofPoints = 100;
var trianglegridSize;
var triangleshape = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	trianglegridSize = width/numberofPoints;
	for (var i = 0; i < width; i += trianglegridSize){
    for (var j = 0; j < height; j += trianglegridSize){
      triangleshape.push(new Triangles(i, j))
    }
  }
}
function draw() {
  background(0);
  for(var i = 0; i < triangleshape.length; i++){
    triangleshape[i].colorchange();
    triangleshape[i].render();
  }
}
class Triangles{
  constructor(x,y){
    this.x = x;
    this.y = y;
    // this.trstartingCol = color(168, 94, 235);
		this.trstartingCol = color(random(255), random(255), random(255));
    this.trendingCol = color(random(255), random(255), random(255));
    this.bgValue = random();
    this.newCosValue = random(0.01, 0.9);
  }

  render() {
    var backgroundColor = lerpColor(this.trstartingCol, this.trendingCol, cos(this.bgValue));
    fill(backgroundColor);
    triangle(this.x, this.y, (this.x + trianglegridSize), this.y, this.x, (this.y + trianglegridSize));
  }

  colorchange(){
    this.bgValue+=this.newCosValue;
  }
}




var evening; var fall; var morning; var night; var noon; var rain; var snow; var spring; var summer; var sun; var wind; var winter;
var table;
var headers = [];
var dropdown;
var images = [];
var circles = [];
var circleCounter = 0;

function preload(){
  evening = loadImage("evening.PNG");
  fall = loadImage("fall.PNG");
  morning = loadImage("morning.PNG");
  night = loadImage("night.PNG");
  noon = loadImage("noon.PNG");
  rain = loadImage("rain.PNG");
  snow = loadImage("snow.PNG");
  spring = loadImage("spring.PNG");
  summer = loadImage("summer.PNG");
  sun = loadImage("sun.PNG");
  wind = loadImage("wind.PNG");
  winter = loadImage("winter.PNG");
  table = loadTable('responses.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);

  headers = [table.columns[1],table.columns[2],table.columns[3],table.columns[4]];

  dropdown = createSelect();
  dropdown.position(10,10);
  dropdown.option("which question?", 0)
  dropdown.option(headers[0], 1);
  dropdown.option(headers[1], 2);
  dropdown.option(headers[2], 3);
  dropdown.option(headers[3], 4);
  for(var i = 0; i < table.getRowCount(); i++){
    for(var j = 0; j < (table.getColumnCount() - 1); j++){
      images.push(new makingImages(table.getString(i, j)));
    }
  }
  for(var a = 0; a < table.getRowCount(); a++){
    circles.push(new makingCircles(table.getNum(a, 4)));
		circleCounter++;
  }
}

function draw() {
  background(0);
  if(dropdown.value() == 1){
    background(0);
    for(var i = 0; i < images.length; i++){
      images[i].whichSeason();
			images[i].move();
    }
  } 
  else if(dropdown.value() == 2){
    background(0);
    for(var b = 0; b < images.length; b++){
      images[b].whichWeather();
			images[b].move();
    }
  }
  else if(dropdown.value() == 3){
    background(0);
    for(var c = 0; c < images.length; c++){
      images[c].timeofDay();
			images[c].move();
    }
  }
  else if(dropdown.value() == 4){
    background(0);
    for(var d = 0; d < circles.length; d++){
      circles[d].render();
			circles[d].move();
    }
  }
}

class makingImages{
  constructor(season){
    this.season = season;
    this.x = random(width);
    this.y = 10;
    this.speedY = random(1, 10);
  }

  move(){
    this.y += this.speedY;
    if (this.y > windowHeight || this.y < 0){
      this.speedY*= -1;
    }
  }

  timeofDay(){
    var eveningcounter = 0; var morningcounter = 0; var nightcounter = 0; var nooncounter = 0;
    if (this.season == 'evenings (dusk)') {
      eveningcounter++
      for (var i = 0; i <= eveningcounter; i++) {
        image(evening, this.x, this.y, 150, 200);
      }
    }
    else if(this.season == 'early morning (dawn)') {
      morningcounter++
      for (var k = 0; k <= morningcounter; k++) {
        image(morning, this.x, this.y, 150, 200);
      }
    }
    else if(this.season == 'late night') {
      nightcounter++
      for (var l = 0; l <= nightcounter; l++) {
        image(night, this.x, this.y, 150, 200);
      }
    }
    else{
      nooncounter++
      for (var m = 0; m <= nooncounter; m++) {
        image(noon, this.x, this.y, 120, 120);
      }
    }
  }

  whichSeason(){
    var fallcounter = 0; var springcounter = 0; var summercounter = 0; var wintercounter = 0;
    if(this.season == 'fall') {
      fallcounter++
      for (var i = 0; i <= fallcounter; i++) {
        image(fall, this.x, this.y, 150, 150);
      }
    }
    else if(this.season == 'spring') {
      springcounter++
      for (var n = 0; n <= springcounter; n++) {
        image(spring, this.x, this.y, 150, 200);
      }
    }
    else if(this.season == 'summer') {
      summercounter++
      for (var o = 0; o <= summercounter; o++) {
        image(summer, this.x, this.y, 150, 200);
      }
    }
    else{
      wintercounter++
      for (var p = 0; p <= wintercounter; p++) {
        image(winter, this.x, this.y, 150, 150);
      }
    }
  }

  whichWeather(){
    var raincounter = 0; var snowcounter = 0; var suncounter = 0; var windcounter = 0;
    if(this.season == 'raining') {
      raincounter++
      for (var i = 0; i <= raincounter; i++) {
        image(rain, this.x, this.y, 150, 200);
      }
    }
    else if(this.season == 'snowing') {
      snowcounter++
      for (var q = 0; q <= snowcounter; q++) {
        image(snow, this.x, this.y, 150, 200);
      }
    }
    else if(this.season == 'sunny') {
      suncounter++
      for (var r = 0; r <= suncounter; r++) {
        image(sun, this.x, this.y, 150, 200);
      }
    }
    else{
      windcounter++
      for (var s = 0; s <= windcounter; s++) {
        image(wind, this.x, this.y, 150, 200);
      }
    }
  }
}

class makingCircles{
  constructor(diameter){
		this.x = random(width);
    this.y = 10;
    this.speedY = random(1, 10);
    this.diameter = diameter;
  }
	move() {
		this.y += this.speedY;
		if (this.y > windowHeight || this.y < 0){
		this.speedY *= -1;
		}
	}
  render(){
    strokeWeight(10);
    stroke('white');
    fill('black');
		for (var i = 0; i <= circleCounter; i++) {
			circle(this.x, this.y, (this.diameter + 3) * 7);
		}
  }
}
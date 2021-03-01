var product_data;
var input;
var main_url = "https://makeup-api.herokuapp.com/api/v1/products.json?product_type="
var productName = "blush"
var products = [];

function preload(){
  var url = main_url + productName;
  loadJSON(url, getProduct);
}

function getProduct(product){
  product_data = product;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    var button = select('button');
    input = select('#product');
    button.mousePressed(updateBrand);
}

function updateBrand(){
    finalUrlPart = '' + input.value();
    var url = main_url + finalUrlPart;
    loadJSON(url, getProduct);
    products = [];
    for (var i = 0; i < product_data.length - 1; i++) {
        products.push(new writingText(input.value()));
    }
}

function draw() {
    background('#FAA1AC');
    for (var i = 0; i < products.length; i++) {
        products[i].warping();
        products[i].writing();
    }
}

class writingText{
    constructor(productType) {
        this.string = productType;
        this.x = random(0, width);
        this.y = random(0, height);
        this.speedY = random(-3, 3);
        this.speedX = random(-3, 3);
    }
    warping() {
        this.x += this.speedX;
		if (this.x > windowWidth || this.x < 0){
            this.speedX *= -1;
        }
        this.y += this.speedY;
		if (this.y > windowHeight || this.y < 0){
            this.speedY *= -1;
        }
    }
    writing() {
        textSize(25);
        fill('white');
        text("Test: " + this.string, this.x, this.y);
    }  
}
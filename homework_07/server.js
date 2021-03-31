console.log("Hello! UwU");

const Twit = require("twit");
const request = require("request");
const fs = require("fs");
const config = require("./config.js");
var T = new Twit(config)

var main_url = "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick";
var brand = "";
var name = "";
var price_sign = "";
var price = "";
var currency = "";

var tweet;

botTweet();

setInterval(botTweet, 24*60*60*1000);

function botTweet(error, data, response) {
	request(main_url, gotData);

	function gotData(error, response, body){
		var lipsticks = JSON.parse(body);
		var randomlipstick = Math.floor(Math.random() * lipsticks.length);
		var image_url = lipsticks[randomlipstick].image_link;
		brand = lipsticks[randomlipstick].brand;
		name = lipsticks[randomlipstick].name;
		price_sign = lipsticks[randomlipstick].price_sign;
		price = lipsticks[randomlipstick].price;
		currency = lipsticks[randomlipstick].currency;
		tweet = "Your lipstick for today is " + brand + "'s " + name + " for " + price_sign + 
		price + " (" + currency + ")."

		download(image_url, "images/lipstick" + randomlipstick + ".jpg");
	}

	function download(url, filename) {
		request(url).pipe(fs.createWriteStream(filename)).on('close', encodeImage);

		function encodeImage() {
			var encoded_img = fs.readFileSync(filename, {encoding: 'base64'});
			T.post('media/upload', {media_data: encoded_img}, insertMetaData);
		}
	}

	function insertMetaData(error, data, response){
		if(error){
			console.log(error);
		}
		var mediaIdStr = data.media_id_string;
		var altText = "This is an image of " + brand + "'s " + name;
		var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

		T.post('media/metadata/create', {media_id: mediaIdStr}, createdMedia);
	
		function createdMedia(error, data, response){
			if(error){
				console.log("createdMedia")
				console.log(error);
				console.log(data);
			}
			var tweet_parameters = {status: tweet, media_ids: mediaIdStr};
			T.post('statuses/update', tweet_parameters, tweeted);
		}
	}
	
	function tweeted(error, data, response) {
		if(error) {
			console.log(error);
		}
		else {
			console.log("Successful!! " + data.text)
		}
	}
}

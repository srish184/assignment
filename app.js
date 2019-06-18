var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://srishti:srishti123@cluster0-jyt1p.mongodb.net/test?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(async (err) => {
	if (err) {
		console.log(`Error in connecting to  ${uri}. Error : ${err}`);
		client.close();
	}
	else {
		console.log(`connected to ${uri}`);
		global.client = client;
		global.User = client.db("assignment").collection("user_details");
		global.Company = client.db("assignment").collection("company");
		global.Favcompany = client.db("assignment").collection("fav_company");

		app.use(express.static(__dirname + '/public'));

		app.use(function (req, res, next) {

			res.header("Access-Control-Allow-Origin", "*");
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

			next();
		});
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		require('./controller/baseRoute.js')(app);
		app.listen(8080, () => console.log(`Example app listening on port `));
		console.log("App listening on port 8080");
	}
});
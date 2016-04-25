var express = require('express');
var mongoose = require('mongoose');
var app = express();

var uristring = 
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost:27017/metocean_db';

mongoose.connect(uristring, function(err, res){
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	}else {
		console.log('Succeeded connected to: ' + uristring);
	}
});


var dataSchema = new mongoose.Schema({
	
	tm_sea : String,
	cb : String,
	csp0 : String,
	dpm_sw8 : String,
	tp : String,
	hs_fig : String,
	dpm_sw1 : String,
	hs_ig : String,
	dpm_sea : String,
	tmp : String,
	cld : String,
	wsp50 : String,
	tp_sea : String,
	hs_sw1 : String,
	sst : String,
	wsp100 : String,
	hs_sw8 : String,
	dpm_sea8 : String,
	rh : String,
	hx : String,
	wd : String,
	tp_sw1 : String,
	tp_sea8 : String,
	hs : String,
	tp_sw8 : String,
	cd0 : String,
	lev : String,
	Time : String,
	tm01 : String,
	hs_sea : String,
	dp : String,
	tm02 : String,
	gst : String,
	vis : String,
	ss : String,
	hs_sea8 : String,
	wsp : String,
	precip : String,
	dpm : String,
	wsp80 : String
}, {collection : 'data'});


var Datas = mongoose.model('data', dataSchema);

// module.exports = Datas;


Datas.find({}, function(err, result){
	if (!err) {
		console.log(result);
	}else {
		console.log(err);
	}
});

app.get('/', function (req, res) {
	res.send('result');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


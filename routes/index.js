var express = require('express');
var mongoose = require('mongoose');
var d3 = require('d3');

var router = express.Router();

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

// router.locals.barChartHelper = require('./bar_chart_helper');

/* GET home page. */
router.get('/', function(req, res, next) {
	Datas.find({}, function(err, result){
		if (!err) {
			res.render('index', { title: 'MetOcean'});
		}else {
			console.log(err);
		}
	});
});


router.post('/data', function(req, res) {
	var dates = new Dates(req.body);
	dates.save(function(error, dates) {
		if(error) res.send(500);

		res.send(201);
	});
});

router.get('/datas', function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "http://localhost");
	// res.header("Access-Control-Allow-Methods", "GET, POST");
	Datas.find({}, function(error, dados) {
		if(error) res.send(err);
		res.json({dados:dados});
	});
});

module.exports = router;

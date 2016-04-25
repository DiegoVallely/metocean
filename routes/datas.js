var express = require('express');
var mongoose = require('mongoose');
var d3 = require('d3');
var router = express.Router();


// module.exports = Datas;

// router.locals.barChartHelper = require('./bar_chart_helper');


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
		res.render({dados:dados});
	});
});

module.exports = router;

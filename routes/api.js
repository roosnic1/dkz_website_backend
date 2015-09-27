var express = require('express');
var router = express.Router();

var plays = require('./api/play');

router.route('/plays')
	.post(function(req, res) { plays.addPlay(req, res) })
	.get(function(req, res) { plays.getAllPlays(req, res) });

router.route('/plays/:play_id')
	.get(function(req, res) { plays.getSinglePlay(req, res, req.params.play_id) })
	.put(function(req, res) { plays.updatePlay(req, res, req.params.play_id) })
	.delete(function(req, res) { plays.deletePlay(req, res, req.params.play_id) });

module.exports = router;

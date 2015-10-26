var express = require('express');
var router = express.Router();

var posts = require('./api/post');
var plays = require('./api/play');
var members = require('./api/member');
var historys = require('./api/history');
var feedbacks = require('./api/feedback');
var images = require('./api/image');

router.post('*', function(req, res, next) {
  console.log(req);
  next();
});

router.route('/posts')
	.post(function(req, res) { posts.addPost(req, res) })
	.get(function(req, res) { posts.getAllPosts(req, res) });

router.route('/posts/:post_id')
	.get(function(req, res) { posts.getSinglePost(req, res, req.params.post_id) })
	.put(function(req, res) { posts.updatePost(req, res, req.params.post_id) })
	.delete(function(req, res) { posts.deletePost(req, res, req.params.post_id) });

router.route('/plays')
	.post(function(req, res) { plays.addPlay(req, res) })
	.get(function(req, res) { plays.getAllPlays(req, res) });

router.route('/plays/:play_id')
	.get(function(req, res) { plays.getSinglePlay(req, res, req.params.play_id) })
	.put(function(req, res) { plays.updatePlay(req, res, req.params.play_id) })
	.delete(function(req, res) { plays.deletePlay(req, res, req.params.play_id) });

router.route('/members')
	.post(function(req, res) { members.addMember(req, res) })
	.get(function(req, res) { members.getAllMembers(req, res) });

router.route('/members/:member_id')
	.get(function(req, res) { members.getSingleMember(req, res, req.params.member_id) })
	.put(function(req, res) { members.updateMember(req, res, req.params.member_id) })
	.delete(function(req, res) { members.deleteMember(req, res, req.params.member_id) });

router.route('/histories')
	.post(function(req, res) { historys.addHistory(req, res) })
	.get(function(req, res) { historys.getAllHistories(req, res) });

router.route('/histories/:history_id')
	.get(function(req, res) { historys.getSingleHistory(req, res, req.params.history_id) })
	.put(function(req, res) { historys.updateHistory(req, res, req.params.history_id) })
	.delete(function(req, res) { historys.deleteHistory(req, res, req.params.history_id) });

router.route('/feedbacks')
	.post(function(req, res) { feedbacks.add(req, res) })
	.get(function(req, res) { feedbacks.getAll(req, res) });

router.route('/feedbacks/:item_id')
	.get(function(req, res) { feedbacks.getSingle(req, res, req.params.item_id) })
	.put(function(req, res) { feedbacks.update(req, res, req.params.item_id) })
	.delete(function(req, res) { feedbacks.delete(req, res, req.params.item_id) });

router.route('/images')
	.post(function(req, res) { images.addImage(req, res) })
	.delete(function(req, res) { images.deleteImage(req, res) });

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let decoded = req.session.decoded
  res.render('index', {decoded : decoded || '0'});
});

router.get('/searchDisease', function(req, res, next) {
  res.render('pages/search_disease');
});

router.get('/searchDiagnosis', function(req, res, next) {
  res.render('pages/search_diagnosis');
});

router.post('/resultDisease', function(req, res, next) {
  // coding here
  res.render('pages/search_result_disease');
});

router.post('/resultDiagnosis', function(req, res, next) {
  // coding here
  res.render('pages/search_result_diagnosis');
});

router.post('/searchVoice', (req, res, next) => {
  
});

module.exports = router;

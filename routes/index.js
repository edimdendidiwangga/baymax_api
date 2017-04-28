var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout:false,
    session: req.session
});
});

router.post('/searchHospitals', function(req, res, next) {
  res.render('searchHospital', {
    location: req.body.locationName,
    layout:false,
    session: req.session
});
});

router.get('/searchDisease', function(req, res, next) {
  res.render('pages/search_disease', {
    layout:false,
    session: req.session
});
});

router.get('/searchDiagnosis', function(req, res, next) {
  res.render('pages/search_diagnosis');
});

router.post('/sendEmail', function(req, res){
  if(req.session.name){
    let nameUser = req.body.name;
    let emailUser = req.body.email;
    let dataResult = req.body.dataResult;
    var api_key = 'key-06f7f089efacb7cce55e79eaed063b43';
    var domain = 'sandboxdc8d329f2cc44c62b42a0b13f715abb6.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
      var data = {
      from: 'Edim <edimdendi@gmail.com>',
      to: emailUser,
      subject: 'Baymax Apps',
      text: dataResult
    };
    mailgun.messages().send(data, function (error, body) {
      console.log(body)
      res.redirect('/')
    });
  }else{
    res.redirect("/users/signin")
  }
})

router.get('/signout', function(req, res, next) {
    req.session.destroy(function(err) {
      req.session = null;
      res.clearCookie('connect.sid');
      res.clearCookie('session');
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})


module.exports = router;

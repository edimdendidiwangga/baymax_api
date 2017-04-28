const User = require('../models/user')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const methods = {}

methods.signin_page = function(req, res){
  res.render('auth/login')
}

methods.signup_page = function(req, res){
  res.render('auth/register')
}

methods.signin = function(req, res){
  let user = req.user
  let token = jwt.sign({
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role}, process.env.SECRET_KEY);
  var decoded = jwt.decode(token);
  req.session.name = decoded.name
  req.session.email = decoded.email
  req.session.username = decoded.username
  req.session.role = decoded.role
  res.redirect('/')
}


methods.signup = function(req, res){
  let data = req.body
  data.password = passwordHash.generate(req.body.password)
  User.create(data, function(error, user){
    if(error){
      res.json({error})
    } else {
      let received = req.body.email
      var api_key = 'key-06f7f089efacb7cce55e79eaed063b43';
      var domain = 'sandboxdc8d329f2cc44c62b42a0b13f715abb6.mailgun.org';
      var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
      var list = mailgun.lists('list_baymax@sandboxdc8d329f2cc44c62b42a0b13f715abb6.mailgun.org');


      var person = {
        subscribed: true,
        address: req.body.email,
        name: req.body.name,
        vars: {age: 20}
      };

      list.members().create(person, function (err, data) {
        // `data` is the member details
        console.log(data);
        res.redirect('/')
      });

    }
  })
}

methods.getAll = function(req, res){
  User.find({}, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.updateById = function(req, res){
  User.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  User.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods

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
    username: req.user.username,
    role: req.user.role}, process.env.SECRET_KEY);
  var decoded = jwt.decode(token);
  var sess = req.session
  sess.decoded = decoded

  res.redirect('/')
}


methods.signup = function(req, res){
  let data = req.body
  data.password = passwordHash.generate(req.body.password)
  User.create(data, function(error, user){
    if(error){
      res.json({error})
    } else {
      res.redirect('/')
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

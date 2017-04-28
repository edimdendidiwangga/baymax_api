const Disease = require('../models/disease')
const methods = {}

methods.insertOne = function(req, res){
  Disease.create(req.body, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
  Disease.find({})
    .populate('list_diagnoses')
    .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.updateById = function(req, res){
  Disease.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Disease.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.resultDisease = function(req, res){
  Disease.findOne({ name : req.body.name})
    .populate('list_diagnoses', 'name')
    .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      res.render('pages/search_result_disease', {data : records, input: req.body.name, layout:false,
      session: req.session});
      //res.json(records)
    }
  })
}
module.exports = methods

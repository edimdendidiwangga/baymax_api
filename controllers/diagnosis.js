const Diagnosis = require('../models/diagnosis')
const methods = {}

methods.insertOne = function(req, res){
  Diagnosis.create(req.body, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
  Diagnosis.find({}, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.updateById = function(req, res){
  Diagnosis.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Diagnosis.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

// belum kelar
methods.resultDiagnosis = function(req, res){
  let Disease = require('../models/disease')
  Disease.find( )
    .populate('list_diagnoses', "name")
    .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      //res.render('pages/search_result_diagnosis', {data : records});
      res.json(records)
    }
  })
}

module.exports = methods

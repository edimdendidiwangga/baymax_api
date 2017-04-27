var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diseaseSchema = new Schema({
  name:  String,
  solutions: String,
  description: String,
  list_diagnoses: [{
    type: Schema.Types.ObjectId, ref: 'Diagnosis'
  }]
});

let Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease

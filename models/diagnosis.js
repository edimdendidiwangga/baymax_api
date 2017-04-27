var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diagnosisSchema = new Schema({
  name:  String
});

let Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis

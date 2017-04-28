const router = require('express').Router();
const diagnosisController = require('../controllers/diagnosis')

router.get('/', diagnosisController.getAll)
router.post('/', diagnosisController.insertOne)
router.put('/:id', diagnosisController.updateById)
router.delete('/:id', diagnosisController.deleteById)
router.post('/resultDiagnosis', diagnosisController.resultDiagnosis)

module.exports = router;

const router = require('express').Router();
const diseaseController = require('../controllers/disease')

router.get('/', diseaseController.getAll)
router.post('/', diseaseController.insertOne)
router.put('/:id', diseaseController.updateById)
router.delete('/:id', diseaseController.deleteById)
router.post('/resultDisease', diseaseController.resultDisease)

module.exports = router;

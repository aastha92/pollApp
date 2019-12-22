const express = require("express")
const optionsController = require('../controllers/options')
const router = express.Router()

router.get('/', optionsController.getAllOptions);
router.post('/', optionsController.createOption);
router.put('/:id', optionsController.updateOptionById);
router.delete('/:id', optionsController.deleteOptionsById);

module.exports = router;
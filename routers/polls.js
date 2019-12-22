const express = require("express")
const pollsController = require('../controllers/polls')
const router = express.Router()

router.get('/' , pollsController.getAllPolls);
router.get('/:id' , pollsController.getPollsById);
router.post('/' , pollsController.createPoll);

module.exports = router
const express = require('express')
const votesController = require('../controllers/votes')
const router = express.Router()

router.get('/options/:id', votesController.getVotesByOptionsId);
router.get('/users/:id', votesController.getVotesByUserId);
router.post('/', votesController.createVote);
router.put('/:id', votesController.updateVoteById);

module.exports = router
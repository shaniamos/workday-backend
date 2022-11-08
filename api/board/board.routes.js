const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard } = require('./board.controller')
const router = express.Router()

router.get('/', log, getBoards)
router.get('/:id', log, getBoardById)
router.post('/', addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', removeBoard)

module.exports = router
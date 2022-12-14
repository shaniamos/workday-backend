const boardService = require('./board.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getBoards(req, res) {
  try {
    logger.debug('Getting Boards with filter by:', req.query)
    
    const boards = await boardService.query()
    res.send(boards)
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID 
async function getBoardById(req, res) {
  try {
    logger.debug('Getting Boards by id:', req.params.id)
    const boardId = req.params.id
    const board = await boardService.getById(boardId)
    res.send(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  try {
    logger.debug('Adding board')
    const board = req.body
    const addedBoard = await boardService.add(board)
    res.send(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// PUT (update board)
async function updateBoard(req, res) {
  try {
    const board = req.body;
    const updatedBoard = await boardService.update(board)
    res.send(updatedBoard)
  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

// DELETE (remove board)
async function removeBoard(req, res) {
  try {
    logger.debug('Removing board by id:', req.params.id)
    const boardId = req.params.id;
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard
}

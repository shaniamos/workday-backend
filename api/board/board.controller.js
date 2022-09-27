const boardService = require('./board.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getBoards(req, res) {
  try {
    logger.debug('Getting Boards with filter by:', req.query)
    
    // logger.debug('Getting Boards with filter by:', req.query.params)
    // var queryParams = JSON.parse(req.query.params)
    // const boards = await boardService.query(queryParams)
    const filterBy = (req.query) ? req.query : null
    const boards = await boardService.query(filterBy)
    res.json(boards)
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
    res.json(board)
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
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body;
    const updatedBoard = await boardService.update(board)
    res.json(updatedBoard)
  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
  try {
    logger.debug('Removing board by id:', req.params.id)
    const boardId = req.params.id;
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
    // res.json(removedId) //??
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

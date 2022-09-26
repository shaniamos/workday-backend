const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service')

async function query(filterBy) {
    try {
        console.log(filterBy)
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        var boards = await collection.find(criteria).toArray()
        boards = boards.map(board => ({...board , createdAt: ObjectId(`${board._id}`).getTimestamp()}))
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        console.log(filterBy.txt)
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.title = txtCriteria
        criteria.title = txtCriteria
    }
    console.log(criteria)
    return criteria
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        const addedBoard = await collection.insertOne(board)
        return addedBoard
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}
async function update(board) {
    try {
        var boardId = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: boardId }, { $set: { ...board } })
        return { _id: boardId, ...board }
    } catch (err) {
        logger.error(`cannot update board ${boardId}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
}
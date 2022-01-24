const express = require('express')
const router = express.Router()

const { getAllMovies, getOneMovie, createOneMovie, updateOneMovie, deleteOneMovie, deleteAllMovie } = require('../controllers/movie')

router.get('/movies', getAllMovies)
    
router.get('/movies/:id', getOneMovie)

router.post('/movies', createOneMovie)

router.put('/movies/:id', updateOneMovie)

router.delete('/movies/:id', deleteOneMovie)

router.delete('/movies', deleteAllMovie)

module.exports = router
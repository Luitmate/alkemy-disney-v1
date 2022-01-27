const express = require('express')
const router = express.Router()

const { getAllMovies, getOneMovie, createOneMovie, updateOneMovie, deleteOneMovie, deleteAllMovie } = require('../controllers/movie')
const isLoggedIn = require('../utils/isLoggedIn')

router.get('/movies', isLoggedIn, getAllMovies)
    
router.get('/movies/:id', isLoggedIn, getOneMovie)

router.post('/movies', isLoggedIn, createOneMovie)

router.put('/movies/:id', isLoggedIn, updateOneMovie)

router.delete('/movies/:id', isLoggedIn, deleteOneMovie)

router.delete('/movies', isLoggedIn, deleteAllMovie)

module.exports = router
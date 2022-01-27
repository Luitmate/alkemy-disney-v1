const express = require('express')
const router = express.Router()

const { getAllCharacters, getOneCharacter, createOneCharacter, updateOneCharacter, deleteOneCharacter, deleteAllCharacter,  } = require('../controllers/character')
const isLoggedIn = require('../utils/isLoggedIn')


router.get('/characters', isLoggedIn, getAllCharacters)

router.get('/characters/:id', isLoggedIn, getOneCharacter)

router.post('/characters', isLoggedIn, createOneCharacter)

router.put('/characters/:id', isLoggedIn, updateOneCharacter)

router.delete('/characters/:id', isLoggedIn, deleteOneCharacter)

router.delete('/characters', isLoggedIn, deleteAllCharacter)

module.exports = router
const express = require('express')
const router = express.Router()

const { getAllCharacters, getOneCharacter, createOneCharacter, updateOneCharacter, deleteOneCharacter, deleteAllCharacter,  } = require('../controllers/character')


router.get('/characters', getAllCharacters)

router.get('/characters/:id', getOneCharacter)

router.post('/characters', createOneCharacter)

router.put('/characters/:id', updateOneCharacter)

router.delete('/characters/:id', deleteOneCharacter)

router.delete('/characters', deleteAllCharacter)

module.exports = router
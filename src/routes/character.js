const express = require('express')
const router = express.Router()

const { Character, Movie } = require('../../database/models')

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

// GET ALL
router.get('/characters', async (req, res) => {
    const { name, age, weight, movies } = req.query
    if (!name && !age && !weight && !movies) {
        const allCharacters = await Character.findAll({
        attributes: ['image', 'name']
        })
        return res.json(allCharacters)
    }
    if (name) {
        const searchName = await Character.findAll({
            where: {
                name: {
                    [Op.substring]: name
                }
            },
            attributes: ['image', 'name'],
            include: [{
                model: Movie,
                as: 'movies',
                attributes: ['image', 'title', 'releaseYear', 'ratingIMDB'],
                through: {
                    attributes: []
                }
            }] 
        })
        return res.json(searchName)
    } else if (age) {
        const searchByAge = await Character.findAll({
            where: {
                age: age
            },
            attributes: ['image', 'name'],
            include: [{
                model: Movie,
                as: 'movies',
                attributes: ['image', 'title', 'releaseYear', 'ratingIMDB'],
                through: {
                    attributes: []
                }
            }]
        })
        return res.json(searchByAge)
    } else if (weight) {
        const searchByWeight = await Character.findAll({
            where: {
                weight: weight
            },
            attributes: ['image', 'name'],
            include: [{
                model: Movie,
                as: 'movies',
                attributes: ['image', 'title', 'releaseYear', 'ratingIMDB'],
                through: {
                    attributes: [],
                }
            }]
        })
        return res.json(searchByWeight)
    } else if (movies) {
        const searchByMovies = await Character.findAll({
          attributes: ['name', 'image'],
          include: [
            {
              model: Movie,
              as: 'movies',
              through: {
                attributes: []
              },
              where: {
                id: movies
              },
              attributes: ['image', 'title', 'releaseYear', 'ratingIMDB'],
            }
          ]
        })  
        return res.json(searchByMovies)
    }
})

// GET ONE BY PK
router.get('/characters/:id', async (req, res) => {
    try {
        const { id } = req.params
        const oneCharacter = await Character.findByPk(id)
        return res.json(oneCharacter)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// CREATE ONE
router.post('/characters', async (req, res) => {
    try {
        const { image, name, age, weight, story } = req.body
        const newCharacter = await Character.create({ image, name, age, weight, story})
        return res.json(newCharacter)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})


// UPDATE
router.put('/characters/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { image, name, age, weight, story } = req.body
        const editCharacter = await Character.update({ image, name, age, weight, story }, { where: { id }})
        return res.json(editCharacter)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// DELETE ONE
router.delete('/characters/:id', async(req, res) => {
    try {
        const { id } = req.params
        const deleteCharacter = await Character.destroy({
            where: { id }
        })
        return res.json(deleteCharacter)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// DELETE ALL
router.delete('/characters', async(req, res) => {
    try {
        const deleteAllCharacters = await Character.destroy({
            truncate : { cascade: true}
        })
        return res.json(deleteAllCharacters)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router
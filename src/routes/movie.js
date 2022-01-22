const express = require('express')
const router = express.Router()

const { Movie } = require('../../database/models')

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

// GET ALL
router.get('/movies', async (req, res) => {
    const { name, genre, order } = req.query
    if(!name && !genre && !order ) {
        const allMovies = await Movie.findAll({
            attributes: ['image', 'title', 'releaseYear']
        })
        return res.json(allMovies)
    }
    if (name) {
        const searchByName = await Movie.findAll({
            where: {
                title: {
                    [Op.substring]: name
                }
            },
            attributes: ['image', 'title', 'releaseYear', 'ratingIMDB']
        })
        return res.json(searchByName)
    } else if(genre) {
        const searchByGenre = await Movie.findAll({
            where: {
                GenreId: genre
            },
            attributes: ['image', 'title', 'releaseYear']
        })
        return res.json(searchByGenre)
    } else if (order) {
        if( order === 'ASC' || order === 'DESC') {
            const searchByOrder = await Movie.findAll({
                order: [
                    ['releaseYear', order]
                ],
                attributes: ['image', 'title', 'releaseYear'] 
            })
            return res.json(searchByOrder)
        } else {
            throw Error('Solo se pueden utilizar las opciones ASC y DESC')
        }
        
    }
})
    



// GET ONE BY PK
router.get('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const oneMovie = await Movie.findByPk(id)
        return res.json(oneMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// CREATE ONE
router.post('/movies', async (req, res) => {
    try {
        const { image, title, releaseYear, ratingIMDB, GenreId } = req.body
        const newMovie = await Movie.create({ image, title, releaseYear, ratingIMDB, GenreId })
        return res.json(newMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
})


// UPDATE
router.put('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, releaseYear,  ratingIMDB, GenreId } = req.body
        const editMovie = await Movie.update({ image, title, releaseYear,  ratingIMDB, GenreId }, { where: { id }})
        return res.json(editMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// DELETE ONE
router.delete('/movies/:id', async(req, res) => {
    try {
        const { id } = req.params
        const deleteMovie = await Movie.destroy({
            where: { id }
        })
        return res.json(deleteMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// DELETE ALL
router.delete('/movies', async(req, res) => {
    try {
        const deleteAllMovies = await Movie.destroy({
            truncate : { cascade: true}
        })
        return res.json(deleteAllMovies)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router
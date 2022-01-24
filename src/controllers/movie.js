const { Movie, Character } = require('../../database/models')

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

exports.getAllMovies = async (req, res) => {
    const { name, genre, order } = req.query
    if(!name && !genre && !order ) {
        const allMovies = await Movie.findAll({
            attributes: {
                exclude: ['id', 'GenreId']
            },
            include: [{
                model: Character,
                as: 'characters',
                attributes: ['image', 'name'],
                through: {
                    attributes: []
                }
            }]
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
}

exports.getOneMovie = async (req, res) => {
    try {
        const { id } = req.params
        const oneMovie = await Movie.findByPk(id)
        return res.json(oneMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.createOneMovie = async (req, res) => {
    try {
        const { image, title, releaseYear, ratingIMDB, GenreId } = req.body
        const newMovie = await Movie.create({ image, title, releaseYear, ratingIMDB, GenreId })
        return res.json(newMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.updateOneMovie = async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, releaseYear,  ratingIMDB, GenreId } = req.body
        const editMovie = await Movie.update({ image, title, releaseYear,  ratingIMDB, GenreId }, { where: { id }})
        return res.json(editMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.deleteOneMovie = async(req, res) => {
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
}

exports.deleteAllMovie = async(req, res) => {
    try {
        const deleteAllMovies = await Movie.destroy({
            truncate : { cascade: true}
        })
        return res.json(deleteAllMovies)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
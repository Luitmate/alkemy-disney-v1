const { Movie, Character } = require('../../database/models')

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

/* cambiar 
if (name || genre || order) {
    if(name) {
        ...
    } else if(genre) {
        ...
    } else if () {
        ....
    }
} else {
    ....
}
*/

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

exports.getOneMovie = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if(!id) throw new ExpressError('No se ha encontrado el film', 400)
    const oneMovie = await Movie.findByPk(id)
    return res.json(oneMovie)
})

exports.createOneMovie = catchAsync(async (req, res) => {
    const { image, title, releaseYear, ratingIMDB, GenreId } = req.body
    if(!image || !title || !releaseYear || !ratingIMDB || !GenreId) throw new ExpressError('Existen campos sin completar', 400)
    const newMovie = await Movie.create({ image, title, releaseYear, ratingIMDB, GenreId })
    return res.json(newMovie)
    
})

exports.updateOneMovie = catchAsync(async (req, res) => {
    const { id } = req.params
    const { image, title, releaseYear,  ratingIMDB, GenreId } = req.body
    if(!id) throw new ExpressError('No se ha encontrado el film', 400)
    if(!image || !title || !releaseYear || !ratingIMDB || GenreId) throw new ExpressError('Existen campos sin completar', 400)
    const editMovie = await Movie.update({ image, title, releaseYear,  ratingIMDB, GenreId }, { where: { id }})
    return res.json(editMovie)
})

exports.deleteOneMovie = catchAsync(async(req, res) => {
    const { id } = req.params
    if(!id) throw new ExpressError('No se ha encontrado el film', 400)
    const deleteMovie = await Movie.destroy({
        where: { id }
    })
    return res.json(deleteMovie)    
})

exports.deleteAllMovie = catchAsync(async(req, res) => {
    const deleteAllMovies = await Movie.destroy({
        truncate : { cascade: true}
    })
    return res.json(deleteAllMovies)    
})
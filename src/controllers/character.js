const { Character, Movie } = require('../../database/models')

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

exports.getAllCharacters = async (req, res) => {
    const { name, age, weight, movies } = req.query
    if (!name && !age && !weight && !movies) {
        const allCharacters = await Character.findAll({
        attributes: {
            exclude: 'id'
        },
        include: [{
            model: Movie,
            as: 'movies',
            attributes: ['image', 'title', 'releaseYear', 'ratingIMDB'],
            through: {
                attributes: []
            }
        }]
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
}

exports.getOneCharacter = catchAsync(async (req, res) => {
    const { id } = req.params
    if(!id) throw new ExpressError('No se ha encontrado el personaje', 400)
    const oneCharacter = await Character.findByPk(id)
    return res.json(oneCharacter)   
})

exports.createOneCharacter = catchAsync(async (req, res) => {
    const { image, name, age, weight, story } = req.body
    if(!image || !name || !age || !weight || !story) throw new ExpressError('Existen campos sin completar', 400)
    const newCharacter = await Character.create({ image, name, age, weight, story})
    return res.json(newCharacter)
    
})

exports.updateOneCharacter = catchAsync(async (req, res) => {
        const { id } = req.params
        const { image, name, age, weight, story } = req.body
        if(!id) throw new ExpressError('No se ha encontrado el personaje', 400)
        if(!image || !name || !age || !weight || !story) throw new ExpressError('Existen campos sin completar', 400)
        const editCharacter = await Character.update({ image, name, age, weight, story }, { where: { id }})
        return res.json(editCharacter)  
})

exports.deleteOneCharacter = catchAsync(async(req, res) => {
    const { id } = req.params
    if(!id) throw new ExpressError('No se ha encontrado el personaje', 400)
    const deleteCharacter = await Character.destroy({
        where: { id }
    })
    return res.json(deleteCharacter)
})

exports.deleteAllCharacter = catchAsync(async(req, res) => {
        const deleteAllCharacters = await Character.destroy({
            truncate : { cascade: true}
        })
        return res.json(deleteAllCharacters)  
})
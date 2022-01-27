const { User } = require('../../database/models')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const emailService = require('../../emailService')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

exports.loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) throw new ExpressError('Debe introducir el email y password', 400)
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    const check = passwordComparison(user.password, password)
    if(check) {
        const token = signToken(user.id, process.env.ACCESS_JWT_TOKEN)
        res.json('Bienvenido')
        return (token)
    } else {
        throw new ExpressError('Datos inválidos', 401)
    }
})

exports.registerUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) throw new ExpressError('Debe introducir el email y password', 400)
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    if(user) {
        throw new ExpressError('El email ya está en uso', 400)
    } else {
        const passwordEncrypted = await passwordEncryption(password)
        const newUser = await User.create({ email, password: passwordEncrypted })
        const token = signToken(newUser.id, process.env.ACCESS_JWT_TOKEN)
        await emailService(email)
        res.json('Bienvenido')
        return (token)
    }
})

const passwordEncryption = async (passwordPlain) => {
    return await bcrypt.hash(passwordPlain, 10)
}

const passwordComparison = async (userPassword, passwordInput) => {
    return await bcrypt.compare(passwordInput, userPassword)
}

const signToken = (userId, jwtoken) => {
    return jwt.sign(userId, jwtoken)
}


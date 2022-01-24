const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const emailService = require('../../emailService')

const { User } = require('../../database/models')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    const check = passwordComparison(user.password, password)
    if(check) {
        const token = jwt.sign(user.id, process.env.ACCESS_JWT_TOKEN)
        res.json(token)
    } else {
        res.json('Datos invalidos')
    }
})

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const passwordEncrypted = await passwordEncryption(password)
    const newUser = User.create({ email, password: passwordEncrypted })
    emailService(email)
    return res.json(newUser)

})

const passwordEncryption = async (passwordPlain) => {
    return await bcrypt.hash(passwordPlain, 10)
}

const passwordComparison = async (userPassword, passwordInput) => {
    return await bcrypt.compare(passwordInput, userPassword)
}



/*
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_JWT_TOKEN, (err, email) => {
        if(err) res.sendStatus(403)
        req.email = email
        next()
    })
}
*/

module.exports = router
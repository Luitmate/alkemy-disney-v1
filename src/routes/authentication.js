const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../../database/models')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
            email
        }
    })
    const accessToken = jwt.sign(email, process.env.ACCESS_JWT_TOKEN)
    res.json(accessToken)
})


router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ email: email, password: encryptedPassword })
        return res.json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

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
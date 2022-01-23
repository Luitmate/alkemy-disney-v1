const express = require('express')
const router = express.Router()



const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../../database/models')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const accessToken = jwt.sign(email, process.env.ACCESS_JWT_TOKEN)
    res.json(accessToken)
})

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const newUser = await User.create({ email, password })
    return res.json(newUser)
})

module.exports = router
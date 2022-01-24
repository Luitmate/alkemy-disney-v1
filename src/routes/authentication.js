const express = require('express')
const router = express.Router()

const { loginUser, registerUser } = require('../controllers/authentication')


router.post('/login', loginUser)

router.post('/register', registerUser)


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
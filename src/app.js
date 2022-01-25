const express = require('express')
const res = require('express/lib/response')
const { sequelize } = require('../database/models')
const ExpressError = require('./utils/ExpressError')

// Routes
const characterRoutes = require('./routes/character')
const movieRoutes = require('./routes/movie')
const authenticationRoutes = require('./routes/authentication')



const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', characterRoutes)
app.use('/api/v1', movieRoutes)
app.use('/api/v1/auth', authenticationRoutes)

// app.use((req, res, next) => {
//   throw new CustomError('No se encontró el sitio solicitado', 404)
// })

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Algo anduvo mal' } = err
  res.status(statusCode).send(message)
})

app.listen(PORT, async() => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  try {
    await sequelize.sync({ force : false })
    console.log("Se estableció la conexión on la base de datos")
  } catch (error) {
      console.log(error)  
  }
})

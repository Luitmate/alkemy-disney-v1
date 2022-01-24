const express = require('express')
const res = require('express/lib/response')
const { sequelize } = require('../database/models')

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


app.listen(PORT, async() => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  try {
    await sequelize.sync({ force : false })
    console.log("Se estableció la conexión on la base de datos")
  } catch (error) {
      console.log(error)  
  }
})

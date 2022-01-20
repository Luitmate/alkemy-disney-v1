const express = require('express')
const res = require('express/lib/response')
const sequelize = require('sequelize')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, async() => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  try {
    await sequelize.authenticate()
    console.log("Se estableció la conexión on la base de datos")
  } catch (error) {
      console.log(error)  
  }
})

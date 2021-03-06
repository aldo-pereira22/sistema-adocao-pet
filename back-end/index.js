const express = require('express')
const cors = require('cors')

const app = express()
    // Configuração do JSON response
app.use(express.json())

// configuração do cors
app.use(cors({ credentials: true, origin: "*" }))

// Colocar a pasta de imagens publica
app.use(express.static('public'))

// Routes User
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

// Routes Pets
const PetRoutes = require('./routes/PetRoutes')
app.use('/pets', PetRoutes)

app.listen(5000, (req, res) => {
    console.log("App rodando na porta: 5000")
})
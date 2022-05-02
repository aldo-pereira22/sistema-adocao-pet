const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://172.17.0.2/getapet')
    console.log("Banco de dados conectado: 172.17.0.2")
}

main().catch((err) => {
    console.log(err)
})

module.exports = mongoose
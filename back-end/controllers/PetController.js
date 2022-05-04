const Pet = require('../models/Pet')
const pet = require('../models/Pet')

// Funções auxiliares
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const objectId = require('mongoose').Types.ObjectId
const { response } = require('express')



module.exports = class PetController {

    // Criar um pet
    static async create(req, res) {
        const { name, age, weigth, color, } = req.body
        const available = true


        // Upload de imagens    
        const images = req.files

        // Validação
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório" })
            return
        }

        if (!age) {
            res.status(422).json({ message: "A idade é obrigatória" })
            return

        }
        if (!weigth) {
            res.status(422).json({ message: "O peso é obrigatório" })
            return

        }
        if (!color) {
            res.status(422).json({ message: "A cor  é obrigatória" })
            return
        }
        if (images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatória" })
            return
        }

        // Buscando o dono do PET
        const token = getToken(req)
        const user = await getUserByToken(token)
            //  Criação do pet
        const pet = new Pet({
            name,
            age,
            weigth,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,

            }
        })

        images.map(image => {
            // pet.images.push(image.filename)
            console.log("\n", image.filename)
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({
                message: "Pet cadastrado com sucesso!",
                newPet
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }


    static async getAll(req, res) {
        try {
            const pets = await Pet.find().sort('-createdAt')
                // pets.forEach(pet => {
                //     console.log(pet.name)
                // })
            res.status(400).json({ pets })
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async getAllUserPets(req, res) {
        // Pegar usuário logado
        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')
        res.status(200).json({ pets })
    }


    static async getAllUserAdoptions(req, res) {
        // Pegar usuário logado
        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')
        res.status(200).json({ pets })
    }

    static async getPetById(req, res) {
        const id = req.params.id
        if (!objectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" })
            return
        }

        const pet = await Pet.findById('6271c340c3525ef06af84d4c')
        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" })
            return
        }
        res.status(200).json({
            pet: pet
        })
    }


    static async removePetById(req, res) {


    }
}
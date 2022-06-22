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
        const { name, age, weight, color, } = req.body
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
        if (!weight) {
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
            weight,
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

        console.log("AQUII SERVIDOR CHROME")
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
        const pet = await Pet.findById(id)
        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" })
            return
        }
        res.status(200).json({
            pet: pet
        })
    }


    static async removePetById(req, res) {

        const id = req.params.id
            // Verifica se o ID é válido
        if (!objectId.isValid(id)) {
            res.status(422).json({ message: "ID Inválido!" })
            return
        }

        const pet = await Pet.findById(id)

        // // Verifica se existe o pet com esse id
        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado!" })
            return

        }


        // // Busca o usuário através do web token
        const token = getToken(req)
        const user = await getUserByToken(token)


        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: "Houve um problema em processar sua solicitação, vc só pode deletar um PET se ele for seu!" })
            return
        }

        await Pet.findByIdAndRemove(id)
        res.status(200).json({
            message: "Pet removido com sucesso!"
        })
    }



    static async update(req, res) {
        const id = req.params.id
        const { name, age, weight, color, available } = req.body
        const images = req.files

        const updateData = {}

        // Verificar se pet existe 
        try {

            const pet = await Pet.findById(id)
                // // Verifica se existe o pet com esse id
            if (!pet) {
                res.status(404).json({ message: "Pet não encontrado!" })
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)



            if (pet.user._id.toString() !== user._id.toString()) {
                res.status(422).json({ message: "Pet não pertence a esse usuário!" })
                return
            }
            // Validação
            if (!name) {
                res.status(422).json({ message: "O nome é obrigatório" })
                return
            } else {
                updateData.name = name
            }

            if (!age) {
                res.status(422).json({ message: "A idade é obrigatória" })
                return

            } else {
                updateData.age = age

            }
            if (!weight) {
                res.status(422).json({ message: "O peso é obrigatório" })
                return

            } else {
                updateData.weight = weight

            }

            if (!color) {
                res.status(422).json({ message: "A cor  é obrigatória" })
                return
            } else {
                updateData.color = color

            }

            if (images.length > 0) {
                updateData.images = []
                images.map((image) => {
                    updateData.images.push(image.filename)
                })
            }

            await Pet.findByIdAndUpdate(id, updateData)

        } catch (error) {
            res.status(500).json({ message: error })
            return


        }




        res.status(200).json({ message: "Pet atualizado!" })


    }

    static async schedule(req, res) {
        const id = req.params.id
        console.log()
            // verificar se o pet exist
        try {
            const pet = await Pet.findById(id)
                // // Verifica se existe o pet com esse id
            if (!pet) {
                res.status(404).json({ message: "Pet não encontrado!" })
                return
            }

            // const token = getToken(req)
            const user = await getUserByToken(getToken(req))
                // verificar se o pet cadastrado é do proprio usuário
            if (pet.user._id.equals(user._id)) {
                res.status(500).json({
                    message: " Vc não pode agendar uma visita para seu proprio pet"
                })

                return
            }

            // Verificar se esse usuário ja tem uma visita agendada com esse pet
            if (pet.adpter) {
                if (pet.adopter._id.equals(user._id)) {
                    res.status(500).json({
                        message: " Vc não ja tem uma visita agendada"
                    })
                    return
                }
            }
            // Adicionar o usuário como adotante do pet
            pet.adopter = {
                _id: user._id,
                name: user.name,
                image: user.image
            }
            await Pet.findByIdAndUpdate(id, pet)

            res.status(200).json({
                message: `A visita foi agendada com sucesso, entre em contato com o
                ${pet.username} pelo telefone  ${pet.user.phone}
                `
            })
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao pesquisar!", erro: error })
            return
        }

    }


    static async concludeAdoption(req, res) {
        const id = req.params.id

        try {
            const pet = await Pet.findById(id)

            // // Verifica se existe o pet com esse id
            if (!pet) {
                res.status(404).json({ message: "Pet não encontrado!" })
                return

            }
            // const token = getToken(req)
            const user = await getUserByToken(getToken(req))
                // verificar se o pet cadastrado é do proprio usuário
            if (pet.user._id.toString() !== user._id.toString()) {
                res.status(500).json({
                    message: " Vc não pode agendar uma visita para seu proprio pet"
                })

                return
            }
            pet.available = false
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({ message: "Parabéns, vc acaba de adquirir um lindo PET!" })
        } catch (error) {
            res.status(500).json({
                message: "Houve um erro ao buscar o pet",
                error
            })
        }

    }
}
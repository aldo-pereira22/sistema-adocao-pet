const User = require('../models/User')
const bcrypt = require('bcrypt')

// Funções auxiliares
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserToken = require('../helpers/get-user-by-token')



const jwt = require('jsonwebtoken')



module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        console.log("\nREGISTERRR", req.body)
            // Validações 
        if (!name) {
            res.status(422).json({ message: ' O nome é obrigatório' })
            return

        }
        if (!email) {
            res.status(422).json({ message: ' O email é obrigatório' })
            return

        }
        if (!phone) {
            res.status(422).json({ message: ' O telefone é obrigatório' })
            return

        }
        if (!password) {
            res.status(422).json({ message: ' A senha é obrigatória' })
            return

        }
        if (!confirmpassword) {
            res.status(422).json({ message: ' A confirmação de senha é obrigatória' })
            return

        }

        if (password !== confirmpassword) {
            res.status(422).json({ message: ' A senha e confirmação de senha devem ser iguais' })
            return

        }

        // Verificar se o usuário existe
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            res.status(422).json({ message: "Este e-mail ja está cadastrado! Utilize outro email" })
            return
        }


        // criar a senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // criar um usuário 
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {

            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })

        }


    }

    static async login(req, res) {
        const { email, password } = req.body
        if (!email) {
            res.status(422).json({ message: ' O email é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: ' A senha é obrigatória' })
            return

        }


        // Verifica se o usuário existe 
        // let user = await User.find().or([{ email: email }])
        let user = await User.findOne({ email: email })
        console.log("LINHA 90", user)

        if (!user) {
            res.status(422).json({ message: "Não há usuário cadastrado com esse e-mail" })
            return
        }


        // Verificar se a senha enviada é a correspondente no banco de dados    
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            res.status(422).json({ message: "Senha inválida!" })
            return

        }

        await createUserToken(user, req, res)
    }

    static async checkuser(req, res) {


        let currentUser


        if (req.headers.authorization) {
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
    static async getUserById(req, res) {
        const id = req.params.id
        console.log(id)

        try {
            const user = await User.findById(id).select('-password')
            res.status(200).json(user)

        } catch (error) {
            console.log(error)
            res.status(422).json({
                message: "Usuário não encontrado"
            })
        }

    }

    static async editUser(req, res) {
        const id = req.params.id
        const { name, email, phone, password, confirmpassword } = req.body

        try {
            // const user = await User.findById(id)
            const token = getToken(req)
            const user = await getUserToken(token)
                // Validações 
            let image = ''
            if (req.file) {
                user.image = req.file.filename
            }


            if (!name) {

                res.status(422).json({ message: ' O nome é obrigatório' })
                return
            }
            if (!email) {
                res.status(422).json({ message: ' O email é obrigatório' })
                return
            }
            const userExist = await User.findOne({ email: email })


            if (user.email !== email && userExist) {
                res.status(422).json({
                    message: "Email ja cadastrado por outro usuário, Tente outro email"
                })
                return
            }
            user.email = email

            if (!phone) {
                res.status(422).json({ message: ' O telefone é obrigatório' })
                return

            }

            user.phone = phone


            if (password != confirmpassword) {
                res.status(422).json({ message: ' A senha e confirmação de senha devem ser iguais' })
                return
            } else if (password === confirmpassword && password != null) {
                // Criação da senha
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(password, salt)
                user.password = passwordHash

            }
            await User.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true })
            res.status(200).json({
                message: "Usuário atualizado com sucesso!"
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

}
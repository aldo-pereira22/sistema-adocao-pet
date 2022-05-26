import api from '../utils/api'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'


export default function useAuth() {

    const [authenticaded, setAuthenticateted] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `bearer ${JSON.parse(token)}`
            setAuthenticateted(true)
        }
    }, [])

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'
        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
            console.log(error)

        }
        setFlashMessage(msgText, msgType)
    }
    async function authUser(data) {

        setAuthenticateted(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }
    return { authenticaded, register }
}
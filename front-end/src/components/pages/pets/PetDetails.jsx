import styles from './PetDetails.module.css'
import api from '../../../utils/api'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'


import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails(){

    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    useEffect( () => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    },[])
    return (
        <h1>
            {pet.name}
        </h1>
    )
}


export default PetDetails
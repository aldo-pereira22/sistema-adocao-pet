import styles from './PetDetails.module.css'
import api from '../../../utils/api'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'


import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails(){
    return (
        <h1>
            Pagina de Pets
        </h1>
    )
}


export default PetDetails
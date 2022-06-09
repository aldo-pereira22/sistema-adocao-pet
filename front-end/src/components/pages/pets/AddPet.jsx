import api from '../../../utils/api'
import styles from './AddPet.module.css'

import {useState}from 'react'
import {useHistory} from 'react-router-dom'


// hooks
import useFlashMessage  from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'

function AddPet(){

    return (

        <section className={styles.addpet_header}>
        <div>
            <h1>Cadastre um Pet</h1>    
            <p>
                Depois ele ficará disponível para adoção
                 
            </p>
            <p>Formulário</p>
            <PetForm btnText="Cadastrar" />
        </div>
        </section>
    )
}

export default AddPet
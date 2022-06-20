import api from '../../../utils/api'
import {useState, useEffect} from 'react'

import styles from './AddPet.module.css'
import PetForm from '../../form/PetForm'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'


function EditPet(){
    return (
        <section>
           <div className={styles.add_pet_header} >
               <h1>Editando o pet: 'pet.name'</h1>
               <p>Depois da edição os dados serão atualizados no sistema</p>
           </div>
        </section>
    )
}

export default EditPet
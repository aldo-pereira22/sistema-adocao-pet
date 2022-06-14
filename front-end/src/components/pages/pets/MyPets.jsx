import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api'

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../Layouts/RoundedImage'
function MyPets(){
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()    

    useEffect( ()=> {
        api.get('/pets/mypets',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setPets(response.data.pets)
        })
    }, [token])


    return (

        <section>
            <div>
                <h1>My Pets</h1>
                <Link to='/pet/add' > Cadastrar Pet</Link>
            </div>
            <div>
                {pets.length > 0 && 
                    <p>Meus pets Cadastrados</p>
                }
    RoundedImage
                {pets.length === 0 && <p>Não Há pets cadastrados </p> }


            </div>
        </section>
    )
}

export default MyPets
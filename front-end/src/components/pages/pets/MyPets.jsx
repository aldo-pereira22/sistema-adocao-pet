import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api'
import styles from './Dashboard.module.css'

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
                    pets.map((pet) => (
                        <div key={pet._id} > 
                            <RoundedImage
                                // src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="75px"

                            />
                            <span className="bold"> {pet.name}</span>
                            <div className={styles.action}>
                                { pet.available ?
                                (<>
                                    {pet.adpoter && (
                                        <button>Concluir adoção</button>
                                    )}
                                    <Link to={`/pet/edit/${pet._id}`}> Editar </Link>
                                    <button>Excluir</button>
                                </>)
                                
                                : <p>Pet Já adotado</p> }
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Não Há pets cadastrados </p> }
            </div>
        </section>
    )
}

export default MyPets
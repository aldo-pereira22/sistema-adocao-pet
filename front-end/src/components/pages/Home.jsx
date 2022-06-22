import api from '../../utils/api'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'


import styles from './Home.module.css'

function Home(){

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

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
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div>
                            <p>Imagem do pet</p>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className="bold">Peso:</span> {pet.weight} kg
                            </p>
                            {
                                pet.available ? (
                                    <Link to={`pet/${pet._id}`} > Mais detalhes </Link>
                                ) : (
                                    <p>Adotado</p>

                                )
                            }
                        </div>
                    ))   
                }
                {pets.length === 0 && (
                    <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
                    
                )}
            </div>
        </section>
    )
}

export default Home
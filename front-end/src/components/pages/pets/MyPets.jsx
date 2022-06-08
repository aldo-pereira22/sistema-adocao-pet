import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function MyPets(){
    const [pets, setPets] = useState([])

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

                {pets.length === 0 && <p>Não Há pets cadastrados </p> }


            </div>
        </section>
    )
}

export default MyPets
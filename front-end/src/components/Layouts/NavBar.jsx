import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png'
function NavBar(){
    return (
        <nav>
            <div>
                <img src={Logo} alt="Get a Pet" />
            </div>
            <ul>
                <li>
                    <Link to="/" >Adotar</Link>
                </li>
                <li>
                    <Link to="/login" >Entrar</Link>
                </li>
                <li>
                    <Link to="/register" >Cadastrar</Link>
                </li>
            
            </ul>
        </nav>
    )
}

export default NavBar
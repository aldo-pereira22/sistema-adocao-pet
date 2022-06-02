import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png'
import styles from './NavBar.module.css'
import {useState, useContext} from 'react'


// COntext authenticaded
import { Context } from '../../context/UserContext' 

function NavBar(){
    const {authenticaded, logout} = useContext(Context)
    return (
        <nav className={styles.navbar} >
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get a Pet" />
                <h2>Get a Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/" >Adotar</Link>
                </li>


            
            { authenticaded ? ( 
                <>
               <li>
                    <Link to="/user/profile" >Perfil</Link>
                </li>
                    <li onClick={logout} >Sair</li>
                </>
            
            ) : ( <>
                <li>
                    <Link to="/login" >Entrar</Link>
                </li>
                <li>
                    <Link to="/register" >Cadastrar</Link>
                </li>
            </>) }
            </ul>
        </nav>
    )
}

export default NavBar
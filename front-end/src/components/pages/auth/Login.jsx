import {useState, useContext} from 'react'
import styles   from '../../form/Form.module.css'
import { Link } from 'react-router-dom';


// Context
import {Context} from '../../../context/UserContext'
import Input from '../../form/Input'



function Login(){

    const [user, setUser]  = useState({})
    const {login} = useContext(Context)

    function handleChange(e){
        setUser({...user,[e.target.name] : e.target.value})
        console.log(user)
    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} action="">


                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />

                <Input
                    type="submit"
                    value="Entrar"
          
                />

            </form>
            <p>
                Não tem conta ? <Link to="/register" >Clique aqui</Link>
            </p>
        </section>
    )
}

export default Login
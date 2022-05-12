import Input from '../../form/Input'
import styles from '../../form/Form.module.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'


function Register(){
    const [user, setUser] = useState({})


    function handleChange(e){
        setUser({...user, [e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        // enviar um usuário para o banco
        console.log(user)
        
    }
    return (
        <section className={styles.form_container} >
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit} >
                <Input 
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange = {handleChange}
                    autocomplete="name"
                    />

                <Input 
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange = {handleChange}
                    autocomplete="phone"
                    />

                <Input 
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu E-mail"
                    handleOnChange = {handleChange}
                    autocomplete="email"

                    />
 
                 <Input 
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange = {handleChange}
                    autocomplete="password"

                />
                  <Input 
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange = {handleChange}
                    autocomplete="confirmpassword"
                />       

                <input type="submit" value="Cadastrar" />

            </form>
            <p>Já tem conta ? <Link to="/login" >Clique aqui</Link></p>
        </section>
    )
}

export default Register
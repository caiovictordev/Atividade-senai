import { Link } from "react-router-dom"
import './Login.css'
const Login = () => {
  return (
    <div className="loginPage">
        <div className="containerInput">
            <h2>Entre em sua conta</h2>
            <form action="">
                <label>
                    <span>Email</span>
                    <input type="text" placeholder="Seu email aqui"/>
                </label>
                <label>
                    <span>Senha</span>
                    <input type="text" placeholder="Sua senha aqui"/>
                </label>
                <button type="submit">Concluir cadastro</button>

                <Link to='/cadastro'>Já tem um cadastro? Clique aqui</Link>
            </form>
        </div>
        <div className="containerText">
            <h2>Bem vindo!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat accusamus, iure vitae doloremque quibusdam odio quos, alias delectus labore neque deleniti in est consectetur corporis! Repellendus provident excepturi doloribus. At.</p>
        </div>
    </div>
  )
}

export default Login
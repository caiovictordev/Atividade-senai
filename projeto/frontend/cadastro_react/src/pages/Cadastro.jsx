import { Link } from "react-router-dom"
const Cadastro = () => {
  return (
    <div className="cadastroPage">
        <div className="containerText">
            <h2>Bem vindo!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat accusamus, iure vitae doloremque quibusdam odio quos, alias delectus labore neque deleniti in est consectetur corporis! Repellendus provident excepturi doloribus. At.</p>
        </div>
        <div className="containerInput">
            <h2>Crie sua conta</h2>
            <form action="">
                <label>
                    <span>Nome Completo</span>
                    <input type="text" placeholder="Seu nome aqui"/>
                </label>
                <label>
                    <span>CPF</span>
                    <input type="text" placeholder="Seu cpf aqui"/>
                </label>
                <label>
                    <span>Email</span>
                    <input type="text" placeholder="Seu email aqui"/>
                </label>
                <label>
                    <span>Senha</span>
                    <input type="text" placeholder="Sua senha aqui"/>
                </label>
                <button type="submit">Concluir cadastro</button>

                <Link to='/'>Já tem um cadastro? Clique aqui</Link>
            </form>
        </div>
    </div>
    
  )
}

export default Cadastro
import './Login.css'
import { Link, useNavigate } from "react-router-dom"

import { useState } from "react";

const Login = () => {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [mensagem, setMensagem] = useState("");

async function fazerLogin(event) {
    event.preventDefault();

    try {
        const resposta = await fetch(
            "https://atividade-senai-api.onrender.com/api/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            setMensagem(dados.message);
            return;
        }

        navigate("/dashboard")

    } catch (error) {
        console.error(error);
        setMensagem("Erro ao conectar com o servidor.");
    }
}


  return (
    <div className="loginPage">
        <div className="containerInput">
            <h2>Entre em sua conta</h2>
            
            <form onSubmit={fazerLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu email"
                    required
                />

                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Sua senha"
                    required
                />

                <button type="submit">Entrar</button>

                <p>{mensagem}</p>

                <Link to="/cadastro">
                    Não tem cadastro? Clique aqui
                </Link>
            </form>
        </div>
        <div className="containerText">
            <h2>Bem-vindo!</h2>
            <p>
                Gerencie o acesso de alunos e professores
                de maneira prática e segura através da
                tecnologia RFID.
            </p>
        </div>
    </div>
  )
}

export default Login
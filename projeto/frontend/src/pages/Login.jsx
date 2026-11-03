import './Login.css'
import { Link, useNavigate } from "react-router-dom"

import { useState } from "react";

const Login = () => {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [mensagem, setMensagem] = useState("");
const [mostrarSenha, setMostrarSenha] = useState(false);

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

            <p className="loginSubtitle">
                Informe seus dados para acessar o sistema.
            </p>
            
            <form onSubmit={fazerLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu email"
                    required
                />

                <div className="campoSenha">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Sua senha"
                        required
                    />

                    <i
                        className={`fas ${mostrarSenha ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        role="button"
                        tabIndex={0}
                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setMostrarSenha(!mostrarSenha);
                            }
                        }}
                    ></i>
                </div>

                <button type="submit">Entrar</button>

                <p>{mensagem}</p>

                <Link to="/cadastro">
                    Não tem cadastro? Clique aqui
                </Link>
            </form>
            <div className="loginFooter">
                <i className="fas fa-shield-alt"></i>
                Sistema de controle de acesso RFID
            </div>
        </div>
        <div className="containerText">

            <div className="loginLogo">
                <i className="fas fa-id-card"></i>
                <span>RFID Access</span>
            </div>

            <div className="loginTag">
                <span></span>
                Sistema de controle de acesso
            </div>

            <h2>
                Bem-vindo ao <strong>RFID Access.</strong>
            </h2>

            <p>
                Gerencie o acesso de alunos e professores de maneira
                prática, inteligente e segura através da tecnologia RFID.
            </p>

            <div className="loginFeatures">
                <div className="loginFeature">
                    <i className="fas fa-wifi"></i>
                    Controle por tecnologia RFID
                </div>

                <div className="loginFeature">
                    <i className="fas fa-users"></i>
                    Gestão de alunos e professores
                </div>

                <div className="loginFeature">
                    <i className="fas fa-shield-alt"></i>
                    Gerenciamento de acessos
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.css";

const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrarUsuario(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            setMensagem("As senhas não coincidem.");
            return;
        }

        setMensagem("Cadastrando...");
        setCarregando(true);

        try {
            const resposta = await fetch(
                "https://atividade-senai-api.onrender.com/api/user/cadastro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        email,
                        senha,
                        confirmarSenha
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(dados.message || "Erro ao cadastrar.");
                return;
            }

            navigate("/");
        } catch (error) {
            console.error(error);
            setMensagem("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="cadastroPage">
            <div className="containerText">
                <h2>Bem vindo!</h2>
                <p>Faça seu cadastro para acessar o sistema.</p>
            </div>

            <div className="containerInput">
                <h2>Crie sua conta</h2>

                <form onSubmit={cadastrarUsuario}>
                    <label>
                        <span>Nome Completo</span>
                        <input
                            type="text"
                            placeholder="Seu nome aqui"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            placeholder="Seu email aqui"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <span>Senha</span>
                        <input
                            type="password"
                            placeholder="Sua senha aqui"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <span>Confirmar senha</span>
                        <input
                            type="password"
                            placeholder="Digite sua senha novamente"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Concluir cadastro"}
                    </button>

                    <p>{mensagem}</p>

                    <Link to="/">
                        Já tem um cadastro? Clique aqui
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Cadastro;

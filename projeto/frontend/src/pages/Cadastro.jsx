
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

const Cadastro = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function cadastrarUsuario(event) {
        event.preventDefault();

        setMensagem("Cadastrando...");

        try {
            const resposta = await fetch(
                "http://localhost:3000/api/user/cadastro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        cpf,
                        email,
                        senha
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(dados.message || "Erro ao cadastrar.");
                return;
            }

            setMensagem(dados.message);
            

            navigate("/")
            setNome("");
            setCpf("");
            setEmail("");
            setSenha("");

        } catch (error) {
            console.error(error);
            setMensagem("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <div className="cadastroPage">
            <div className="containerText">
                <h2>Bem vindo!</h2>
                <p>
                    Faça seu cadastro para acessar o sistema.
                </p>
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
                        <span>CPF</span>
                        <input
                            type="text"
                            placeholder="Seu CPF aqui"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
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

                    <button type="submit">
                        Concluir cadastro
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

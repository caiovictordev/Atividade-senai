import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Pessoa.css";

const Pessoa = () => {
    const navigate = useNavigate();
    function sairDoSistema() {
        navigate("/");
    }

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("aluno");
    const [turno, setTurno] = useState("manha");
    const [turma, setTurma] = useState("");
    const [uidRfid, setUidRfid] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrarPessoa(event) {
        event.preventDefault();

        setMensagem("");
        setCarregando(true);

        try {
            const resposta = await fetch(
                "http://localhost:3000/api/pessoas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        tipo,
                        turno,
                        turma,
                        uid_rfid: uidRfid
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(dados.message || "Erro ao cadastrar pessoa.");
                return;
            }

            setMensagem(dados.message);
            setNome("");
            setTipo("aluno");
            setTurno("manha");
            setTurma("");
            setUidRfid("");

        } catch (error) {
            console.error(error);
            setMensagem("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="pessoaPage">
            <section className="pessoaContainer">

                <header className="pessoaHeader">
                    <div>
                        <h1>Cadastrar pessoa</h1>
                        <p>
                            Cadastre alunos e professores no sistema RFID.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btnSair"
                        onClick={sairDoSistema}
                    >
                        Sair do sistema
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate("/lista-pessoas")}
                    >
                        Ver pessoas cadastradas
                    </button>
                </header>


                <form onSubmit={cadastrarPessoa} className="pessoaForm">
                    <label>
                        Nome completo
                        <input
                            type="text"
                            placeholder="Digite o nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            maxLength={100}
                            required
                        />
                    </label>

                    <label>
                        Tipo de pessoa
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                        >
                            <option value="aluno">Aluno</option>
                            <option value="professor">Professor</option>
                        </select>
                    </label>

                    <label>
                        Turno
                        <select
                            value={turno}
                            onChange={(e) => setTurno(e.target.value)}
                            required
                        >
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                        </select>
                    </label>

                    <label>
                        Turma
                        <input
                            type="text"
                            placeholder="Ex.: 2º ano A"
                            value={turma}
                            onChange={(e) => setTurma(e.target.value)}
                            maxLength={30}
                        />
                    </label>

                    <label>
                        UID do cartão RFID
                        <input
                            type="text"
                            placeholder="Digite ou aproxime o cartão"
                            value={uidRfid}
                            onChange={(e) => setUidRfid(e.target.value)}
                            maxLength={50}
                            required
                        />
                    </label>

                    <button type="submit" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Cadastrar pessoa"}
                    </button>

                    {mensagem && (
                        <p role="status" className="pessoaMensagem">
                            {mensagem}
                        </p>
                    )}
                </form>
            </section>
        </main>
    );
};

export default Pessoa;

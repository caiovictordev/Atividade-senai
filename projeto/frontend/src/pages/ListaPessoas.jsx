
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListaPessoas.css";

const ListaPessoas = () => {
    const [pessoas, setPessoas] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function buscarPessoas() {
            try {
                const resposta = await fetch(
                    "http://localhost:3000/api/pessoas"
                );

                const dados = await resposta.json();

                if (!resposta.ok) {
                    setMensagem(
                        dados.message || "Erro ao carregar pessoas."
                    );
                    return;
                }

                setPessoas(dados);
            } catch (error) {
                console.error(error);
                setMensagem("Não foi possível conectar ao servidor.");
            } finally {
                setCarregando(false);
            }
        }

        buscarPessoas();
    }, []);
    async function excluirPessoa(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta pessoa?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch(
                `http://localhost:3000/api/pessoas/${id}`,
                {
                    method: "DELETE"
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(dados.message || "Erro ao excluir pessoa.");
                return;
            }

            setPessoas((listaAtual) =>
                listaAtual.filter((pessoa) => pessoa.id !== id)
            );

            setMensagem(dados.message);
        } catch (error) {
            console.error(error);
            setMensagem("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <main className="listaPessoasPage">
            <section className="listaPessoasContainer">
                <header className="listaPessoasHeader">
                    <div>
                        <h1>Pessoas cadastradas</h1>
                        <p>
                            Consulte os alunos e professores do sistema RFID.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/pessoas")}
                    >
                        Cadastrar pessoa
                    </button>
                </header>

                <div className="listaPessoasResumo">
                    <div className="resumoCard">
                        <span>Total de pessoas</span>
                        <strong>{pessoas.length}</strong>
                    </div>

                    <div className="resumoCard">
                        <span>Alunos</span>
                        <strong>
                            {pessoas.filter(
                                (pessoa) => pessoa.tipo === "aluno"
                            ).length}
                        </strong>
                    </div>

                    <div className="resumoCard">
                        <span>Professores</span>
                        <strong>
                            {pessoas.filter(
                                (pessoa) => pessoa.tipo === "professor"
                            ).length}
                        </strong>
                    </div>
                </div>

                {carregando ? (
                    <p className="listaPessoasMensagem">
                        Carregando pessoas...
                    </p>
                ) : mensagem ? (
                    <p className="listaPessoasMensagem">{mensagem}</p>
                ) : pessoas.length === 0 ? (
                    <p className="listaPessoasMensagem">
                        Nenhuma pessoa cadastrada ainda.
                    </p>
                ) : (
                    <div className="tabelaPessoasWrapper">
                        <table className="tabelaPessoas">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Turno</th>
                                    <th>Turma</th>
                                    <th>UID RFID</th>
                                    <th>Ações</th>

                                </tr>
                            </thead>

                            <tbody>
                                {pessoas.map((pessoa) => (
                                    <tr key={pessoa.id}>
                                        <td>{pessoa.nome}</td>
                                        <td>
                                            <span
                                                className={`tipoPessoa ${pessoa.tipo}`}
                                            >
                                                {pessoa.tipo === "aluno"
                                                    ? "Aluno"
                                                    : "Professor"}
                                            </span>
                                        </td>
                                        <td>
                                            {pessoa.turno === "manha"
                                                ? "Manhã"
                                                : pessoa.turno === "tarde"
                                                ? "Tarde"
                                                : "Noite"}
                                        </td>
                                        <td>{pessoa.turma || "—"}</td>
                                        <td>{pessoa.uid_rfid}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btnExcluir"
                                                onClick={() => excluirPessoa(pessoa.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <footer className="listaPessoasFooter">
                    Exibindo {pessoas.length} pessoa(s)
                </footer>
            </section>
        </main>
    );
};

export default ListaPessoas;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListaPessoas.css";

const ListaPessoas = () => {
    const [pessoas, setPessoas] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function buscarPessoas() {
            try {
                const resposta = await fetch(
                    "https://atividade-senai-api.onrender.com/api/pessoas"
                );

                const dados = await resposta.json();

                if (!resposta.ok) {
                    setMensagem(dados.message || "Erro ao carregar pessoas.");
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

    // Filtrar pessoas de acordo com a pesquisa
    const pessoasFiltradas = pessoas.filter((pessoa) => {
        const termo = busca
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const campos = [
            pessoa.nome,
            pessoa.tipo,
            pessoa.turma,
            pessoa.turno,
            pessoa.uid_rfid
        ];

        return campos.some((campo) =>
            String(campo || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(termo)
        );
    });

    async function excluirPessoa(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta pessoa?"
        );

        if (!confirmar) return;

        try {
            const resposta = await fetch(
                `https://atividade-senai-api.onrender.com/api/pessoas/${id}`,
                {
                    method: "DELETE"
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.message || "Erro ao excluir pessoa.");
                return;
            }

            setPessoas((listaAtual) =>
                listaAtual.filter((pessoa) => pessoa.id !== id)
            );

            alert(dados.message || "Pessoa excluída com sucesso!");
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

                {mensagem && (
                    <p className="listaPessoasMensagem" role="status">
                        {mensagem}
                    </p>
                )}

                {!carregando && pessoas.length > 0 && (
                    <div className="buscaPessoas">
                        <i className="fas fa-search"></i>

                        <input
                            type="search"
                            placeholder="Buscar por nome, turma, tipo, turno ou UID..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        {busca && (
                            <button
                                type="button"
                                className="limparBusca"
                                onClick={() => setBusca("")}
                                aria-label="Limpar pesquisa"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                )}

                {carregando ? (
                    <p className="listaPessoasMensagem">
                        Carregando pessoas...
                    </p>
                ) : pessoas.length === 0 ? (
                    <p className="listaPessoasMensagem">
                        Nenhuma pessoa cadastrada ainda.
                    </p>
                ) : pessoasFiltradas.length === 0 ? (
                    <p className="listaPessoasMensagem">
                        Nenhuma pessoa encontrada para "{busca}".
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
                                    <th>Editar</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pessoasFiltradas.map((pessoa) => (
                                    <tr key={pessoa.id}>
                                        <td>{pessoa.nome}</td>

                                        <td>
                                            <span className={`tipoPessoa ${pessoa.tipo}`}>
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
                                                className="btnEditar"
                                                onClick={() =>
                                                    navigate("/pessoas", {
                                                        state: { pessoa }
                                                    })
                                                }
                                            >
                                                Editar
                                            </button>
                                        </td>

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
                    Exibindo {pessoasFiltradas.length} de {pessoas.length} pessoa(s)
                </footer>

            </section>
        </main>
    );
};

export default ListaPessoas;

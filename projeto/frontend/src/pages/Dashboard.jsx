import { useEffect, useState } from "react";
import "./Dashboard.css";

const API_URL = "https://atividade-senai-api.onrender.com/api/pessoas";

const Dashboard = () => {
    const [pessoas, setPessoas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function carregarPessoas() {
            try {
                const resposta = await fetch(API_URL);

                if (!resposta.ok) {
                    throw new Error("Não foi possível carregar as pessoas.");
                }

                const dados = await resposta.json();

                setPessoas(Array.isArray(dados) ? dados : dados.pessoas || []);
            } catch (error) {
                console.error(error);
                setMensagem("Erro ao carregar os dados do Dashboard.");
            } finally {
                setCarregando(false);
            }
        }

        carregarPessoas();
    }, []);

    const totalPessoas = pessoas.length;

    const totalAlunos = pessoas.filter(
        pessoa => pessoa.tipo === "aluno"
    ).length;

    const totalProfessores = pessoas.filter(
        pessoa => pessoa.tipo === "professor"
    ).length;

    const pessoasRecentes = [...pessoas].slice(-5).reverse();

    if (carregando) {
        return <p className="dashboardMessage">Carregando Dashboard...</p>;
    }

    return (
        <section className="dashboard">

            <div className="dashboardWelcome">
                <div>
                    <h2>Visão geral</h2>
                    <p>Acompanhe as informações dos usuários cadastrados no sistema.</p>
                </div>

                <span className="dashboardTag">
                    <i className="fa-solid fa-shield-halved"></i>
                    Sistema RFID
                </span>
            </div>

            {mensagem && (
                <p className="dashboardError">{mensagem}</p>
            )}

            <div className="dashboardCards">

                <article className="dashboardCard">
                    <div className="cardIcon blue">
                        <i className="fa-solid fa-users"></i>
                    </div>

                    <span>Total de pessoas</span>
                    <strong>{totalPessoas}</strong>
                    <small>Cadastros no sistema</small>
                </article>

                <article className="dashboardCard">
                    <div className="cardIcon green">
                        <i className="fa-solid fa-user-graduate"></i>
                    </div>

                    <span>Alunos</span>
                    <strong>{totalAlunos}</strong>
                    <small>Alunos cadastrados</small>
                </article>

                <article className="dashboardCard">
                    <div className="cardIcon purple">
                        <i className="fa-solid fa-chalkboard-user"></i>
                    </div>

                    <span>Professores</span>
                    <strong>{totalProfessores}</strong>
                    <small>Professores cadastrados</small>
                </article>

            </div>

            <div className="dashboardRecent">

                <div className="recentHeader">
                    <div>
                        <h3>Cadastros recentes</h3>
                        <p>Últimas pessoas retornadas pela API</p>
                    </div>
                </div>

                {pessoasRecentes.length > 0 ? (
                    <div className="recentList">
                        {pessoasRecentes.map(pessoa => (
                            <div className="recentItem" key={pessoa.id}>
                                <div className="recentAvatar">
                                    <i className="fa-solid fa-user"></i>
                                </div>

                                <div className="recentInfo">
                                    <strong>{pessoa.nome}</strong>
                                    <span>
                                        {pessoa.tipo === "aluno"
                                            ? "Aluno"
                                            : "Professor"}
                                    </span>
                                </div>

                                <span className="recentTurno">
                                    {pessoa.turno || "Sem turno"}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="emptyRecent">
                        Nenhuma pessoa cadastrada ainda.
                    </p>
                )}

            </div>
        </section>
    );
};

export default Dashboard;
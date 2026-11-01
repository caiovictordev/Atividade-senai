import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import "./Configuracoes.css";

const Configuracoes = () => {
    const { tema, alternarTema } = useTheme();
    const navigate = useNavigate();

    function sairDoSistema() {
        // Remove dados de autenticação, preservando a preferência de tema.
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        sessionStorage.clear();

        navigate("/", { replace: true });
    }

    return (
        <section className="configPage">

            <div className="configIntro">
                <h2>Configurações</h2>
                <p>Personalize sua experiência no sistema.</p>
            </div>

            <div className="configSection">
                <div className="configSectionTitle">
                    <div className="configIcon">
                        <i className="fa-solid fa-palette"></i>
                    </div>

                    <div>
                        <h3>Aparência</h3>
                        <p>Personalize a aparência do sistema.</p>
                    </div>
                </div>

                <div className="configOption">
                    <div className="configOptionInfo">
                        <strong>Tema do sistema</strong>
                        <span>
                            Escolha entre o tema claro e o escuro.
                        </span>
                    </div>

                    <button
                        className="configThemeButton"
                        onClick={alternarTema}
                    >
                        <i className={`fa-solid ${
                            tema === "dark" ? "fa-moon" : "fa-sun"
                        }`}></i>

                        {tema === "dark" ? "Escuro" : "Claro"}
                    </button>
                </div>
            </div>

            <div className="configSection">
                <div className="configSectionTitle">
                    <div className="configIcon">
                        <i className="fa-solid fa-shield-halved"></i>
                    </div>

                    <div>
                        <h3>Sessão</h3>
                        <p>Gerencie sua sessão atual.</p>
                    </div>
                </div>

                <div className="configOption">
                    <div className="configOptionInfo">
                        <strong>Sair do sistema</strong>
                        <span>
                            Encerre sua sessão e volte para o login.
                        </span>
                    </div>

                    <button
                        className="configLogoutButton"
                        onClick={sairDoSistema}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Sair
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Configuracoes;
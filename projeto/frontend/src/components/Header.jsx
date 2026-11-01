import { useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const location = useLocation();

    const paginas = {
        "/dashboard": "Dashboard",
        "/lista-pessoas": "Pessoas cadastradas",
        "/pessoas": "Cadastro de pessoa"
    };

    const titulo = paginas[location.pathname] || "Área administrativa";

    return (
        <header className="adminHeader">
            <div>
                <span className="headerSubtitle">PAINEL ADMINISTRATIVO</span>
                <h1>{titulo}</h1>
            </div>

            <div className="headerProfile">
                <div className="headerAvatar">
                    <i className="fa-solid fa-user"></i>
                </div>

                <div className="headerUserInfo">
                    <strong>Administrador</strong>
                    <span>Gerenciamento do sistema</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
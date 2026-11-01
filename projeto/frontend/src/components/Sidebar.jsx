import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebarLogo">
                <div className="logoIcon">S</div>
                <h2>SENAI <span>Access</span></h2>
            </div>

            <div className="sidebarSection">
                <span className="sidebarLabel">MENU PRINCIPAL</span>

                <nav className="sidebarNav">
                    <NavLink to="/dashboard" className="sidebarLink">
                        <i className="fa-solid fa-chart-pie"></i>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/lista-pessoas" className="sidebarLink">
                        <i className="fa-solid fa-users"></i>
                        <span>Pessoas cadastradas</span>
                    </NavLink>

                    <NavLink to="/pessoas" className="sidebarLink">
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Cadastrar pessoa</span>
                    </NavLink>
                    <NavLink to="/configuracoes" className="sidebarLink">
                        <i className="fa-solid fa-gear"></i>
                        <span>Configurações</span>
                    </NavLink>
                </nav>
            </div>

            <div className="sidebarFooter">
                <div className="sidebarStatus">
                    <span className="statusDot"></span>
                    Sistema conectado
                </div>
                <span>Controle de acesso RFID</span>
            </div>
        </aside>
    );
};

export default Sidebar;
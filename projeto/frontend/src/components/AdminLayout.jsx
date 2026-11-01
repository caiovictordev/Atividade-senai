import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AdminLayout.css";

const AdminLayout = () => {
    return (
        <div className="adminLayout">
            <Sidebar />

            <main className="adminMain">
                <Header />

                <div className="adminContent">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
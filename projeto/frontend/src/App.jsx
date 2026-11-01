import "./App.css";

import {
    BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Pessoa from "./pages/Pessoa";
import ListaPessoas from "./pages/ListaPessoas";
import Dashboard from "./pages/Dashboard";

import AdminLayout from "./components/AdminLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Área pública */}
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Área administrativa */}
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pessoas" element={<Pessoa />} />
                    <Route path="/lista-pessoas" element={<ListaPessoas />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
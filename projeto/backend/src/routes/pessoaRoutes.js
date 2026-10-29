
import express from "express";
import PessoaController from "../controllers/pessoaController.js";

const pessoaRoute = express.Router();

pessoaRoute.post("/pessoas", PessoaController.cadastrar);
pessoaRoute.get("/pessoas", PessoaController.listar);
pessoaRoute.delete("/pessoas/:id", PessoaController.excluir);

export default pessoaRoute;


import express from "express";
import PessoaController from "../controllers/pessoaController.js";
import validarDispositivo from "../middlewares/validarDispositivo.js";

const pessoaRoute = express.Router();

pessoaRoute.post("/pessoas", PessoaController.cadastrar);
pessoaRoute.get("/pessoas", PessoaController.listar);
pessoaRoute.post("/catraca/validar", validarDispositivo, PessoaController.validarCartao);
pessoaRoute.put("/pessoas/:id", PessoaController.atualizar);
pessoaRoute.delete("/pessoas/:id", PessoaController.excluir);

export default pessoaRoute;

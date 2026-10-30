
import pessoaModel from "../models/pessoaModel.js";

// Verifica se o CPF possui 11 números
function cpfValido(cpf) {
    return /^\d{11}$/.test(String(cpf).replace(/\D/g, ""));
}

class PessoaController {
    static async cadastrar(req, res) {
        try {
            const { nome, cpf, tipo, turno, turma, uid_rfid } = req.body;

            if (!nome || !cpf || !tipo || !turno || !uid_rfid) {
                return res.status(400).json({
                    message: "Preencha os campos obrigatórios."
                });
            }

            if (!cpfValido(cpf)) {
                return res.status(400).json({
                    message: "CPF inválido. Informe os 11 números."
                });
            }

            if (!["aluno", "professor"].includes(tipo)) {
                return res.status(400).json({
                    message: "Tipo de pessoa inválido."
                });
            }

            if (!["manha", "tarde", "noite"].includes(turno)) {
                return res.status(400).json({
                    message: "Turno inválido."
                });
            }

            await pessoaModel.cadastrarPessoa(
                nome,
                String(cpf).replace(/\D/g, ""),
                tipo,
                turno,
                turma,
                uid_rfid
            );

            return res.status(201).json({
                message: "Pessoa cadastrada com sucesso!"
            });

        } catch (error) {
            console.error(error);

            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "CPF ou UID RFID já cadastrado."
                });
            }

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    }

    static async listar(req, res) {
        try {
            const pessoas = await pessoaModel.listarPessoas();

            return res.status(200).json(pessoas);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Erro ao buscar pessoas cadastradas."
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;

            const {
                nome,
                cpf,
                tipo,
                turno,
                turma,
                uid_rfid
            } = req.body;

            if (!/^[1-9]\d*$/.test(id)) {
                return res.status(400).json({
                    message: "ID inválido."
                });
            }

            if (!nome || !cpf || !tipo || !turno || !uid_rfid) {
                return res.status(400).json({
                    message: "Preencha os campos obrigatórios."
                });
            }

            if (!cpfValido(cpf)) {
                return res.status(400).json({
                    message: "CPF inválido. Informe os 11 números."
                });
            }

            if (!["aluno", "professor"].includes(tipo)) {
                return res.status(400).json({
                    message: "Tipo de pessoa inválido."
                });
            }

            if (!["manha", "tarde", "noite"].includes(turno)) {
                return res.status(400).json({
                    message: "Turno inválido."
                });
            }

            const resultado = await pessoaModel.atualizarPessoa(
                id,
                {
                    nome,
                    cpf: String(cpf).replace(/\D/g, ""),
                    tipo,
                    turno,
                    turma,
                    uid_rfid
                }
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    message: "Pessoa não encontrada ou nenhum dado foi alterado."
                });
            }

            return res.status(200).json({
                message: "Pessoa atualizada com sucesso."
            });

        } catch (error) {
            console.error(error);

            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "CPF ou UID RFID já cadastrado."
                });
            }

            return res.status(500).json({
                message: "Erro ao atualizar pessoa."
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!/^[1-9]\d*$/.test(id)) {
                return res.status(400).json({
                    message: "ID inválido."
                });
            }

            const resultado = await pessoaModel.excluirPessoa(id);

            if (resultado === 0) {
                return res.status(404).json({
                    message: "Pessoa não encontrada."
                });
            }

            return res.status(200).json({
                message: "Pessoa excluída com sucesso!"
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Erro ao excluir pessoa."
            });
        }
    }
}

export default PessoaController;

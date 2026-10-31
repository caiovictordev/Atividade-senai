
import conect from "../config/database.js";

async function cadastrarPessoa(nome, cpf, tipo, turno, turma, uid_rfid) {
    const sql = `
        INSERT INTO pessoas (nome, cpf, tipo, turno, turma, uid_rfid)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [dados] = await conect.execute(sql, [
        nome,
        cpf,
        tipo,
        turno,
        turma || null,
        uid_rfid
    ]);

    return dados;
}

async function atualizarPessoa(id, pessoa) {
    const sql = `
        UPDATE pessoas
        SET nome = ?,
            cpf = ?,
            tipo = ?,
            turno = ?,
            turma = ?,
            uid_rfid = ?
        WHERE id = ?
    `;

    const [dados] = await conect.execute(sql, [
        pessoa.nome,
        pessoa.cpf,
        pessoa.tipo,
        pessoa.turno,
        pessoa.turma || null,
        pessoa.uid_rfid,
        id
    ]);

    return dados;
}

async function listarPessoas() {
    const sql = `
        SELECT id, nome, cpf, tipo, turno, turma, uid_rfid
        FROM pessoas
        ORDER BY nome ASC
    `;

    const [dados] = await conect.execute(sql);

    return dados;
}

async function buscarPessoaPorUID(uid_rfid) {
    const sql = `
        SELECT id, nome, tipo, turno, turma
        FROM pessoas
        WHERE uid_rfid = ?
        LIMIT 1
    `;

    const [dados] = await conect.execute(sql, [uid_rfid])
    return dados[0]
}

async function excluirPessoa(id) {
    const sql = "DELETE FROM pessoas WHERE id = ?";
    const [dados] = await conect.execute(sql, [id]);

    return dados.affectedRows;
}

export default { cadastrarPessoa, atualizarPessoa, listarPessoas, buscarPessoaPorUID, excluirPessoa };

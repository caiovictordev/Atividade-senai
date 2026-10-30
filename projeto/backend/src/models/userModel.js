
import conect from "../config/database.js";

// Pegar todos os usuários do banco de dados
async function getUser() {
    const sql = `
        SELECT * FROM users
    `;

    const [dados] = await conect.execute(sql);
    return dados;
}

// Cadastrar usuário no banco de dados
async function userRegister(nome, email, senha) {
    const sql = `
        INSERT INTO users (
            nome,
            email,
            senha
        ) VALUES (?, ?, ?)
    `;

    const [dados] = await conect.execute(sql, [nome, email, senha]);
    return dados;
}

// Buscar usuário pelo email
async function findEmail(email) {
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    const [dados] = await conect.execute(sql, [email]);
    return dados[0];
}

// Excluir usuário
async function deleteuser(id) {
    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    const [dados] = await conect.execute(sql, [id]);
    return dados.affectedRows;
}

export default { userRegister, getUser, findEmail, deleteuser };

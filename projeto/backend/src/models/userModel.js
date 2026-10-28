import conect from "../config/database";

//Pegar todos os usuários do banco de dados
async function getUser() {
    const sql = `
        SELECT * FROM users
    `;
    const [dados] = await conect.execute(sql)
    return dados
}

//Cadastrar usuário no banco de dados
async function userRegister(nome, cpf, email, senha) {
    const sql = `
        INSERT INTO users(
        nome,
        cpf,
        email, 
        senha
        )VALUES(?, ?, ?, ?);   
    `;
    const [dados] = await conect.execute(sql, [nome, cpf, email, senha])
    return dados
}

async function findEmail(email){
    const sql = `
        SELECT * FROM users
        WHERE email = ? 
    `;

    const dados = await conect.execute(sql, [email])
    return dados[0]
}

export default { userRegister, getUser, findEmail }
import conect from "../config/database";


async function getUser() {
    const sql=`
        SELECT * FROM user
    `;
    const [dados] = await conect.execute(sql)
    return dados
}

async function userRegister(nome, email, senha) {
    const sql = `
        INSERT INTO user(
        nome,
        email, 
        senha
        )VALUES(?, ?, ?);   
    `;
    const [dados] = await conect.execute(sql[nome, email, senha])
    return dados
}

export default {userRegister, getUser}
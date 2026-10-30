
import conect from "./src/config/database.js";

async function testarConexao() {
    try {
        const [tabelas] = await conect.query("SHOW TABLES");

        console.log("Tabelas encontradas no banco online:");

        console.table(tabelas);

        await conect.end();

    } catch (error) {
        console.error("Erro:", error.message);
    }
}

testarConexao();

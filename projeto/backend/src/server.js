
import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

const porta = process.env.PORTA || 3000;
const end = process.env.END || "http://localhost";

app.listen(porta, () => {
    console.log(`O servidor está rodando aqui: ${end}:${porta}`);
});

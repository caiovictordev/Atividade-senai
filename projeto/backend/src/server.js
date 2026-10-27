import express from "express";
import "dotenv/config"
import routes from "./routes";

const app = express()


routes(app)

const porta = process.env.PORTA
const end = process.env.END

app.listen(porta, ()=> console.log(`O servidor está rodando aqui: ${end}:${porta}`)) 
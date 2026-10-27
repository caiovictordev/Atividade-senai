import mysql from "mysql2/promise"
import 'dotenv/config'

const conect = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

export default conect
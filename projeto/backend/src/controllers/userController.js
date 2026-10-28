import userModel from "../models/userModel"
import bcrypt from "bcrypt"

class ControlerUser {

    async listUser(req, res) {
        try {
            const userGet = await userModel.getUser();
            return res.status(200).json({ userGet })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Erro interno no Servidor"
            })
        }
    }

    async userRegisterController(req, res) {
        try {
            const { nome, email, senha } = req.body

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    message: "Todos os campos devem ser preenchidos"
                })
            }
            const userEmail = await userModel.findEmail(email)
            if(userEmail){
                return res.status(400).json({
                    message: "Este usuário já existe"
                }) 
            }


            const hash = await bcrypt.hash(senha, 10)
            await userModel.userRegister(nome, email, hash)
            return res.status(201).json({
                message: "Usuário cadastrado com sucesso"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Erro interno no Servidor"
            })
        }
    }


}
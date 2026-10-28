import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

class ControlerUser {

    static async listUser(req, res) {
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

    static async userRegisterController(req, res) {
        try {
            const { nome, cpf, email, senha } = req.body

            if (!nome || !cpf || !email || !senha) {
                return res.status(400).json({
                    message: "Todos os campos devem ser preenchidos"
                })
            }
            const userEmail = await userModel.findEmail(email)
            if (userEmail) {
                return res.status(400).json({
                    message: "Este usuário já existe"
                })
            }


            const hash = await bcrypt.hash(senha, 10)
            await userModel.userRegister(nome, cpf, email, hash)
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

    static async userLogin(req, res) {
        try {
            const { email, senha } = req.body
            if (!email || !senha) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios"
                })
            }

            const user = await userModel.findEmail(email)
            if(!user){
                return res.status(400).json({
                    message: "Email ou senha incorretos"
                })
            }

            const passwordCompare = await bcrypt.compare(
                senha,
                user.senha
            )
            if(!passwordCompare){
                return res.status(400).json({
                    message: "Email ou senha incorretos"
                })
            }

            return res.status(200).json({
                message: "Login efetuado com sucesso!"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Erro interno no Servidor"
            })
        }
    }


}

export default ControlerUser;
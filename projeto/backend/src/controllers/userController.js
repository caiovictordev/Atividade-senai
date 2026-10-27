import userModel from "../models/userModel"

class ControlerUser{

    async getUserController(req, res){
        try {
            const userGet = await userModel.getUser();
            return res.status(200).json({userGet})
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Erro interno no Servidor"
            })
        }
    }

    async userRegisterController(req, res){
        try {
            const {nome, email, senha} = req.body

            // Verificação de campos preenchidos
            if(!nome || !email || !senha){
                return res.status(400).json({
                    message: "Todos os campos devem ser preenchidos"
                })
            }

            
            
            await userModel.userRegister()
        
        } catch (error) {
            
        }
    }


}
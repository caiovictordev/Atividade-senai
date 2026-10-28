import express from "express";
import ControlerUser from "../controllers/userController";

const userRoute = express.Router();

userRoute.get('/users', ControlerUser.listUser);
userRoute.post('/user/cadastro', ControlerUser.userRegisterController);
userRoute.post('/user/login', ControlerUser.userLogin);
userRoute.delete('/user/delete/:id', ControlerUser.deleteUser);


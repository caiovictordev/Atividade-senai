
import express from "express";
import userRoute from "./userRoutes.js";
import pessoaRoute from "./pessoaRoutes.js";

const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Servidor Rodando");
    });

    app.use("/api", userRoute);
    app.use("/api", pessoaRoute);
};

export default routes;

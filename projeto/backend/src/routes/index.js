
import express from "express";
import userRoute from "./userRoutes.js";

const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Servidor Rodando");
    });

    app.use("/api", userRoute);
};

export default routes;


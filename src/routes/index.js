import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
    
    app.use(express.json(), livros, autores); //esse é um middleware, usado para ter acesso à requisições e resposta e realizar ações com elas, como modificar ou colocar mais infos
};

export default routes;
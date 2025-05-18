import express from "express";

const app = express();
app.use(express.json()); //esse é um middleware, usado para ter acesso à requisições e resposta e realizar ações com elas, como modificar ou colocar mais infos

const livros = [
    {
        id: 1,
        titulo: "O Senhor dos Anéis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
];

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); //send é usado para dados mais simples, como texto
});

app.get("/livros",(req, res) => {
    res.status(200).json(livros); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!")
});

export default app
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

function buscaLivro(id){
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); //send é usado para dados mais simples, como texto
});

app.get("/livros",(req, res) => {
    res.status(200).json(livros); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
});

app.get("/livros/:id", (req, res) =>{ //os dois pontos servem para indicar que o id vai ser dinâmico
    const index = buscaLivro(req.params.id)
    res.status(200).json(livros[index])
})

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!")
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros)
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro deletado com sucesso")
})

export default app
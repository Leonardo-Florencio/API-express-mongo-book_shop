import { autor } from "../models/Autor.js"

class AutorController {

    static async listarAutores (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const listaAutores = await autor.find({});//.find é um metodo do mongoose que procura no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json(listaAutores); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na requisição` })
        }
    };

    static async listarAutorPorId (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);//.find é um metodo do mongoose que procura no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json(autorEncontrado); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na requisição do autor` })
        }
    };

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body) //.create é o método do mongoose que cria registros no MongoAtlas
            res.status(201).json({ message: "criado com sucesso", autor: novoAutor })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar autor` })
        }
        
    }

    static async atualizarAutor (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);//.findByIdAndUpdate é um metodo do mongoose que procura e atualiza no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json({ message: "Autor atualizado" }); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na atualização do Autor` })
        }
    };
    static async excluirAutor (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);//.findByIdAndDelete é um metodo do mongoose que procura e deleta no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json({ message: "autor excluído com sucesso" }); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha em deletar autor` })
        }
    };

};

export default AutorController;

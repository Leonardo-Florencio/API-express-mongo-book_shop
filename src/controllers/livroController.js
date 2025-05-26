import livro from "../models/livro.js"
import { autor } from "../models/Autor.js"

class LivroController {

    static async listarLivros (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const listaLivros = await livro.find({});//.find é um metodo do mongoose que procura no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json(listaLivros); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na requisição` })
        }
    };

    static async listarLivroPorId (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);//.find é um metodo do mongoose que procura no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json(livroEncontrado); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na requisição do livro` })
        }
    };

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor)
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro` })
        }
        
    }

    static async atualizarLivro (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);//.findByIdAndUpdate é um metodo do mongoose que procura e atualiza no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json({ message: "livro atualizado" }); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na atualização do livro` })
        }
    };
    static async excluirLivro (req, res) { //static async acontece pois o async pe pra conectar com o banco e static é pra não ter que criar uma instância da classe, só usar ela diretamente de forma estática
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);//.findByIdAndDelete é um metodo do mongoose que procura e deleta no mongoAtlas (está procurando na coleção livros que é passada no model livro)
            res.status(200).json({ message: "livro excluído com sucesso" }); //json é usado para passar informações do tipo json (variável é uma lista de objetos, estrutura do json)
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha em deletar o livro` })
        }
    };

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora })
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json ({ message: `${erro.message} - Falha na busca` })
        }
    }

};

export default LivroController;

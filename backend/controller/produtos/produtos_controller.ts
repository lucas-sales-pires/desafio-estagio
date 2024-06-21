import { InterfaceProduto } from "../../model/interface_produto";
import { conectarAoBanco } from "../banco/banco";



export async function adicionarProduto(req: any, res: any) {
    const { nome, preco, descricao, disponivel } = req.body;
    const produto:InterfaceProduto = { nome, preco, descricao, disponivel };
    try {
        const client = await conectarAoBanco();
        const db = client.db('loja');
        const produtos = db.collection('produtos');
        const resultado = await produtos.insertOne(produto);
        res.send('Produto adicionado com sucesso');
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).send('Erro ao adicionar produto');
    }
}

export async function listarProdutos(req: any, res: any) {
    try {
        const client = await conectarAoBanco();
        const db = client.db('loja');
        const produtos = db.collection('produtos');
        const resultado = await produtos.find().sort({ preco: 1 }).toArray();
        res.send(resultado);
    } catch (err) {
        console.error('Erro ao listar produtos:', err);
        res.status(500).send('Erro ao listar produtos');
    }
}

export async function removerTodosOsProdutos(req: any, res: any) {
    try {
        const client = await conectarAoBanco();
        const db = client.db('loja');
        const produtos = db.collection('produtos');
        await produtos.deleteMany({});
        res.send('Produtos removidos com sucesso');
    } catch (err) {
        console.error('Erro ao remover produtos:', err);
        res.status(500).send('Erro ao remover produtos');
    }
}

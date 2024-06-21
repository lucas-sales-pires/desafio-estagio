"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarProduto = adicionarProduto;
exports.listarProdutos = listarProdutos;
exports.removerTodosOsProdutos = removerTodosOsProdutos;
const banco_1 = require("../banco/banco");
function adicionarProduto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, preco, descricao, disponivel } = req.body;
        const produto = { nome, preco, descricao, disponivel };
        try {
            const client = yield (0, banco_1.conectarAoBanco)();
            const db = client.db('loja');
            const produtos = db.collection('produtos');
            const resultado = yield produtos.insertOne(produto);
            res.send('Produto adicionado com sucesso');
        }
        catch (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).send('Erro ao adicionar produto');
        }
    });
}
function listarProdutos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, banco_1.conectarAoBanco)();
            const db = client.db('loja');
            const produtos = db.collection('produtos');
            const resultado = yield produtos.find().sort({ preco: 1 }).toArray();
            res.send(resultado);
        }
        catch (err) {
            console.error('Erro ao listar produtos:', err);
            res.status(500).send('Erro ao listar produtos');
        }
    });
}
function removerTodosOsProdutos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, banco_1.conectarAoBanco)();
            const db = client.db('loja');
            const produtos = db.collection('produtos');
            yield produtos.deleteMany({});
            res.send('Produtos removidos com sucesso');
        }
        catch (err) {
            console.error('Erro ao remover produtos:', err);
            res.status(500).send('Erro ao remover produtos');
        }
    });
}

import express from 'express';
import { adicionarProduto,listarProdutos,removerTodosOsProdutos } from '../controller/produtos/produtos_controller';

export const router = express();

router.post('/cadastrar',adicionarProduto )
router.get('/listar',listarProdutos )
router.delete('/deletar',removerTodosOsProdutos)

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const produtos_controller_1 = require("../controller/produtos/produtos_controller");
exports.router = (0, express_1.default)();
exports.router.post('/cadastrar', produtos_controller_1.adicionarProduto);
exports.router.get('/listar', produtos_controller_1.listarProdutos);
exports.router.delete('/deletar', produtos_controller_1.removerTodosOsProdutos);

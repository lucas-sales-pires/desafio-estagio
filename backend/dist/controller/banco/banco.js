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
exports.conectarAoBanco = conectarAoBanco;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uri = process.env.MONGODB_URI;
const usuario = process.env.MONGODB_USUARIO;
const senha = process.env.MONGODB_SENHA;
const client = new mongodb_1.MongoClient(uri, { auth: { username: usuario, password: senha } });
function conectarAoBanco() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log('Conectado ao MongoDB');
            return client;
        }
        catch (err) {
            console.error('Erro ao conectar ao MongoDB:', err);
            throw err;
        }
    });
}

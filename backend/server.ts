import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import { router } from './rotas/rotas';

config();
const PORTA = process.env.PORTA || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);



app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});

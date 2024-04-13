import express from 'express';
//import cors from 'cors';
import dotenv from 'dotenv';
import candidatoRoutes from './routes/candidatoRoutes.js';
import rotavaga from './routes/vagaRoutes.js'
import rota_cand_vaga from './routes/entrevistaRoutes.js'

const app = express();
const porta = 3001;

app.use(express.json());

//app.use(cors({origin: "http://localhost:3000", credentials: true}));

dotenv.config();



app.use('/candidato', candidatoRoutes);
app.use('/vagas', rotavaga)
app.use('/inscricoes', rota_cand_vaga)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})
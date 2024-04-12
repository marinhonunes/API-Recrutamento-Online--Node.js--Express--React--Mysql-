import express from 'express';
//import cors from 'cors';
import dotenv from 'dotenv';
import candidatoRoutes from './routes/candidatoRoutes.js';
import rotavaga from './routes/vagaRoutes.js'

const app = express();
const porta = 3001;

app.use(express.json());

//app.use(cors({origin: "http://localhost:3000", credentials: true}));

dotenv.config();


app.use('/candidato', candidatoRoutes);
app.use('/vagas', rotavaga)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})
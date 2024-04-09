const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3001;

app.use(express.json());

app.use(cors({origin: "http://localhost:3000", credentials: true}));

const candidatoRoutes = require('./routes/candidatoRoutes');
app.use('/candidato', candidatoRoutes);

const vagaRoutes = require('./routes/vagaRoutes');
app.use('/vaga', vagaRoutes);

const entrevistaRoutes = require('./routes/entrevistaRoutes');
app.use('/entrevista', entrevistaRoutes);

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})
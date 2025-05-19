// importando bibliotecas

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser') 

// const app = express();

// app.use(cors());
// app.use(bodyParser());

// //Definição Rota Teste

// app.get('/api/test', (req , res) => {
//     res.json({ message: 'Backend Funcionando e conectado' })
// });

// // Definir a Porta do Servidor
// const PORT = 3001;

// app.listen(PORT, () => {
//     console.log('Servidor rodando na porta 3001 , acesse localhost://3001')
// });

const express = require('express');
const cors = require('cors');

const app = express();

// Configuração de middleware
app.use(cors());
app.use(express.json()); // Substitui body-parser para JSON
app.use(express.urlencoded({ extended: true })); // Para dados de formulário codificados na URL

// Definição da rota de teste
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend Funcionando e conectado' });
});

// Definir a porta do servidor
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}, acesse http://localhost:${PORT}`);
});

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
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Configuração de middleware
app.use(cors());
app.use(express.json()); // Substitui body-parser para JSON

const db = new sqlite3.Database('.tarefas.db',(err) => 
{
    if (err) {
        console.error("Erro ao conectar ao Sqlite: ",err);

    } else {
        console.error("Conectado ao Sqlite: ")
    }
}
);


db.serialize(() => {
    db.run(
        'CREATE TABLE IF NOT EXIXSTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL)'
    );
    db.run(
        'CREATE TABLE IF NOT EXIXSTS tarefas(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, userId INTEGER NOT NULL, FOREIGN KEY (userId) REFERENCES usuarios(id))'
    );
});

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


process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o sqlite', err);
        } else {
            console.log('Sqlite fechado com sucesso')
            process.exit(0);
        }
    });
});
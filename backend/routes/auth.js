const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const criaChaves = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();


//conecta ao DB
const db = new sqlite3.Database('.tarefas.db',(err) => 
{
    if (err) {
        console.error("Erro ao conectar ao Sqlite: ",err);

    } else {
        console.error("Conectado ao Sqlite: ")
    }
}
);

const router = express.Router(); //cria o roteador
const JWT_SECRET = 'chave-secreta-super-segura';

// rota para cadastro de usuário

router.post('/registro',(res, req) => {
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Email e senha são obrigatorios'});
    }
    // verifica se o email ja existe
    db.get('SELECT * FROM WHERE email = ?', [email], (err, usuario) => {
        if(err){
        return res.status(500).json({message: 'Erro no servidor'});
        }
        if(row){
            return res.status(500).json({message: 'Este email ja esta cadastrado'});
        }
        // criptografa a senha
        const hashedPassword = bcrypt.hashSync(password, 10);
        // insere usuário
        db.run('INSERT INTO usuarios (email, senha) VALUES (? , ?)', [email, hashedPassword], function (err){
        if(err){
            return res.status(500).json({message: 'Erro no servidor ao inserir usuario'});
        } 
        res.status(500).json({message: 'cadastrado com sucesso'}) 
        });
    });
});

// Rota para login
router.post('login', (res, req) => {
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Email e senha são obrigatorios'});
    }
    // verifica se o email ja existe
    db.get('SELECT * FROM WHERE email = ?', [email], (err, usuario) => {
        if(err){
        return res.status(500).json({message: 'Email ja está cadastrado'});
        }
        if(!usuario || !bcrypt.compareSync(password, usuario.password)){
            return res.status(401).json({message: 'Email ou senha incorretos'});
        }
        //cria token 
        const token = JWT_SECRET.substring({userId}, JWT_SECRET, {expiresIn: '1h'});
        res.json({message: 'Login bem sucedido', token, userId: usuarios.id})
    });
});

module.exports = router;
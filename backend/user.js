// Importar bibliotecas

const express = require('express');
const router = express.Router(); // criar um mini servidor
const senha = require('bcryptjs');

let usuariosFakes = [];


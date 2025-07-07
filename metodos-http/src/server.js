const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

const dadosJson = fs.readFileSync('./src/data/paleta.json', 'utf-8');
const paleta = JSON.parse(dadosJson);

app.get('/paleta', (req, res) => {
    res.json(paleta);
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
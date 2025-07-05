const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/api/saudacao', (req, res) => {
    res.json({ mensagem: "Olá" });
})

app.get('/api/somar', (req, res) => {
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    res.json({ soma: num1 + num2 });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
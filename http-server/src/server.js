const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.url === '/') {
        const filePath = path.join(__dirname, '../public/index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro interno no servidor');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return; // Para garantir que o servidor não continue executando outras rotas
    } 
    
    else if (req.url === '/api/saudacao') {
        const mensagem = { mensagem: 'Olá!' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mensagem));
        return;
    } 
    
    else if (parsedUrl.pathname === '/api/somar') {
        const num1 = Number(parsedUrl.query.num1);
        const num2 = Number(parsedUrl.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ erro: 'Parâmetros inválidos' }));
            return;
        }

        const soma = num1 + num2;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ resultado: soma }));
        return;
    } 

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Rota não encontrada');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
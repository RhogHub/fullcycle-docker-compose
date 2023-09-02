const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida.');

    // Query para inserir um nome
    const nome = 'Rodrigo';
    const sqlInsert = `INSERT INTO people(name) VALUES (?)`;
    connection.query(sqlInsert, [nome], (err, result) => {
        if (err) {
            console.error('Erro ao inserir nome:', err);
            return;
        }
        console.log('Nome inserido com sucesso.');
    });

    // Query para buscar nomes
    const searchSQLNames = `SELECT name FROM people LIMIT 50`;
    connection.query(searchSQLNames, (err, results) => {
        if (err) {
            console.error('Erro ao buscar nomes:', err);
            return;
        }

        const names = results.map((row) => row.name);

        // Configurar a rota após receber os nomes
        app.get('/', (req, res) => {
            let html = '<html><head><title>Lista de Nomes</title></head><body>';
            html += '<h1>Full Cycle Rocks!</h1> <br>';
            html += '<h1>Lista de Nomes</h1>';
            html += '<ul>';
            names.forEach((name) => {
                html += '<li>' + name + '</li>';
            });
            html += '</ul>';
            html += '</body></html>';
            res.send(html);
        });

        // Iniciar o servidor Express após configurar a rota
        app.listen(port, () => {
            console.log('Rodando na porta ' + port);
        });
    });
});

const express = require('express');
const mysql = require('mysql');
const { uniqueNamesGenerator, names, starWars } = require('unique-names-generator');

const app = express();
const port = 3000;
const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const generatorConfig = {
    dictionaries: [names, starWars]
}

const insertDb = function(connection) {
    const name = uniqueNamesGenerator(generatorConfig);
    const sql = `INSERT INTO people(name) values('${name}')`;
    connection.query(sql);
}

const selectDb = function(connection, callBack) {
    const sql = 'SELECT * FROM people';
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        console.log(results);
        callBack(results);
    });
}

app.get('/', (req,res) => {
    const connection = mysql.createConnection(dbConfig);
    insertDb(connection);
    selectDb(connection, function(peoples) {
        let content = '<h1>Full Cycle</h1>'
        content += '<table>'
        content += '<tr><th>Name</th></tr>'
        for (const people of peoples) {
            content += `<tr><td>${people.name}</td></tr>`
        }
        content += '</table>'
        res.send(content);
    });
    connection.end();
})

app.listen(port, () => {
    console.log('Running on port ' + port);
})
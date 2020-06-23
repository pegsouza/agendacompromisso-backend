// yarn add pg

const Pool = require('pg').Pool;

// 1 - Abrir a conexão
// 2 - Executar o comando SQL (query, insert) 30ms (índice)
// 3 - Fechar a conexão

const pool = new Pool({
    user: 'cwotifzgyfrydo',
    password: '7561f9d2e8b0858c4e7dc6daaf0d44ae4864d3f8a02fffd4e10a0a0b8a93bb14',
    host: 'ec2-3-215-83-17.compute-1.amazonaws.com',
    database: 'db9s29bmk4jiqb',
    port: 5432,
    ssl:  { rejectUnauthorized: false }
});

// const sql = `
//     CREATE TABLE IF NOT EXISTS agenda
//     (
//         ID serial primary key,
//         compromisso varchar(200) not null,
//         data varchar(50),
//         realizado boolean
//     )
// `;

// pool.query(sql, function(error, result) {
//     if(error) 
//         throw error
    
//     console.log('Tabela criada com sucesso!');
// })


// INSERT
const sql_insert = `
        INSERT INTO agenda (compromisso, data, realizado) 
            VALUES ('Viajar Muito', '2020-05-10' true)
`;

pool.query(sql_insert, function(error, result) {
    if(error)
        throw error;

    console.log(result.rowCount);
})

// SELECT

// const sql_select = `SELECT * FROM tarefas`;

// pool.query(sql_select, function(error, result) { 
//     if(error)
//         throw error;

//     console.log(result.rows);
// })
const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const pool = new Pool({
    user: 'cwotifzgyfrydo',
    password: '7561f9d2e8b0858c4e7dc6daaf0d44ae4864d3f8a02fffd4e10a0a0b8a93bb14',
    host: 'ec2-3-215-83-17.compute-1.amazonaws.com',
    database: 'db9s29bmk4jiqb',
    port: 5432,
    ssl:  { rejectUnauthorized: false }
});
const server = express();

server.use(cors());

server.use(express.json());

server.get('/agenda', async function(request, response) {
    const result = await pool.query('SELECT * FROM agenda'); 
    return response.json(result.rows);

})

server.get('/agenda/:id',async function(request, response){
    const id = request.params.id;
    const sql = 'SELECT * FROM agenda WHERE id = $1'
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
} )


server.post('/agenda', async function(request, response) {
    const chamado = request.body.compromisso; 
    const descricao = request.body.data;
    const sql = `INSERT INTO agenda (compromisso, data, realizado) VALUES ($1, $2, $3)`;
    await pool.query(sql, [compromisso, data, false]);
    return response.status(204).send(); 
})

server.delete('/agenda/:id', async function(request,response){
    const id = request.params.id;
    const sql = 'DELETE FROM agenda WHERE id = $1';
    await pool.query(sql, [id]);
    return response.status(204).send();

})

server.put('/agenda/:id', async function(request, response){
    const id = request.params.id;
    const { compromisso, data, realizado} = request.body;
    const sql = 'UPDATE agenda SET compromisso = $1, data = $2, realizado = $3';
    await pool.query(sql, [compromisso, data, realizado, id]);
    return response.status(204).send();
})

server.patch('/agenda/:id/done', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE agenda SET realizado = true WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})


server.listen(process.env.PORT || 3000);
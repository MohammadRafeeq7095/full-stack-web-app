const express = require('express')
const { Pool } = require('pg')


const app = express()
app.use(express.json())


const pool = new Pool({
connectionString: process.env.DATABASE_URL // e.g. postgres://user:pass@host:5432/dbname
})


app.get('/api/health', (req, res) => res.json({ status: 'ok' }))


app.get('/api/users', async (req, res) => {
const { rows } = await pool.query('SELECT id, name, email FROM users ORDER BY id')
res.json(rows)
})


app.post('/api/users', async (req, res) => {
const { name, email } = req.body
const { rows } = await pool.query('INSERT INTO users(name,email) VALUES($1,$2) RETURNING id, name, email', [name, email])
res.status(201).json(rows[0])
})


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Backend listening on ${port}`))

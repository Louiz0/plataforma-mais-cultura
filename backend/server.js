require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false } // Importante pro Render
});

// Criação da tabela (executar uma vez)
app.get("/init", async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        res.send("Tabela criada com sucesso!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar tabela.");
    }
});

// Registro
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Usuário já existe." });
        }

        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        res.json({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no registro." });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
        if (result.rows.length > 0) {
            res.json({ message: "Login realizado com sucesso!" });
        } else {
            res.status(401).json({ message: "Credenciais inválidas." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no login." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

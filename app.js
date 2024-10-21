// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose'); // Asegúrate de importar mongoose

require('dotenv').config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definida en el entorno");
}
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Definir rutas
app.use('/', authRoutes); // Todas las rutas de autenticación bajo /

app.use(express.json());



mongoose.connect('mongodb://localhost:27017/tu_base_de_datos')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
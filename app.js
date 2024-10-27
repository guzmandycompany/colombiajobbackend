

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



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB bien'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register } = require("../controllers/authcontrollers"); //aqui se importa el controlador
const { loginUser } = require('../services/authService');

// Ruta para login
router.post('/login', loginUser);

// Ruta para registro
router.post('/register', register);



module.exports = router;
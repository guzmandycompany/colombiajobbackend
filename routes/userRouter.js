const express = require('express');


const router = express.Router();

// Rutas para usuarios
router.get('/:id', (req, res) => {
  
  res.send(`User ID: ${req.params.id}`);
});

module.exports = router;
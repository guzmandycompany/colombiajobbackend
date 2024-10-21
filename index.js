// index.js
require('dotenv').config(); // Carga las variables de entorno desde .env


const app = require('./app');

// Obtener el puerto de las variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
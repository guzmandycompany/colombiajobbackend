const mongoose = require('mongoose');
const userSchema = require("../schema/schemauser")



const User = mongoose.model('User', userSchema);

module.exports = User; // Cambia esto para exportar el modelo
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importa el modelo correctamente
const jwt = require('jsonwebtoken');

// Función para registrar un usuario
const registerUser = async (username, fullname, password, idnumber, addrress, pnumber, email) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('El usuario ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, fullname, password: hashedPassword, idnumber, addrress, pnumber, email});
    await newUser.save();

    return newUser;
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

try{

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Aquí podrías generar un token JWT y devolverlo
      // Generar el token JWT con una expiración de 1 hora
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
      return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
   
};

module.exports = { registerUser, loginUser};
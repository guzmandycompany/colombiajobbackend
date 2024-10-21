
const { registerUser, loginUser } = require('../services/authService'); // Asegúrate de que la ruta sea correcta
const User = require('../models/User'); // Importa el modelo de usuario


// Controlador para el registro de usuarios
const register = async (req, res) => {
    const { username, password, fullname, idnumber, addrress, pnumber, email} = req.body;

    try {
        const user = await registerUser(username, fullname, password, idnumber, addrress, pnumber, email);
        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 
 
// Controlador para el inicio de sesión de usuarios
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Aquí puedes manejar la creación de un token JWT si lo necesitas.
        // const token = createToken(user); // Función que debes definir para crear un token

        return res.status(200).json({ message: 'Login exitoso', user }); // Puedes incluir el token aquí
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

module.exports = { register, login };
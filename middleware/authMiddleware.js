const jwt = require('jsonwebtoken');

// Middleware de autenticación para verificar el JWT
const authMiddleware = (req, res, next) => {
    try {
        // Obtener el token del encabezado de autorización
        const token = req.header('Authorization').replace('Bearer ', '');

        // Si no se proporciona token, devolver error 401 (No autorizado)
        if (!token) {
            return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar los datos decodificados del usuario al objeto de solicitud (req)
        req.user = decoded;

        // Continuar al siguiente middleware o controlador
        next();
    } catch (error) {
        // Devolver un error 401 si el token es inválido o ha expirado
        return res.status(401).json({ error: 'Token inválido o ha expirado.' });
    }
};

module.exports = authMiddleware;
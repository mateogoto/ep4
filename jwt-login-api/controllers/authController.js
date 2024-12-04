const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log('Datos recibidos en el backend:', req.body);
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el registro' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user._id }, 'tu_secreto_jwt', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
};

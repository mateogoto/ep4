const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const mongoUri = 'mongodb://localhost:27017/jwt-login';
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Error al conectar MongoDB:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


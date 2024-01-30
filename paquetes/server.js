const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const packageRoutes = require('./src/routes/packageRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB con opción de debug
mongoose.connect('mongodb://localhost:27017/logisticaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  debug: true
});

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/packages', packageRoutes);
app.use('/drivers', driverRoutes);
app.use('/assignments', assignmentRoutes);

// Middleware para manejar errores específicos de MongoDB
app.use((err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    // Manejar errores de duplicados (por ejemplo, índices únicos)
    res.status(400).json({ success: false, message: 'Ya existe un registro con ese valor único.' });
  } else if (err instanceof mongoose.Error.ValidationError) {
    // Manejar errores de validación del modelo
    const errors = Object.values(err.errors).map(error => error.message);
    res.status(400).json({ success: false, message: 'Error de validación.', errors });
  } else {
    // Otros errores
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega esta línea

const packageRoutes = require('./src/routes/packageRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilita CORS antes de definir las rutas
app.use(cors());

// Conexión a MongoDB sin la opción 'debug'
mongoose.connect('mongodb://34.171.178.16:27017/logisticaDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de prueba "Hola Mundo"
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Rutas
app.use('/packages', packageRoutes);
app.use('/drivers', driverRoutes);
app.use('/assignments', assignmentRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



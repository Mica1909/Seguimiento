const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const packageRoutes = require('./src/routes/packageRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');
const cors = require('cors'); // Agrega esta línea
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB sin la opción 'debug'
mongoose.connect('mongodb://localhost:27017/logisticaDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('frontend'));
// Habilita CORS
app.use(cors());


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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});





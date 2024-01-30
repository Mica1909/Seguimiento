const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Agrega esta línea para trabajar con rutas de archivos

const packageRoutes = require('./src/routes/packageRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilita CORS antes de definir las rutas
app.use(cors());

// Conexión a MongoDB sin la opción 'debug'
mongoose.connect('mongodb://localhost:27017/logisticaDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas estáticas para servir archivos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/packages', packageRoutes);
app.use('/drivers', driverRoutes);
app.use('/assignments', assignmentRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Cualquier otra ruta no manejada por las anteriores, sirve el archivo 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

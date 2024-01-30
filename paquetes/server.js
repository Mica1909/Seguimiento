const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Agrega esta línea para trabajar con rutas de archivos

const Package = require('./models/Package');
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



// Importa las librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configura Express
const app = express();
app.use(bodyParser.json());

// Conéctate a tu base de datos MongoDB (asegúrate de tener MongoDB instalado y en ejecución)
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define el esquema del modelo para tu colección de paquetes
const packageSchema = new mongoose.Schema({
  trackingNumber: String,
  content: String,
  weight: Number,
  origin: String,
  destination: String,
});

// Crea el modelo de paquete
const Package = mongoose.model('Package', packageSchema);

// Manejador de ruta para la creación de un nuevo paquete
app.post('/packages', async (req, res) => {
  try {
    // Crea una nueva instancia del modelo de paquete con los datos recibidos
    const newPackage = new Package(req.body);

    // Guarda el nuevo paquete en la base de datos
    await newPackage.save();

    // Devuelve el paquete recién creado como respuesta
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error al guardar el paquete:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

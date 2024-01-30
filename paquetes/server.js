const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const packageRoutes = require('./routes/packageRoutes');
const driverRoutes = require('./routes/driverRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/logisticaDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/packages', packageRoutes);
app.use('/drivers', driverRoutes);
app.use('/assignments', assignmentRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importa tu modelo de paquete (Package)
const Package = require('./src/models/Package');
const packageRoutes = require('./src/routes/packageRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
mongoose.connect('mongodb://localhost:27017/logisticaDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/packages', packageRoutes);
app.use('/drivers', driverRoutes);
app.use('/assignments', assignmentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


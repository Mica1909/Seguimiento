const express = require('express');
const router = express.Router();
const Package = require('../models/Package'); // Asegúrate de tener el modelo Package definido

// Ruta para crear un nuevo paquete
router.post('/', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error('Error al guardar el paquete:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Package = require('../models/packageModel');

// Ruta para obtener todos los paquetes
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo paquete
router.post('/', async (req, res) => {
  const package = new Package({
    trackingNumber: req.body.trackingNumber,
    content: req.body.content,
    weight: req.body.weight,
    origin: req.body.origin,
    destination: req.body.destination,
  });

  try {
    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para obtener un paquete específico por su ID
router.get('/:id', getPackage, (req, res) => {
  res.json(res.package);
});

// Ruta para actualizar un paquete existente
router.patch('/:id', getPackage, async (req, res) => {
  if (req.body.trackingNumber != null) {
    res.package.trackingNumber = req.body.trackingNumber;
  }
  if (req.body.content != null) {
    res.package.content = req.body.content;
  }
  if (req.body.weight != null) {
    res.package.weight = req.body.weight;
  }
  if (req.body.origin != null) {
    res.package.origin = req.body.origin;
  }
  if (req.body.destination != null) {
    res.package.destination = req.body.destination;
  }

  try {
    const updatedPackage = await res.package.save();
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un paquete
router.delete('/:id', getPackage, async (req, res) => {
  try {
    await res.package.remove();
    res.json({ message: 'Paquete eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener un paquete por su ID
async function getPackage(req, res, next) {
  try {
    const package = await Package.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: 'No se encontró el paquete' });
    }
    res.package = package;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;


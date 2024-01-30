const express = require('express');
const router = express.Router();
const Driver = require('../models/driverModel');

// Ruta para obtener todos los choferes
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo chofer
router.post('/', async (req, res) => {
  const driver = new Driver({
    name: req.body.name,
    licenseNumber: req.body.licenseNumber,
    vehicle: req.body.vehicle,
    available: req.body.available,
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para obtener un chofer específico por su ID
router.get('/:id', getDriver, (req, res) => {
  res.json(res.driver);
});

// Ruta para actualizar un chofer existente
router.patch('/:id', getDriver, async (req, res) => {
  if (req.body.name != null) {
    res.driver.name = req.body.name;
  }
  if (req.body.licenseNumber != null) {
    res.driver.licenseNumber = req.body.licenseNumber;
  }
  if (req.body.vehicle != null) {
    res.driver.vehicle = req.body.vehicle;
  }
  if (req.body.available != null) {
    res.driver.available = req.body.available;
  }

  try {
    const updatedDriver = await res.driver.save();
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un chofer
router.delete('/:id', getDriver, async (req, res) => {
  try {
    await res.driver.remove();
    res.json({ message: 'Chofer eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener un chofer por su ID
async function getDriver(req, res, next) {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver == null) {
      return res.status(404).json({ message: 'No se encontró el chofer' });
    }
    res.driver = driver;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;


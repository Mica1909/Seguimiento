const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignmentModel');

// Ruta para obtener todas las asignaciones
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva asignación
router.post('/', async (req, res) => {
  const assignment = new Assignment({
    packageId: req.body.packageId,
    driverId: req.body.driverId,
  });

  try {
    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para obtener una asignación específica por su ID
router.get('/:id', getAssignment, (req, res) => {
  res.json(res.assignment);
});

// Ruta para actualizar una asignación existente
router.patch('/:id', getAssignment, async (req, res) => {
  if (req.body.packageId != null) {
    res.assignment.packageId = req.body.packageId;
  }
  if (req.body.driverId != null) {
    res.assignment.driverId = req.body.driverId;
  }

  try {
    const updatedAssignment = await res.assignment.save();
    res.json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar una asignación
router.delete('/:id', getAssignment, async (req, res) => {
  try {
    await res.assignment.remove();
    res.json({ message: 'Asignación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener una asignación por su ID
async function getAssignment(req, res, next) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (assignment == null) {
      return res.status(404).json({ message: 'No se encontró la asignación' });
    }
    res.assignment = assignment;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;

const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { body, validationResult } = require('express-validator');

// GET all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST (Create new employee)
router.post(
  '/employees',
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('position').notEmpty().withMessage('Position is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT (Update employee by ID)
router.put('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, {
      new: true, // Returns the updated document
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee details updated successfully', employee });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// DELETE employee by ID
router.delete('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// SEARCH employee by DEPARTMENT OR POSITION
router.get('/search', async (req, res) => {
  const { department, position } = req.query; // Extract query parameters
  const filter = {}; // Initialize filter object

  if (department) filter.department = department; // Add department filter if provided
  if (position) filter.position = position; // Add position filter if provided

  try {
    const employees = await Employee.find(filter); // Query database using the filter
    res.status(200).json(employees); // Return matching employees
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Send server error response
  }
});


module.exports = router;

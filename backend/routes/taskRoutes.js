const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, getDashboardStats } = require('../controllers/taskController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, getDashboardStats);
router.get('/', protect, getTasks);
router.post('/', protect, adminOnly, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, adminOnly, deleteTask);

module.exports = router;

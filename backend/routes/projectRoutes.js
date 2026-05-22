const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById, updateProject, deleteProject, addMember } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getProjects);
router.post('/', protect, createProject);
router.get('/:id', protect, getProjectById);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/members', protect, addMember);

module.exports = router;

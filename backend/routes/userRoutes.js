const express = require('express');
const router = express.Router();
const { getAllUsers, updateProfile, updateUserRole } = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.get('/', protect, getAllUsers);
router.put('/profile', protect, updateProfile);
router.put('/:id/role', protect, adminOnly, updateUserRole);

module.exports = router;

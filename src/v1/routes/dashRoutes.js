const express = require('express');

const { adminDashboard } = require('../controllers/dashController');
const {authenticateToken, authorizeRoles} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', authenticateToken, authorizeRoles('admin'), adminDashboard);

module.exports = router;
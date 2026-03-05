const express = require('express');
const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require a valid JWT token
// Admin-only: GET all, POST, PUT, DELETE
// Any authenticated user: GET by id

router.get('/', authenticateToken, authorizeRoles('admin'), getAllCustomers);
router.get('/:id', authenticateToken, getCustomerById);
router.post('/', authenticateToken, authorizeRoles('admin'), createCustomer);
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateCustomer);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteCustomer);

module.exports = router;

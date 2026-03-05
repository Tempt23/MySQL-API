const pool = require('../data/db');

// GET all customers
const getAllCustomers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, firstName, lastName, email, mobileNumber, role FROM customers');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching customers' });
    }
};

// GET customer by id
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT id, firstName, lastName, email, mobileNumber, role FROM customers WHERE id = ?',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching customer' });
    }
};

// POST create customer (without hashing - use /auth/register for hashed password creation)
const createCustomer = async (req, res) => {
    const { firstName, lastName, email, mobileNumber, password, role } = req.body;
    try {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO customers (firstName, lastName, email, mobileNumber, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, mobileNumber, hashedPassword, role]
        );
        res.status(201).json({ id: result.insertId, firstName, lastName, email, mobileNumber, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating customer' });
    }
};

// PUT update customer by id
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, mobileNumber, role } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE customers SET firstName = ?, lastName = ?, email = ?, mobileNumber = ?, role = ? WHERE id = ?',
            [firstName, lastName, email, mobileNumber, role, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated', id, firstName, lastName, email, mobileNumber, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating customer' });
    }
};

// DELETE customer by id
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM customers WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting customer' });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require('../data/db');

//Register and login user

const SECRET_KEY = "your_secret_key"; //Bruk .env for å lagre trygt

const register = async (req, res) => {

    const { firstName, lastName, email, mobileNumber, password, role } = req.body;

    console.log(req.body);
    console.log(firstName, lastName, email, mobileNumber, password, role);

    try {
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        const [result] = await pool.query(
            'INSERT INTO customers (firstName, lastName, email, mobileNumber, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, mobileNumber, hashedPassword, role]
        );

        console.log(result);

        res.status(201).json({
            id: result.insertId,
            firstName,
            lastName,
            password,
            email,
            mobileNumber,
            role
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registering user" });
    }

}



const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await pool.query('SELECT * FROM customers WHERE email = ?', [email]);
        
        const customers = results[0];



        //checkuser email and password

        if (!customers) {return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!customers || !(await bcrypt.compare(password, customers.password))) 
            {return res.status(401).json({ message: "Invalid email or password" });
        }


        
        //Generate JWT token

        const token = jwt.sign({ email: customers.email, role: customers.role }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error logging in" });
    }
}


module.exports = {
  register,
  login
}
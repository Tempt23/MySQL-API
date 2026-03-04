const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register and login user

const SECRET_KEY = "your_secret_key"; //Bruk .env for å lagre trygt

const register = async (req, res) => {

    const { firstName, lastName, email, mobileNumber, password, role } = req.body;

    try {
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (firstName, lastName, email, mobileNumber, password, role) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, lastName, email, mobileNumber, hashedPassword, role]
        );

        res.status(201).json({
            id: result.insertId,
            firstName,
            lastName,
            password,
            hashedPassword,
            email,
            mobileNumber,
            role
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }

}



const login = async (req, res) => {
  res.send("Login user");
}


module.exports = {
  register,
  login
}
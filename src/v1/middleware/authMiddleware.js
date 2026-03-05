const jwt = require('jsonwebtoken');

const SECRET_KEY = "your_secret_key"; //Bruk .env for å lagre trygt


//Token authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid access token" });
        }  

        req.user = user;
        next();
    });
}


//Authorization
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles
};
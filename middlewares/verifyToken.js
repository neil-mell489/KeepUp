const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createToken = (user) => {
    try {
        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: "4h" });
        return token;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) {
            return res.status(403).json({ error: "You do not have permission" });
        }
        const token = bearerHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(403).json({ error: "You do not have permission" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.user = decoded; // Attach decoded user to request
        console.log("Decoded Token:", decoded);
        next();
    } catch (err) {
        console.log("Error verifying token:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createToken,
    verifyToken
};

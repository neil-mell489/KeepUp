const { createToken } = require("../middlewares/verifyToken");
const db = require("../models/newUser");
const bcrypt = require("bcrypt");

// Debugging
console.log("db:", db);
console.log("db.User:", db.User);
console.log("db.User.find:", db.User.find);

const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Debugging
        console.log("Request Body:", req.body);

        const query = db.User.find({});
        query.or([{ username: username }, { email: email }]);
        const foundUser = await query.exec();

        if (foundUser.length !== 0) {
            return res.status(400).json({ message: "Username and Email already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        req.body.password = hash;
        const createdUser = await db.User.create(req.body);
        await createdUser.save();

        return res.status(201).json({ message: "User successfully registered", userId: createdUser.id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const query = db.User.find({});
        query.and([{ username: username }, { email: email }]);

        const foundUser = await query.exec();
        if (foundUser.length === 0) {
            return res.status(400).json({ error: "Invalid Login Credentials" });
        }
        const verifyPassword = await bcrypt.compare(password, foundUser[0].password);
        if (!verifyPassword) {
            return res.status(400).json({ error: "Invalid Login Credentials" });
        }

        const token = createToken(foundUser[0]);
        return res.status(200).json({ token, id: foundUser[0]._id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const query = db.User.findById(id);
        query.select("-password");
        const foundUser = await query.exec();
        console.log(foundUser);
        if (!foundUser) {
            return res.status(400).json({ error: "User is not found" });
        }
        return res.status(200).json({ message: "Successfully found user", data: foundUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    signup,
    login,
    getUser
};

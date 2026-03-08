const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const usermodel = require("../model/usermodel");
const genratetoken = require("../utils/genratetoken");

router.post("/signup", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (exist) return res.status(400).json({ message: "User already exists" });

        const hashpassword = await bcrypt.hash(password, 10);
        const user = new usermodel({ name, email, password: hashpassword });
        await user.save();

        const token = genratetoken(user._id);
        res.status(201).json({ success: true, message: "user is created", token, data: user });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });

        if (!user) {
            const err = new Error("user not found");
            err.statusCode = 400; // Updated from .status for middleware compatibility
            return next(err);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error("Wrong Password");
            err.statusCode = 400;
            return next(err);
        }

        const token = genratetoken(user._id);
        res.status(200).json({ success: true, message: "login successfully", token, data: user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
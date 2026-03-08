const express = require("express");
const router = express.Router();
const goalmodel = require("../model/goalmodel");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/create", authmiddleware, async (req, res, next) => {
    try {
        const { title } = req.body;
        const goal = new goalmodel({ title, user: req.user });
        await goal.save();
        res.status(200).json({ success: true, data: goal });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        // Correct findOneAndUpdate syntax: Filter, Update, Options
        const goal = await goalmodel.findOneAndUpdate(
            { _id: req.params.id, user: req.user }, 
            { completed: req.body.completed }, 
            { new: true }
        );
        res.status(200).json({ success: true, message: "the goal is completed", data: goal });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        await goalmodel.findOneAndDelete({ _id: req.params.id, user: req.user });
        res.status(200).json({ message: "Goal deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
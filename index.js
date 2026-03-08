const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authrouter = require("./router/authrouter");
const GoalRouter = require("./router/GoalRouter");
const errorMiddleware = require("./middleware/errormiddleware");

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authrouter);
app.use("/api/goals", GoalRouter);

// Error middleware must be LAST
app.use(errorMiddleware);

mongoose.connect(process.env.MONGODB_URI)
    // .then(() =>{
    //    app.listen(8000, () => console.log("Server running on 8000"));
    // })
    // .catch(err => console.log("Connction Error:", err));
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    })
    
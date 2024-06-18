const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose
            .connect(
                "mongodb+srv://paramsavjani3010:parampbr**@todo.2aw1tqw.mongodb.net/?retryWrites=true&w=majority&appName=todo"
            )
            .then(() => {
                console.log("Connected to database");
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        res.status(500).json({ message: "Not Connected" });
    }
};

conn();

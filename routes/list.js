const router = require("express").Router();

const User = require("../models/user");
const List = require("../models/list");

// create a new task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(() => {
                res.status(200).json({ list: list });
            });
            existingUser.lists.push(list);
            existingUser.save();
        }
    } catch (error) {
        // console.log(error);
    }
});

//update a task
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const updatedList = await List.findByIdAndUpdate(
                req.params.id,
                { title, body },
                { new: true }
            );
            if (updatedList) {
                res.status(200).json({ list: updatedList });
            } else {
                res.status(201).json({ message: "List not found" });
            }
        } else {
            res.status(201).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//delete a task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { user } = req.body;
        const existingUser = await User.findByIdAndUpdate(user, { $pull: { lists: req.params.id } });
        if (existingUser) {
            const deletedList = await List.findByIdAndDelete(req.params.id);
            if (deletedList) {
                res.status(200).json({ message: "List deleted" });
            } else {
                res.status(201).json({ message: "List not found" });
            }
        } else {
            res.status(201).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
    }
});

//get all tasks
router.get("/getTasks/:id", async (req, res) => {
    try {
        const lists = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json({ lists: lists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

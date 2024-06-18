const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// sign up

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpasword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpasword });
        await user.save().then(() => {
            res.status(200).json({ message: "User successfully added" });
        });
    } catch (error) {
        res.status(201).json({ message: "User already exist" });
    }
});

// sign in

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !user.password) {
            return res.status(201).json({ message: "Please Sign Up First" });
        }
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.status(201).json({ message: "Wrong Password" });
        }
        const { password, ...others } = user._doc;
        return res.status(200).json({ others, message: "User successfully logged in" });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;

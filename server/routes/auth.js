const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

//REGISTER
router.post("/register", async (req, res) => {
    try {
        // console.log(req.body)
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});
//Login
router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        !user && res.status(404).json("User not found");
        const validPassword = await bcrypt.compare(password, user.password)
        // console.log(validPassword)

        !validPassword && res.status(400).json("Invalid creadientials")
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)

    }


})

module.exports = router
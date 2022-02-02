const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")


//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body });
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)

        }
    } else {
        return res.status(403).json("you can update only ypur account")
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been Deleted")
        } catch (error) {
            return res.status(500).json(error)

        }
    } else {
        return res.status(403).json("You can't delete another'saccount")
    }
})
//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        // console.log(user)
        const friends = await Promise.all(
            user.following.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        console.log(friends)
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err);
    }
});

//follow user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })
                res.status(200).json("user has been followed")
            } else {
                res.status(403).json("you already follow this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you cant follow yourself")
    }
})
//unfollow user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { following: req.params.id } })
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("you haven't follow this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you cant unfollow yourself")
    }
})

module.exports = router
const User = require('../models/user');

async function handleFollowUser(req, res) {
    const { userId, followUserId } = req.body;
    try {
        const user = await User.findById(userId);
        const followUser = await User.findById(followUserId);
        if (!user || !followUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.following.includes(followUserId)) {
            return res.status(400).json({ message: "You are already following this user" });
        }


        user.following.push(followUserId);
        await user.save();

        if (followUser.followers.includes(userId)) {
            return res.status(400).json({ message: "You are already follower of this user" });
        }

        followUser.followers.push(userId);

        await followUser.save();

        res.status(200).json({ message: "User followed successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle errors

    }
}

module.exports = {
    handleFollowUser,
}
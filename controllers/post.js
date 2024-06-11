const { createPost, getPostByID, deletePost } = require("../models/post");
const User = require('../models/user');


async function handleCreatePost(req, res) {
    const { post_Name, post_Image, post_Description, user_email } = req.body;

    if (!post_Name || !post_Description || !user_email) {
        return res.status(400).json({ message: "Post name, description, and user email are required" });
    }

    try {
        const user = await User.findOne({ email: user_email });
        if (!user) {
            return res.status(404).json({ message: "No user found with this email" });
        }

        const post = await createPost({
            postName: post_Name,
            postImage: post_Image,
            postDescription: post_Description,
            userID: user._id,
        });

        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}


async function handleGetPostByID(req, res) {
    try {
        console.log(req.params.id);
        const post = await getPostByID(req.params.id);
        console.log(post);
        if (!post) {
            return res.status(404).json({ message: "No post found" });
        }
        return res.status(200).json({
            status: true, message: "post fetched successfully", data: post
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function handleDeletePost(req, res) {
    try {
        const post = await deletePost(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "No post found" });
        }
        return res.status(200).json({
            status: true, message: "post deleted successfully",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    handleCreatePost,
    handleGetPostByID,
    handleDeletePost,
}

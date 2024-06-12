const { createPost, getPostByID, deletePost, getAllPosts } = require("../models/post");
const User = require('../models/user');


async function handleCreatePost(req, res) {
    const { post_Name, post_Description, } = req.body;
    const userID = req.user._id;
    const post_Image = req.file ? req.file.path : null;
    if (!post_Name || !post_Description) {
        return res.status(400).json({ message: "Post name, description, and file are required" });
    }
    console.log("post_Image ", req.body);
    try {
        const post = await createPost({
            postName: post_Name,
            postImage: post_Image,
            postDescription: post_Description,
            userID: userID
        });

        res.status(201).json({
            status: true,
            data: post,
            message: "Post created successfully"
        });
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
async function handleGetAllPosts(req, res) {
    const currentUser = req.user;
    try {
        const followingIds = currentUser.following;
        if (followingIds.length == 0) {
            res.status(500).json({ status: true, message: "you are not following anyone", data: [] });
        }


        // Retrieve posts from users in followingIds
        const posts = await getAllPosts(followingIds) 
        if (posts.length == 0){
            res.status(500).json({status: true, message: "No posts", data: [] });

        }

        res.status(200).json({status: true, message: "Posts fetched successfully", data: posts});
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}




module.exports = {
    handleCreatePost,
    handleGetPostByID,
    handleDeletePost,
    handleGetAllPosts
}

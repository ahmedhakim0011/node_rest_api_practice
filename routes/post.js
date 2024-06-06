const express = require("express");
const { handleCreatePost,handleGetPostByID, handleDeletePost } = require("../controllers/post");
const postRouter = express.Router();



postRouter.route('/api/createPost').post(handleCreatePost);

postRouter.route('/api/getPost/:id').get(handleGetPostByID);
postRouter.route('/api/deletePost/:id').delete(handleDeletePost);



module.exports = postRouter ;
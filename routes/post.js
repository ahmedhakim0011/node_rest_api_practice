const express = require("express");
const { handleCreatePost, handleGetPostByID, handleDeletePost } = require("../controllers/post");
const { checkForAuthentication, restrictTo } = require("../middelwares/auth");

const postRouter = express.Router();

postRouter.use(checkForAuthentication);


postRouter.route('/api/createPost')
    .post(restrictTo(['user']), handleCreatePost);

postRouter.route('/api/getPost/:id').get(handleGetPostByID);
postRouter.route('/api/deletePost/:id').delete(handleDeletePost);



module.exports = postRouter;
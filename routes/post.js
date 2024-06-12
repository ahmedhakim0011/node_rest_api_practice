const express = require("express");
const { handleCreatePost, handleGetPostByID, handleDeletePost ,handleGetAllPosts} = require("../controllers/post");
const { checkForAuthentication, restrictTo } = require("../middelwares/auth");
const upload = require("../middelwares/multer-config");


const postRouter = express.Router();

postRouter.use(checkForAuthentication);


postRouter.route('/api/createPost')
    .post(restrictTo(['user']), upload.single("post_Image"), handleCreatePost);
postRouter.route('/api/getPost/:id').get(handleGetPostByID);
postRouter.route("/api/getAllPost").get(handleGetAllPosts)
postRouter.route('/api/deletePost/:id').delete(handleDeletePost);



module.exports = postRouter;
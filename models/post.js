const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
    },
    postImage: {
        type: String
    },
    postDescription: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

}, {
    timestamp: true
});
// model
const Post = mongoose.model("post", postSchema);
// Post.find({ userID: userId }).populate("userID");
exports.createPost = (query) => Post.create(query);

exports.getPostByID = (id) => Post.findById(id);
exports.getPostByUserId = (userId) => {
    return Post.find({ userID: userId });
};
exports.updatedPostByID = (id, query) => Post.findByIdAndUpdate(id, query,);
exports.deletePost = (id) => Post.findByIdAndDelete(id);
// exports.getAllPosts = await Post.find();





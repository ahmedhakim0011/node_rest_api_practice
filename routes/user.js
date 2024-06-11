const express = require("express");
const User = require("../models/user");
const { handleUserSignup, handleUserLogin, handleGetAllUsers, handleGetAllUsersById, handleUpdateUserById, handleDeleteUserById, handleGetUserProfile } = require("../controllers/user");
const { handleFollowUser } = require('../controllers/follow_unfollow');
const { checkForAuthentication, restrictTo } = require("../middelwares/auth");

const router = express.Router();


// postRouter.route('/api/createPost')
//     .post(restrictTo(['user']), handleCreatePost);

router
    .get(`/`, handleGetAllUsers);

    router.get("/profile", checkForAuthentication, handleGetUserProfile);


router.post(`/signup`, handleUserSignup);
router.post(`/login`, handleUserLogin);
router.post(`/follow`, handleFollowUser);


router.route(`/:id`)
    .get(handleGetAllUsersById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);


module.exports = router;
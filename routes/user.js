const express = require("express");
const User = require("../models/user");
const { handleUserSignup, handleUserLogin, handleGetAllUsers, handleGetAllUsersById, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user");
const {handleFollowUser} = require('../controllers/follow_unfollow');
const router = express.Router();



router
    .get(`/`, handleGetAllUsers);

router.post(`/signup`, handleUserSignup);
router.post(`/login`, handleUserLogin);
router.post(`/follow`, handleFollowUser);


router.route(`/:id`)
    .get(handleGetAllUsersById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);


module.exports = router;